import {
  Directive,
  inject,
  input,
  computed,
  viewChild,
  contentChild,
  viewChildren,
  numberAttribute,
  booleanAttribute,
  Signal,
  InputSignal,
  WritableSignal,
  InjectionToken,
  InputSignalWithTransform
} from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { SliderItem } from './slider-item/slider-item';
import { SliderContext } from './slider/slider.token';
import { GALLERY_INITIAL_INDEX } from './models/gallery.token';
import { ResizeSensorContext } from './resize-sensor/resize-sensor.token';
import { IntersectionSensorContext } from './observers/intersection-sensor.token';
import { GalleryItemData } from './models/item.model';
import { BezierEasingOptions } from './smooth-scroll/smooth-scroll.model';
import { NavigationTarget, NavigationShift } from './models/slider.model';
import { GallerySnapAlign, GalleryOrientation } from './models/config.model';
import { GalleryItemDef, GalleryItemErrorDef, GalleryItemLoaderDef } from './directives/gallery-item-def';
import { gapTransform, itemSizeTransform, itemsPerViewTransform, stepsTransform } from './utils/utils';

export interface BaseSliderOptions {
  itemsPerView: number;
  itemSize: number | 'auto';
  steps: number | 'page';
  gap: number;
  loop: boolean;
  snapAlign: GallerySnapAlign;
  forceSnap: boolean;
  disableScroll: boolean;
  disableMouseScroll: boolean
  scrollDuration: number;
  scrollBehavior: ScrollBehavior;
}

export const BASE_SLIDER_OPTIONS = new InjectionToken<BaseSliderOptions>('BASE_SLIDER_OPTIONS');

@Directive({
  host: {
    '[style.--_slider-track-gap.px]': 'gap()',
    '[style.--_slider-track-size]': 'trackSize()'
  }
})
export abstract class GalleryRef {

  private readonly defaultOptions: BaseSliderOptions = inject(BASE_SLIDER_OPTIONS);

  /* v8 ignore start */
  protected readonly slider: Signal<SliderContext> = viewChild.required(SliderContext);

  protected readonly resizeSensor: Signal<ResizeSensorContext> = viewChild.required(ResizeSensorContext);

  protected readonly intersectionSensor: Signal<IntersectionSensorContext> = viewChild.required(IntersectionSensorContext);

  /** @ignore */
  readonly itemDef: Signal<GalleryItemDef> = contentChild.required(GalleryItemDef);
  /** @ignore */
  readonly itemLoaderDef: Signal<GalleryItemLoaderDef> = contentChild(GalleryItemLoaderDef);
  /** @ignore */
  readonly itemErrorDef: Signal<GalleryItemErrorDef> = contentChild(GalleryItemErrorDef);

  readonly renderedItems: Signal<readonly SliderItem[]> = viewChildren(SliderItem);
  /* v8 ignore stop */

  /**
   * Stable active index - updates after scroll ends
   */
  readonly activeIndex: Signal<number> = computed(() => this.intersectionSensor().stableIndex());

  /** Emits the active index when it changes */
  readonly activeIndexChange = outputFromObservable(toObservable(this.activeIndex));

  /**
   * Anchor Index - updates immediately as items pass the anchor
   */
  readonly anchorIndex: Signal<number> = computed(() => this.intersectionSensor().anchorIndex());

  /** Emits the anchor index when it changes */
  readonly anchorIndexChange = outputFromObservable(toObservable(this.anchorIndex));

  /**
   * @ignore
   * Items data array
   */
  abstract items: Signal<GalleryItemData<any>[]>;

  /**
   * Sets the sliding direction
   */
  abstract orientation: Signal<GalleryOrientation>;

  /**
   * Sets the debounced time used to throttle the gallery update after it is resized
   */
  abstract resizeDebounceTime: Signal<number>;

  /**
   * Sets the ease function used for smooth navigation between the items
   */
  abstract scrollEase: Signal<BezierEasingOptions>;

  /**
   * Defines the alignment of items within the gallery viewport when scrolling stops.
   * - `start`: Items snap to the leading edge of the container.
   * - `center`: Items snap to the middle of the viewport.
   * - `end`: Items snap to the trailing edge of the container.
   * * This alignment also determines the "Snap Anchor"—the point an item must reach
   * to be considered the active `activeIndex`.
   */
  readonly snapAlign: InputSignal<GallerySnapAlign> = input<GallerySnapAlign>(this.defaultOptions.snapAlign);

