import {
  Directive,
  inject,
  effect,
  computed,
  untracked,
  Signal,
  NgZone,
  ElementRef,
  EffectCleanupRegisterFn
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from '../services/gallery-ref';
import { SliderAdapter } from '../components/adapters';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { createIntersectionObserver } from './active-item-observer';
import { SmoothScroll } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SliderComponent } from '../components/slider/slider';
import { SliderItem } from '../components/items/items';

/**
 * This observer used to detect when a slider element reaches the active soon
 */
@Directive({
  standalone: true,
  selector: '[intersectionSensor]'
})
export class IntersectionSensor {

  private readonly zone: NgZone = inject(NgZone);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly smoothScroll: SmoothScroll = inject(SmoothScroll);

  private readonly hammerSlider: HammerSliding = inject(HammerSliding);

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly slider: SliderComponent = inject(SliderComponent, { self: true });

  readonly disableInteractionObserver: Signal<boolean> = computed(() => {
    return this.smoothScroll.scrolling() || this.hammerSlider.sliding(); // || this.resizeSensor.isResizing();
  });

  constructor() {
    let visibleItemsObserver$: Subscription;
    let activeItemObserver$: Subscription;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: GalleryConfig = this.galleryRef.config();
      const items: ReadonlyArray<SliderItem> = this.slider.items();
      const adapter: SliderAdapter = this.slider.adapter();

      if (!adapter || !items.length) return;

      untracked(() => {
        const rootMargin: string = adapter.getRootMargin();
        if (config.debug) {
          this.nativeElement.style.setProperty('--intersection-margin', `"INTERSECTION(${ rootMargin })"`);
        }

        this.zone.runOutsideAngular(() => {
          const options: IntersectionObserverInit = { root: this.nativeElement, threshold: 0.1, rootMargin };
          const elements: HTMLElement[] = items.map((item: GalleryItemComponent) => item.nativeElement);

          visibleItemsObserver$ = createIntersectionObserver(options, elements).subscribe((entries: IntersectionObserverEntry[]) => {
            const visibleItems: Record<number, IntersectionObserverEntry> = this.slider.visibleEntries();
            entries.forEach((entry: IntersectionObserverEntry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('g-item-highlight');
                visibleItems[+entry.target.getAttribute('galleryIndex')] = entry;
              } else {
                entry.target.classList.remove('g-item-highlight');
                delete visibleItems[+entry.target.getAttribute('galleryIndex')];
              }
            });
            this.zone.run(() => {
              this.slider.visibleEntries.set({ ...visibleItems });
            });
          });
        });

        onCleanup(() => visibleItemsObserver$?.unsubscribe());
      });
    });

    effect((onCleanup) => {
      const disabled: boolean = this.disableInteractionObserver();
      const visibleElements: IntersectionObserverEntry[] = Object.values(this.slider.visibleEntries());

      if (disabled) return;

      untracked(() => {
        const elements: Element[] = visibleElements.map((entry: IntersectionObserverEntry) => entry.target);

        // Get the diff between the viewport size and the smallest visible item size
        const diffSize: number = visibleElements.reduce((total: number, entry: IntersectionObserverEntry) => {
          return Math.min(total, (this.nativeElement.clientWidth - entry.boundingClientRect.width) / 2);
        }, 0);

        const options: IntersectionObserverInit = {
          root: this.nativeElement,
          threshold: .99,
          rootMargin: `0px ${ -diffSize }px 0px ${ -diffSize }px`
        };

        this.zone.runOutsideAngular(() => {
          activeItemObserver$ = createIntersectionObserver(options, elements).subscribe((entries: IntersectionObserverEntry[]) => {

            const elementWithHighestIntersectionRatio: IntersectionObserverEntry = entries
              .filter((entry: IntersectionObserverEntry) => entry.isIntersecting)
              .reduce((acc: IntersectionObserverEntry, entry: IntersectionObserverEntry) => {
                return acc ? acc.intersectionRatio > entry.intersectionRatio ? acc : entry : entry;
              }, null);

            if (!elementWithHighestIntersectionRatio) return;

            const index: number = +elementWithHighestIntersectionRatio.target.getAttribute('galleryIndex');

            if (index === this.galleryRef.currIndex()) return;

            // Set the new current index
            this.zone.run(() => this.galleryRef.currIndex.set(index));
          });
        });

        onCleanup(() => activeItemObserver$?.unsubscribe())
      });
    });
  }
}
