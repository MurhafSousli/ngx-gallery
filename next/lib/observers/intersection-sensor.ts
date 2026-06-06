import {
  Directive,
  inject,
  computed,
  untracked,
  linkedSignal,
  Signal,
  NgZone,
  ElementRef,
  ResourceRef
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import {
  map,
  filter,
  fromEvent,
  observeOn,
  distinctUntilChanged,
  animationFrameScheduler
} from 'rxjs';
import { createIntersectionObserver } from './intersection-observer';
import { GalleryRef } from '../gallery-ref';
import { SliderContext } from '../slider/slider.token';
import { ResizeSensorContext } from '../resize-sensor/resize-sensor.token';
import { IntersectionSensorContext } from './intersection-sensor.token';


/**
 * visibleEntriesThreshold
 * 0.0001: emit as soon as an item starts intersecting or stops being visible,
 * so visibleEntries stays accurate and hasNext/hasPrev can react immediately.
 * 0.999: treat "almost fully visible" as fully visible enough.
 * In some edge cases, the last item never reaches an exact ratio of 1 due to layout/subpixel rounding,
 * so using 1 would prevent the final visibility update from firing.
 */
const visibleEntriesThreshold: number[] = [0.0001, 0.999];

/**
 * This observer used to detect when a slider element reaches the active soon
 */
@Directive({
  selector: '[intersectionSensor]',
  exportAs: 'intersectionSensor',
  providers: [{ provide: IntersectionSensorContext, useExisting: IntersectionSensor }]
})
export class IntersectionSensor implements IntersectionSensorContext {

  private readonly zone: NgZone = inject(NgZone);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  readonly slider: SliderContext = inject(SliderContext, { self: true });

  readonly resizeSensor: ResizeSensorContext = inject(ResizeSensorContext, { self: true });

  private readonly itemsElements: Signal<HTMLElement[]> = computed(() => {
    return this.galleryRef.renderedItems().map((item) => item.nativeElement);
  });

  /**
   * Resource emits *only delta batches* of IntersectionObserverEntry[]
   */
  readonly visibleEntriesResource: ResourceRef<IntersectionObserverEntry[]> = rxResource({
    params: () => {
      // Skip if in SSR
      if (!this.slider.isBrowser || !this.resizeSensor.layoutReady()) return undefined;
      return {
        elements: this.itemsElements(),
        rootMargin: this.slider.adapter().getVisibleEntriesRootMargin(),
      };
    },
    stream: ({ params }) => {
      const options: IntersectionObserverInit = {
        root: this.nativeElement,
        threshold: visibleEntriesThreshold,
        rootMargin: params.rootMargin
      };
      return createIntersectionObserver(options, params.elements, this.zone);
    }
  });

  /**
   * Signal that tracks the current set of visible items.
   */
  readonly visibleEntries: Signal<Record<string, IntersectionObserverEntry>> = linkedSignal<IntersectionObserverEntry[], Record<string, IntersectionObserverEntry>>({
    source: this.visibleEntriesResource.value,
    computation: (newEntries: IntersectionObserverEntry[], previous: {
      value: Record<string, IntersectionObserverEntry>
    }) => {
      // Preserve existing visible entries
      const baseState: Record<string, IntersectionObserverEntry> = { ...previous?.value };

      if (!newEntries) return baseState;

      // Update the state with new changes
      return newEntries.reduce((state: Record<string, IntersectionObserverEntry>, entry: IntersectionObserverEntry) => {
        const index: string = entry.target.getAttribute('galleryIndex');
        if (entry.isIntersecting) {
          state[index] = entry;
        } else {
          delete state[index];
        }
        return state;
      }, baseState);
    }
  });

  private readonly snapAlignRootMargin: Signal<string> = computed(() => {
    const adapter = this.slider.adapter();
    switch (this.galleryRef.snapAlign()) {
      case 'start':
        return adapter.getActiveEntryRootMarginForStart();
      case 'end':
        return adapter.getActiveEntryRootMarginForEnd();
      default:
        return adapter.getActiveEntryRootMarginForCenter();
    }
  });

  readonly activeEntryResource: ResourceRef<IntersectionObserverEntry> = rxResource({
    params: () => {
      if (!this.slider.isBrowser || !this.resizeSensor.layoutReady()) return undefined;

      // To keep the initial active entry accurate, we must subscribe to contentSize changes,
      // Especially for auto-sized items. when cached loads too quickly, this avoids inaccurate active index.
      this.resizeSensor.contentSize()

      return {
        elements: this.itemsElements(),
        rootMargin: this.snapAlignRootMargin()
      };
    },
    stream: ({ params }) => {
      return createIntersectionObserver({
        root: this.nativeElement,
        threshold: 0,
        rootMargin: params.rootMargin
      }, params.elements, this.zone).pipe(
        map((entries: IntersectionObserverEntry[]) => {
          return entries
            // Get all items currently touching the 1px center line
            .filter((entry: IntersectionObserverEntry) => entry.isIntersecting)
            // If multiple items touch the center (rare with 1px, but possible),
            // pick the one with the highest ratio.
            .reduce((acc: IntersectionObserverEntry, entry: IntersectionObserverEntry) =>
              acc && acc.intersectionRatio > entry.intersectionRatio ? acc : entry, null)
        }),
        filter(Boolean),
        // Prevent rapid flickering if subpixel oscillates
        distinctUntilChanged((prev: IntersectionObserverEntry, curr: IntersectionObserverEntry) => prev.target === curr.target)
      );
    }
  });

  /**
   * In multi-item layouts (itemsPerView > 1), the io emits the correct 'center' anchor index (e.g., Index 1)
   * exactly one microtask AFTER the component initializes.
   * Without this signal, stableIndex would remain '0' (its initial state) until the first physical 'scrollend' event.
   * By tracking this boolean, we force the stableIndex to 're-sync' exactly once when the first IO entry is detected,
   * bridging the gap between bootstrap and the first user interaction.
   */
  private readonly initialHydration: Signal<boolean> = computed(() => !!this.activeEntryResource.value());

  /**
   * The "Live" Index: updates immediately as items pass the center
   */
  readonly anchorIndex: Signal<number> = linkedSignal<IntersectionObserverEntry, number>({
    source: this.activeEntryResource.value,
    computation: (entry: IntersectionObserverEntry, previous: { value: number }) => {
      if (entry) {
        return Number(entry.target.getAttribute('galleryIndex'));
      }
      return previous?.value ?? untracked(this.galleryRef.resolvedInitialIndex);
    }
  });

  /**
   * Detects the end of a physical scroll via the browser's native 'scrollend' event.
   * Necessary for capturing the conclusion of touchpad or touch-pan interactions
   * where internal 'scrolling' or 'dragging' states remain 'idle'.
   */
  private readonly scrollEndTrigger: Signal<number> = toSignal(
    // scrollend fires before io catches the new anchor index
    // delaying 1 animationFrameScheduler or asyncScheduler still runs too early
    // we could use debounceTime(50), but a double animation frame is more reliable
    fromEvent(this.nativeElement, 'scrollend').pipe(
      observeOn(animationFrameScheduler),
      observeOn(animationFrameScheduler),
      map(() => Date.now())
    ),
    { initialValue: 0 }
  );

  /**
   * The stableIndex is derived through a three-stage logic:
   * 1. Initial Hydration: Set anchorIndex on the first active item render.
   * 2. Movement Lock: Remains frozen during active dragging/scrolling.
   * 3. Reactive Landing: If the gallery is idle but the observer is lagging
   * (e.g., instant scroll), it subscribes to anchorIndex until the final destination is reached.
   */
  readonly stableIndex: Signal<number> = linkedSignal({
    source: () => ({
      status: this.slider.status(),
      tick: this.scrollEndTrigger(),
      initialHydration: this.initialHydration()
    }),
    computation: (pulse, previous) => {
      // MOVEMENT LOCK (JS/Mouse/Active Dragging)
      // Ignore any anchor index changes while the user is actively moving
      if (pulse.status !== 'idle') {
        return previous.value;
      }
      return untracked(this.anchorIndex);
    }
  });
}