  /**
   * Whether to inject dynamic padding to ensure every item can reach the `snapAlign` anchor.
   * * When `false`, the gallery stops at its natural content boundaries, which may prevent
   * the first or last items from reaching the anchor point (causing an inaccurate `activeIndex`).
   * * When `true`, it calculates the "ghost space" needed to allow every item—including
   * those at the very edges—to be fully aligned to the 'start', 'center', or 'end'.
   */
  readonly forceSnap: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.forceSnap, {
    transform: booleanAttribute
  });

  /**
   * Enables loop cycling
   */
  readonly loop: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.loop, {
    transform: booleanAttribute
  });

  /**
   * Set navigation steps
   */
  readonly steps: InputSignalWithTransform<number | 'page', string | number> = input<number | 'page', string | number>(
    stepsTransform(this.defaultOptions.steps), {
      transform: stepsTransform
    }
  );

  /**
   * Disables sliding using mousewheel, touchpad, scroll and gestures on touch devices
   */
  readonly disableScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.disableScroll, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding using the mouse
   */
  readonly disableMouseScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.disableMouseScroll, {
    transform: booleanAttribute
  });

  /**
   * Sets the duration used for smooth navigation between the items
   */
  readonly scrollDuration: InputSignalWithTransform<number, string | number> = input<number, string | number>(this.defaultOptions.scrollDuration, {
    transform: numberAttribute
  });

  /**
   * Sets the scroll behavior of the slider.
   */
  readonly scrollBehavior: InputSignal<ScrollBehavior> = input<ScrollBehavior>(this.defaultOptions.scrollBehavior);

  /**
   * The space between items in pixels.
   */
  readonly gap: InputSignalWithTransform<number, string | number> = input<number, string | number>(
    gapTransform(this.defaultOptions.gap), {
      transform: gapTransform
    }
  );

  /**
   * Sets a fixed width/height for items in pixels, or 'auto' to fit content.
   * If undefined, calculation falls back to itemsPerView.
   */
  readonly itemsPerView: InputSignalWithTransform<number, string | number> = input<number, string | number>(this.defaultOptions.itemsPerView, {
    transform: itemsPerViewTransform
  });

  /**
   * Let items fit their own content size or set explicit size in px.
   */
  readonly itemSize: InputSignalWithTransform<string, number | string | 'auto'> = input<string, number | string | 'auto'>(
    itemSizeTransform(this.defaultOptions.itemSize), {
      transform: itemSizeTransform
    }
  );

  /**
   * Whether the layout displays one item per view
   */
  readonly isOneItemPerView: Signal<boolean> = computed(() => this.itemsPerView() === 1 && !this.itemSize());

  /**
   * Shared sizing logic that performs the math based on current inputs.
   * Returns the value for the main axis (scroll direction).
   */
  protected readonly trackSize: Signal<string> = computed(() => {
    const explicitSize = this.itemSize();
    if (explicitSize === 'auto') return 'max-content';
    if (explicitSize && explicitSize !== 'auto') return explicitSize as string;
    // Vertical: 100cqb of the host height, Horizontal: 100cqi of the host width
    const containerUnit = this.orientation() === 'horizontal' ? '100cqi' : '100cqb';

    const n: number = Math.min(this.itemsPerView(), this.itemsCount());
    return `calc((${ containerUnit } - (${ this.gap() }px * ${ n - 1 })) / ${ n })`;
  });

  private readonly injectedInitialIndex: Signal<number> = inject(GALLERY_INITIAL_INDEX, { optional: true });

  /** @ignore */
  readonly resolvedInitialIndex: Signal<number> = computed(() =>
    this.initialIndex() ?? this.injectedInitialIndex?.() ?? 0
  );

  /**
   * Initial active index
   */
  readonly initialIndex: InputSignalWithTransform<number, string | number> = input<number, string | number>(null, {
    transform: numberAttribute
  });

  protected abstract navigationSource: WritableSignal<NavigationTarget>;

  get navigationState(): Signal<NavigationTarget> {
    return this.navigationSource.asReadonly();
  }

  /**
   * Items data array count
   */
  readonly itemsCount: Signal<number> = computed(() => this.items()?.length ?? 0);

  /** The constant starting index of the gallery (always 0) */
  private readonly firstItemIndex: Signal<number> = computed(() => 0);

  /** The final available index based on the total item count */
  private readonly lastItemIndex: Signal<number> = computed(() => Math.max(0, this.itemsCount() - 1));

  /**
   * Visible entries
   */
  readonly visibleEntries: Signal<Record<string, IntersectionObserverEntry>> = computed(() => this.intersectionSensor().visibleEntries());

  /**
   * Signal indicates whether the Gallery has visible items
   */
  readonly hasVisibleItems: Signal<boolean> = computed(() => !!Object.keys(this.visibleEntries()).length);

  /** A sorted list of indices currently detected within the gallery viewport */
  private readonly visibleIndices: Signal<number[]> = computed(() => {
    return Object.keys(this.visibleEntries())
      .map(Number)
      .filter((index: number) => !Number.isNaN(index))
      .sort((a: number, b: number) => a - b);
  });

  /**
   * Active item component reference
   */
  readonly activeItem: Signal<SliderItem> = computed(() => this.renderedItems()[this.activeIndex()]);

  /**
   * @ignore
   * The index of the first item currently visible to the user
   */
  readonly firstVisibleIndex: Signal<number | null> = computed(() => this.visibleIndices()[0]);

  /**
   * @ignore
   * The index of the last item currently visible to the user
   */
  readonly lastVisibleIndex: Signal<number | null> = computed(() => this.visibleIndices().at(-1));

  /**
   * Validates if the item at the given index is fully visible (100% intersection)
   */
  private getVisibleEntry(index: number | null): IntersectionObserverEntry | null {
    if (index === null) return null;
    return this.intersectionSensor().visibleEntries()[String(index)] ?? null;
  }

  /**
   * Validates if the item at the given index is fully visible (100% intersection)
   */
  private isFullyVisible(entry: IntersectionObserverEntry | null): boolean {
    return !!entry && entry.intersectionRatio >= 0.999;
  }

  /**
   * @ignore
   * Calculates the next target index based on the current position and step count.
   * Clamps the result to the final item index to prevent out-of-bounds navigation.
   */
  getNextNavigationIndex(steps: number): number {
    return Math.min(
      this.navigationState().index + Math.max(1, steps),
      this.lastItemIndex()
    );
  }

  /**
   * @ignore
   * Calculates the previous target index based on the current position and step count.
   * Clamps the result to the first item index (0) to prevent out-of-bounds navigation.
   */
  getPrevNavigationIndex(steps: number): number {
    return Math.max(
      this.navigationState().index - Math.max(1, steps),
      this.firstItemIndex()
    );
  }

  /**
   * Whether the gallery can navigate forward.
   * Remains true if the last item is not yet reached or is partially obscured.
   */
  readonly hasNext: Signal<boolean> = computed(() => {
    if (this.forceSnap()) {
      return this.activeIndex() < this.lastItemIndex();
    }
    const lastVisibleIndex: number | undefined = this.lastVisibleIndex();
    if (lastVisibleIndex === undefined) return false;

    const lastVisibleEntry: IntersectionObserverEntry | null = this.getVisibleEntry(lastVisibleIndex);
    return !this.isFullyVisible(lastVisibleEntry) || lastVisibleIndex < this.lastItemIndex();
  });

  /**
   * Whether the gallery can navigate backward.
   * Remains true if the first item is not yet reached or is partially obscured.
   */
  readonly hasPrev: Signal<boolean> = computed(() => {
    if (this.forceSnap()) {
      return this.activeIndex() > this.firstItemIndex();
    }
    const firstVisibleIndex: number | undefined = this.firstVisibleIndex();
    if (firstVisibleIndex === undefined) return false;

    const firstVisibleEntry: IntersectionObserverEntry | null = this.getVisibleEntry(firstVisibleIndex);
    return !this.isFullyVisible(firstVisibleEntry) || firstVisibleIndex > this.firstItemIndex();
  });

  /**
   * Navigate to a slide by index
   */
  goTo({ index, behavior, source }: NavigationTarget): void {
    if (index < 0 || index >= this.itemsCount()) {
      console.error(`[NgGallery]: Unable to set the active item because the given index (${ index }) is outside the items range!`);
      return;
    }
    this.navigationSource.set({ index, behavior: behavior || this.scrollBehavior(), source: source || 'api' });
  }

  /**
   * Navigate to the next item
   */
  next({ loop = this.loop(), steps = this.steps(), behavior }: NavigationShift = {}): void {
    if (!this.hasVisibleItems()) {
      console.error('[NgGallery]: Unable to navigate because there is no items!');
      return;
    }
    if (steps === 'page') {
      if (this.itemSize()) {
        const target = this.getPageTarget('next');
        // Ensure we actually move forward at least by 1 to prevent getting stuck
        const finalIndex = Math.max(target, this.activeIndex() + 1);
        this.goTo({ index: Math.min(finalIndex, this.lastItemIndex()), behavior });
      } else {
        this.goTo({ index: this.getNextNavigationIndex(this.itemsPerView()), behavior });
      }
    } else {
      if (this.hasNext()) {
        this.goTo({ index: this.getNextNavigationIndex(steps as number), behavior });
      } else if (loop) {
        this.goTo({ index: this.firstItemIndex(), behavior });
      }
    }
  }

  /**
   * Navigate to the previous item
   */
  prev({ loop = this.loop(), steps = this.steps(), behavior }: NavigationShift = {}): void {
    if (!this.hasVisibleItems()) {
      console.error('[NgGallery]: Unable to navigate because there is no items!');
      return;
    }
    if (steps === 'page') {
      if (this.itemSize()) {
        const target = this.getPageTarget('prev');
        const finalIndex = Math.min(target, this.activeIndex() - 1);
        this.goTo({ index: Math.max(finalIndex, 0), behavior });
      } else {
        this.goTo({ index: this.getPrevNavigationIndex(this.itemsPerView()), behavior });
      }
    } else {
      if (this.hasPrev()) {
        this.goTo({ index: this.getPrevNavigationIndex(steps as number), behavior });
      } else if (loop) {
        this.goTo({ index: this.lastItemIndex(), behavior });
      }
    }
  }

  private getPageTarget(direction: 'next' | 'prev'): number {
    const isForward = direction === 'next';

    // Determine the anchor point (the index we are paging from)
    const fullyVisible = this.visibleIndices().filter(i => this.isFullyVisible(this.getVisibleEntry(i)));
    const anchorIndex = isForward ? fullyVisible.at(-1) : fullyVisible[0];

    const targetStartPoint = isForward ? anchorIndex + 1 : anchorIndex - 1;

    return this.calculateTargetWithFit({
      isForward,
      gap: this.gap(),
      align: this.snapAlign(),
      targetIndex: targetStartPoint,
      viewportSize: this.resizeSensor().viewportSize()[this.slider().adapter().sizeProperty]
    });
  }

  private calculateTargetWithFit(ctx: PageCalculationContext): number {
    const rendered = this.renderedItems();
    const offsetProp = this.slider().adapter().offsetSize;

    let accumulatedSize = 0;
    let fitCount = 0;
    const step = ctx.isForward ? 1 : -1;

    // Unified loop for both directions
    for (let i = ctx.targetIndex; i >= 0 && i <= this.lastItemIndex(); i += step) {
      const itemSize = rendered[i].nativeElement[offsetProp];
      const sizeWithGap = fitCount === 0 ? itemSize : itemSize + ctx.gap;

      if (accumulatedSize + sizeWithGap > ctx.viewportSize + 0.5 && fitCount > 0) break;

      accumulatedSize += sizeWithGap;
      fitCount++;
    }

    fitCount = Math.max(1, fitCount);
    const lastFitIndex = ctx.targetIndex + (step * (fitCount - 1));

    // 3. Handle Alignment logic concisely
    if (ctx.align === 'center') {
      return ctx.isForward
        ? ctx.targetIndex + Math.floor((fitCount - 1) / 2)
        : ctx.targetIndex - Math.floor((fitCount - 1) / 2);
    }

    if (ctx.align === 'end') {
      return ctx.isForward ? lastFitIndex : ctx.targetIndex;
    }

    // Default to 'start' alignment
    return ctx.isForward ? ctx.targetIndex : lastFitIndex;
  }
}

interface PageCalculationContext {
  targetIndex: number;      // The starting point for the search
  viewportSize: number;
  gap: number;
  isForward: boolean;
  align: 'start' | 'center' | 'end';
}
