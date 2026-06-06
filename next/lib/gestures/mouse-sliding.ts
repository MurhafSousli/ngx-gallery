import {
  Directive,
  inject,
  untracked,
  afterRenderEffect,
  ElementRef,
  EffectCleanupRegisterFn
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { Subject, takeUntil, tap } from 'rxjs';
import { Gestures } from './gestures';
import { SliderAdapter } from '../adapters';
import { GalleryRef } from '../gallery-ref';
import { IntersectionSensor } from '../observers/intersection-sensor';
import { SmoothScroll } from '../smooth-scroll/smooth-scroll.directive';
import { SliderContext } from '../slider/slider.token';

@Directive({
  selector: '[mouseSliding]'
})
export class MouseSliding {

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly smoothScroll: SmoothScroll = inject(SmoothScroll);

  private readonly intersectionSensor: IntersectionSensor = inject(IntersectionSensor);

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement

  private readonly _document: Document = inject(DOCUMENT);

  private readonly dir: Directionality = inject(Directionality);

  private readonly _platform: Platform = inject(Platform);

  readonly slider: SliderContext = inject(SliderContext, { self: true });

  constructor() {
    if (this._platform.ANDROID || this._platform.IOS) return;

    let gestures: Gestures;

    afterRenderEffect({
      earlyRead: (onCleanup: EffectCleanupRegisterFn) => {
        const adapter: SliderAdapter = this.slider.adapter();

        if (!adapter || this.galleryRef.disableMouseScroll()) return;

        const destroy$: Subject<void> = new Subject<void>();

        untracked(() => {
          gestures = new Gestures(this.nativeElement, this._document, adapter, this.dir, destroy$);

          gestures.panStart.pipe(
            tap(() => {
              this.smoothScroll.stop();
              this.slider.dragging.set(true);
            }),
            takeUntil(destroy$),
          ).subscribe();

          gestures.panMove.pipe(
            tap((position: number) => this.nativeElement.scrollTo({
              behavior: 'auto',
              [adapter.startProperty]: position
            })),
            takeUntil(destroy$),
          ).subscribe();
          gestures.panEnd.pipe(
            tap((event: 'swipeNext' | 'swipePrev') => {
              // Only allow swipe gestures if the slider has one item per view
              switch (this.galleryRef.isOneItemPerView() ? event : 'default') {
                case 'swipeNext':
                  this.galleryRef.next({ behavior: 'smooth', steps: 1, loop: false });
                  break;
                case 'swipePrev':
                  this.galleryRef.prev({ behavior: 'smooth', steps: 1, loop: false });
                  break;
                default: {
                  const index: number = this.intersectionSensor.anchorIndex();
                  this.galleryRef.goTo({ index, behavior: 'smooth' });
                  // const element: HTMLElement = untracked(this.slider.items)[index].nativeElement;
                  // element.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
                }
              }
              // Should set dragging to false after navigation function is called.
              this.slider.dragging.set(false);
            }),
            takeUntil(destroy$),
          ).subscribe();
        });

        onCleanup(() => {
          destroy$.next();
          destroy$.complete();
        });
      }
    });
  }
}
