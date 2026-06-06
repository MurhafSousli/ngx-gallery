import {
  Directive,
  input,
  effect,
  inject,
  numberAttribute,
  booleanAttribute,
  ElementRef,
  InputSignal,
  EffectCleanupRegisterFn,
  InputSignalWithTransform
} from '@angular/core';
import { Gallery } from '../gallery';
import { SliderItem } from '../slider-item/slider-item';
import { GalleryOptions } from '../models/config.model';
import { GALLERY_OPTIONS } from '../models/gallery.token';

@Directive({
  selector: 'gallery[autoplay]'
})
export class GalleryAutoplay {

  private readonly defaultConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  private readonly gallery: Gallery = inject(Gallery);

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  /**
   * Automatically cycle through items at time interval
   */
  autoplay: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(true, {
    transform: booleanAttribute
  });

  /**
   * Sets the interval used for the autoplay feature
   */
  autoplayInterval: InputSignalWithTransform<number, string | number> = input<number, string | number>(this.defaultConfig.autoplayInterval, {
    transform: numberAttribute
  });

  /**
   * Sets the interval used for the autoplay feature
   */
  autoplayScrollBehavior: InputSignal<ScrollBehavior> = input<ScrollBehavior>(this.defaultConfig.autoplayScrollBehavior);

  constructor() {
    effect((onCleanup: EffectCleanupRegisterFn) => {
      if (!this.autoplay()) {
        this.gallery.suppressLiveRegion.set(false);
        return;
      }

      this.gallery.suppressLiveRegion.set(true);

      const item: SliderItem = this.gallery.activeItem();
      if (item?.state() !== 'ready') return;

      const controller = new AbortController();

      let isPointerDown: boolean = false;
      let animation: Animation | null = null;

      const isHovering = () => this.nativeElement.matches(':hover');

      const updatePlayback = () => {
        if (isHovering() || isPointerDown) {
          animation.pause();
        } else {
          animation.play();
        }
      };

      const startTimer = () => {
        animation?.cancel();

        animation = this.nativeElement.animate([
          { '--g-autoplay-progress': '0' },
          { '--g-autoplay-progress': '1' }
        ], {
          duration: this.autoplayInterval(),
          easing: 'linear',
          fill: 'forwards',
          iterations: 1
        });

        animation.onfinish = () => {
          this.gallery.next({ behavior: this.autoplayScrollBehavior() });
        };

        updatePlayback();
      };

      // Initial start
      startTimer();

      this.nativeElement.addEventListener('mouseenter', () => updatePlayback(), { signal: controller.signal });

      this.nativeElement.addEventListener('mouseleave', () => updatePlayback(), { signal: controller.signal });

      this.nativeElement.addEventListener('pointerdown', () => {
        isPointerDown = true;
        updatePlayback();
      }, { signal: controller.signal });

      this.nativeElement.addEventListener('pointerup', () => {
        isPointerDown = false;
        updatePlayback();
      }, { signal: controller.signal });

      onCleanup(() => {
        animation?.cancel();
        animation = null;
        controller.abort();
      })
    });
  }
}
