import {
  Directive,
  inject,
  effect,
  computed,
  untracked,
  input,
  Signal,
  NgZone,
  ElementRef,
  InputSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from '../services/gallery-ref';
import { SliderAdapter } from '../components/adapters';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { createIntersectionObserver } from './active-item-observer';
import { Adapter } from '../components/adapters/adapter';
import { SmoothScroll } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';

/**
 * This observer used to detect when a slider element reaches the active soon
 */
@Directive({
  standalone: true,
  selector: '[sliderIntersectionObserver]'
})
export class SliderIntersectionObserver {

  private readonly zone: NgZone = inject(NgZone);

  private readonly smoothScroll: SmoothScroll = inject(SmoothScroll);

  private readonly hammerSlider: HammerSliding = inject(HammerSliding);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  adapter: Adapter = inject(Adapter);

  items: InputSignal<GalleryItemComponent[]> = input<GalleryItemComponent[]>();

  readonly disableInteractionObserver: Signal<boolean> = computed(() => {
    return this.smoothScroll.scrolling() || this.hammerSlider.sliding(); // || this.resizeSensor.isResizing();
  });

  constructor() {
    let visibleItemsObserver$: Subscription;
    let activeItemObserver$: Subscription;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: GalleryConfig = this.galleryRef.config();
      const items: GalleryItemComponent[] = this.items();
      const adapter: SliderAdapter = this.adapter.adapter();

      if (!adapter || !items.length) return;

      untracked(() => {
        const rootMargin: string = adapter.getRootMargin();
        if (config.debug) {
          this.nativeElement.style.setProperty('--intersection-margin', `"INTERSECTION(${ rootMargin })"`);
        }

        this.zone.runOutsideAngular(() => {
          const options: IntersectionObserverInit = { root: this.nativeElement, threshold: 0, rootMargin };
          const elements: HTMLElement[] = items.map((item: GalleryItemComponent) => item.nativeElement);

          visibleItemsObserver$ = createIntersectionObserver(options, elements).subscribe((entries: IntersectionObserverEntry[]) => {
            console.log(entries)
            const visibleItems: Record<number, IntersectionObserverEntry> = this.galleryRef.visibleItems();
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('g-item-highlight');
                visibleItems[+entry.target.getAttribute('galleryIndex')] = entry;
              } else {
                entry.target.classList.remove('g-item-highlight');
                delete visibleItems[+entry.target.getAttribute('galleryIndex')];
              }
            });
            this.zone.run(() => {
              this.galleryRef.visibleItems.set({ ...visibleItems });
            });
          });
        });

        onCleanup(() => visibleItemsObserver$?.unsubscribe());
      });
    });

    effect((onCleanup) => {
      const disabled: boolean = this.disableInteractionObserver();
      const visibleElements: Record<number, IntersectionObserverEntry> = this.galleryRef.visibleItems();

      if (disabled) return;

      untracked(() => {

        const elements = Object.values(visibleElements).map(x => x.target);

        // Get the diff between the viewport size and the smallest visible item size
        const diffSize: number = Object.values(this.galleryRef.visibleItems()).reduce((total: number, entry: IntersectionObserverEntry) => {
          return Math.min(total, (this.nativeElement.clientWidth - entry.boundingClientRect.width) / 2);
        }, 0);

        const options: IntersectionObserverInit = {
          root: this.nativeElement,
          threshold: .99,
          rootMargin: `0px ${ -diffSize }px 0px ${ -diffSize }px`
        };

        this.zone.runOutsideAngular(() => {
          activeItemObserver$ = createIntersectionObserver(options, elements).subscribe((entries: IntersectionObserverEntry[]) => {

            const centerElement: IntersectionObserverEntry = entries
              .filter((entry: IntersectionObserverEntry) => entry.isIntersecting)
              .reduce((acc: IntersectionObserverEntry, entry: IntersectionObserverEntry) => {
                return acc ? acc.intersectionRatio > entry.intersectionRatio ? acc : entry : entry;
              }, null);

            if (!centerElement) return;

            const index: number = +centerElement.target.getAttribute('galleryIndex');

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
