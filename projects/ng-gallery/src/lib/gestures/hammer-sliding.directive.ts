import {
  Directive,
  inject,
  signal,
  effect,
  untracked,
  input,
  NgZone,
  ElementRef,
  InputSignal,
  WritableSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HammerGestureConfig } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { take } from 'rxjs';
import { SliderAdapter } from '../components/adapters';
import { Orientation } from '../models/constants';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { GalleryThumbComponent } from '../components/gallery-thumb.component';
import { GalleryRef } from '../services/gallery-ref';
import { CustomHammerConfig, HammerInstance } from '../services/hammer';
import { createIntersectionObserver } from '../observers/active-item-observer';
import { Adapter } from '../components/adapters/adapter';

@Directive({
  standalone: true,
  selector: '[hammerSliding]',
  host: {
    '[class.g-sliding]': 'sliding()'
  },
  providers: [{ provide: HammerGestureConfig, useClass: CustomHammerConfig }]
})
export class HammerSliding {

  private readonly hammer: HammerGestureConfig = inject(HammerGestureConfig);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly _viewport: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly _document: Document = inject(DOCUMENT);

  private readonly _dir: Directionality = inject(Directionality);

  private readonly _platform: Platform = inject(Platform);

  private readonly _zone: NgZone = inject(NgZone);

  enabled: InputSignal<boolean> = input(false, { alias: 'hammerSliding' });

  adapter: Adapter = inject(Adapter);

  items: InputSignal<GalleryItemComponent[] | GalleryThumbComponent[]> = input<GalleryItemComponent[] | GalleryThumbComponent[]>();

  sliding: WritableSignal<boolean> = signal<boolean>(false);

  constructor() {
    /** HammerJS instance */
    let mc: HammerInstance;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const enabled: boolean = this.enabled();
      const adapter: SliderAdapter = this.adapter.adapter();

      if (!adapter || !enabled) return;

      if (this._platform.ANDROID || this._platform.IOS || !(this._document.defaultView as any).Hammer) return;

      untracked(() => {
        this._zone.runOutsideAngular(() => {

          const direction: number = adapter.hammerDirection;

          this.hammer.overrides.pan = { direction };
          mc = this.hammer.buildHammer(this._viewport);

          let offset: number;

          // Set panOffset for sliding on pan start event
          mc.on('panstart', () => {
            this._zone.run(() => {
              this.sliding.set(true);
            });

            offset = adapter.scrollValue;
          });

          mc.on('panmove', (e: any) => {
            this._viewport.scrollTo(adapter.getHammerValue(offset, e, 'auto'));
          });

          mc.on('panend', (e: any) => {
            this._document.onselectstart = null;
            // this._viewport.classList.remove('g-sliding');

            const index: number = this.getIndexOnMouseUp(e, this.adapter.adapter());
            if (index !== -1) {
              this._zone.run(() => {
                // this.isSlidingChange.emit(false);
                this.galleryRef.set(index);
                // Tiny delay is needed to avoid flicker positioning when scroll-snap is toggled
                requestAnimationFrame(() => {
                  this.sliding.set(false);
                });
              });
              return;
            }

            const visibleElements: Element[] = Object.values(this.galleryRef.visibleItems()).map((entry: IntersectionObserverEntry) => entry.target);

            // Get the diff between the viewport size and the smallest visible item size
            const diffSize: number = Object.values(this.galleryRef.visibleItems()).reduce((total: number, entry: IntersectionObserverEntry) => {
              return Math.max(total, (this._viewport.clientWidth - entry.boundingClientRect.width) / 2);
            }, 0);

            const options: IntersectionObserverInit = {
              root: this._viewport,
              threshold: 0,
              rootMargin: `0px ${ -diffSize }px 0px ${ -diffSize }px`
            };

            createIntersectionObserver(options, visibleElements).pipe(
              take(1)
            ).subscribe((entries: IntersectionObserverEntry[]) => {

              const centerElement: IntersectionObserverEntry = entries
                .filter((entry: IntersectionObserverEntry) => entry.isIntersecting)
                .reduce((acc: IntersectionObserverEntry, entry: IntersectionObserverEntry) => {
                  return acc ? acc.intersectionRatio > entry.intersectionRatio ? acc : entry : entry;
                }, null);

              this._zone.run(() => {
                // this.isSlidingChange.emit(false);
                const index: number = +centerElement.target.getAttribute('galleryIndex');
                this.galleryRef.set(index);
                // Tiny delay is needed to avoid flicker positioning when scroll-snap is toggled
                requestAnimationFrame(() => {
                  this.sliding.set(false);
                });
              });
            })
          });
        });

        onCleanup(() => mc?.destroy());
      });
    });
  }

  private getIndexOnMouseUp(e: any, adapter: SliderAdapter): number {
    const currIndex: number = this.galleryRef.currIndex();

    const velocity: number = adapter.getHammerVelocity(e);
    // Check if velocity is great enough to navigate
    if (Math.abs(velocity) > 0.3) {
      if (this.galleryRef.config().orientation === Orientation.Horizontal) {
        if (velocity > 0) {
          return this._dir.value === 'rtl' ? currIndex + 1 : currIndex - 1;
        }
        return this._dir.value === 'rtl' ? currIndex - 1 : currIndex + 1;
      } else {
        return velocity > 0 ? currIndex - 1 : currIndex + 1;
      }
    }

    // Reset position to the current index
    return -1;
  }
}
