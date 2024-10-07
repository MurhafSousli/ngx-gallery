import {
  Directive,
  signal,
  inject,
  effect,
  computed,
  untracked,
  NgZone,
  Signal,
  WritableSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import { SharedResizeObserver } from '@angular/cdk/observers/private';
import { Subscription, animationFrameScheduler, throttleTime, combineLatest } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from './gallery-ref';
import { SliderComponent } from '../components/slider/slider';

@Directive({
  standalone: true,
  selector: '[resizeSensor]',
  host: {
    '[style.--slider-width.px]': 'slideSize()?.width',
    '[style.--slider-height.px]': 'slideSize()?.height',
    '[style.--centralize-start-size.px]': 'centralizeStart()',
    '[style.--centralize-end-size.px]': 'centralizeEnd()'
  }
})
export class ResizeSensor {

  private readonly sharedResizeObserver: SharedResizeObserver = inject(SharedResizeObserver)

  private readonly slider: SliderComponent = inject(SliderComponent, { self: true });

  private readonly zone: NgZone = inject(NgZone);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly slideSize: WritableSignal<DOMRectReadOnly> = signal(null);

  readonly contentSize: WritableSignal<DOMRectReadOnly> = signal(null);

  readonly centralizeStart: Signal<number> = computed(() => {
    if (!this.slideSize() || !this.contentSize()) return;
    return this.slider.adapter()?.getCentralizerStartSize();
  });

  readonly centralizeEnd: Signal<number> = computed(() => {
    if (!this.slideSize() || !this.contentSize()) return;
    return this.slider.adapter()?.getCentralizerEndSize();
  });

  constructor() {
    let resizeSubscription$: Subscription;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: GalleryConfig = this.galleryRef.config();

      // Make sure items are rendered
      if (!this.slider.items().length) return;

      untracked(() => {
        this.zone.runOutsideAngular(() => {
          resizeSubscription$ = combineLatest([
            this.sharedResizeObserver.observe(this.slider.nativeElement),
            this.sharedResizeObserver.observe(this.slider.nativeElement.firstElementChild)
          ]).pipe(
            throttleTime(config.resizeDebounceTime, animationFrameScheduler, {
              leading: true,
              trailing: true
            }),
          ).subscribe(([sliderEntries, contentEntries]: [ResizeObserverEntry[], ResizeObserverEntry[]]) => {
            this.zone.run(() => {
              if (!sliderEntries || !contentEntries) return;

              if (sliderEntries[0].contentRect.height) {
                this.slideSize.set(sliderEntries[0].contentRect);
              }

              if (contentEntries[0].contentRect.height) {
                this.contentSize.set(contentEntries[0].contentRect);
              }
            });
          });
        });

        onCleanup(() => resizeSubscription$?.unsubscribe());
      });
    });
  }
}
