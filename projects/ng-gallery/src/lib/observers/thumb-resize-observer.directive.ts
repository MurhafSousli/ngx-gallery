import {
  Directive,
  effect,
  inject,
  output,
  input,
  NgZone,
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  EffectCleanupRegisterFn
} from '@angular/core';
import { Subscription, tap, debounceTime, animationFrameScheduler } from 'rxjs';
import { resizeObservable } from '../utils/resize-observer';
import { GalleryConfig } from '../models/config.model';
import { SliderAdapter } from '../components/adapters';

@Directive({
  standalone: true,
  selector: '[thumbResizeObserver]'
})
export class ThumbResizeObserver {

  private readonly _viewport: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly _zone: NgZone = inject(NgZone);

  config: InputSignal<GalleryConfig> = input<GalleryConfig>();

  adapter: InputSignal<SliderAdapter> = input<SliderAdapter>();

  resized: OutputEmitterRef<void> = output<void>({ alias: 'thumbResizeObserver' });

  constructor() {
    let resizeSubscription$: Subscription;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      if (!resizeSubscription$) {
        this.updateSliderSize();
      } else {
        resizeSubscription$?.unsubscribe();
      }

      this._zone.runOutsideAngular(() => {
        resizeSubscription$ = resizeObservable(this._viewport).pipe(
          debounceTime(this.config().resizeDebounceTime, animationFrameScheduler),
          tap(() => {
            this.updateSliderSize();
            this.resized.emit();
          })
        ).subscribe();
      });

      onCleanup(() => resizeSubscription$?.unsubscribe());
    });
  }

  private updateSliderSize(): void {
    this._viewport.style.setProperty('--thumb-centralize-start-size', this.adapter().getCentralizerStartSize() + 'px');
    this._viewport.style.setProperty('--thumb-centralize-end-size', this.adapter().getCentralizerEndSize() + 'px');
  }
}
