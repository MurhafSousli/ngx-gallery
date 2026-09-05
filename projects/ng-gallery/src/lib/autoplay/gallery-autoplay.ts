import {
  Directive,
  input,
  effect,
  inject,
  output,
  numberAttribute,
  booleanAttribute,
  ElementRef,
  InputSignal,
  OutputEmitterRef,
  EffectCleanupRegisterFn,
  InputSignalWithTransform
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Gallery } from '../gallery';
import { SliderItem } from '../slider-item/slider-item';
import { GalleryAutoplayDirection, GalleryAutoplayPause, GalleryOptions } from '../models/config.model';
import { GALLERY_OPTIONS } from '../models/gallery.token';

export type GalleryAutoplayState = 'playing' | 'paused' | 'stopped';

@Directive({
  selector: 'gallery[autoplay]'
})
export class GalleryAutoplay {

  private readonly defaultConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  private readonly document: Document = inject(DOCUMENT);

  private readonly gallery: Gallery = inject(Gallery);

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  // Persist autoplay state across effect re-runs so we don't emit duplicate 'stopped' events
  private autoplayState: GalleryAutoplayState | null = null;
  // Persist ping-pong direction across effect re-runs so we continue reversing correctly
  private pingPongDirection: 'forward' | 'backward' = 'forward';

  /**
   * Automatically cycle through items at time interval
   */
  readonly autoplay: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(true, {
    transform: booleanAttribute
  });

  /**
   * Sets the interval used for the autoplay feature
   */
  readonly autoplayInterval: InputSignalWithTransform<number, string | number> = input<number, string | number>(this.defaultConfig.autoplayInterval, {
    transform: numberAttribute
  });

  /**
   * Sets the interval used for the autoplay feature
   */
  readonly autoplayScrollBehavior: InputSignal<ScrollBehavior> = input<ScrollBehavior>(this.defaultConfig.autoplayScrollBehavior);

  /**
   * Sets the pause mode for the autoplay feature.
   * - `hover`: Pauses autoplay when the user hovers over the gallery.
   * - `click`: Pauses autoplay when the user clicks on the gallery.
   * - `never`: Autoplay will not pause based on user interaction.
   */
  readonly autoplayPause: InputSignal<GalleryAutoplayPause> = input<GalleryAutoplayPause>(this.defaultConfig.autoplayPause);

  /**
   * Specifies the direction flow for the autoplay sequence.
   *
   * - `forward`: Navigates sequentially from first to last item.
   * - `backward`: Navigates in reverse order from current position toward the first item.
   * - `ping-pong`: Navigates forward to the end, then reverses direction back to the start.
   */
  readonly autoplayDirection = input<GalleryAutoplayDirection>(this.defaultConfig.autoplayDirection);

  /**
   * Stream that emits when autoplay state changes (`playing`, `paused`, or `stopped`).
   */
  readonly autoplayChange: OutputEmitterRef<GalleryAutoplayState> = output<GalleryAutoplayState>();

  constructor() {
    effect((onCleanup: EffectCleanupRegisterFn) => {
      if (!this.autoplay()) {
        this.gallery.suppressLiveRegion.set(false);
        this.autoplayChange.emit('stopped');
        return;
      }

      this.gallery.suppressLiveRegion.set(true);

      const item: SliderItem = this.gallery.activeItem();
      if (item?.state() !== 'ready') return;

      const pauseMode: GalleryAutoplayPause = this.autoplayPause();
      const controller = new AbortController();

      let isPointerDown: boolean = false;
      let animation: Animation | null = null;

      const emitState = (state: GalleryAutoplayState) => {
        if (this.autoplayState !== state) {
          this.autoplayState = state;
          this.autoplayChange.emit(state);
        }
      };

      const isHovering = () => pauseMode === 'hover' && this.nativeElement.matches(':hover');

      const updatePlayback = () => {
        /* v8 ignore next -- @preserve */
        if (!animation) return;

        const shouldPause: boolean = (pauseMode === 'hover' && isHovering()) ||
          (pauseMode === 'hover' && isPointerDown) ||
          (pauseMode === 'click' && isPointerDown);

        if (shouldPause) {
          animation.pause();
          emitState('paused');
        } else {
          animation.play();
          emitState('playing');
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
          const mode = this.autoplayDirection();

          // Determine current effective direction. For ping-pong we keep a persisted direction
          // so we can flip when edges are reached.
          let currentDirection: 'forward' | 'backward' = mode === 'backward' ? 'backward' : 'forward';

          if (mode === 'ping-pong') {
            currentDirection = this.pingPongDirection;
          }

          // (no autoplayReversed in this implementation)

          const doNext = () => this.gallery.next({ behavior: this.autoplayScrollBehavior(), steps: 'page', loop: true });
          const doPrev = () => this.gallery.prev({ behavior: this.autoplayScrollBehavior(), steps: 'page', loop: true });

          if (mode === 'ping-pong') {
            if (currentDirection === 'forward') {
              // If we can go forward, do it. Otherwise flip and go backward if possible.
              if (this.gallery.hasNext()) {
                doNext();
              } else if (this.gallery.hasPrev()) {
                this.pingPongDirection = 'backward';
                doPrev();
              }
            } else {
              // backward direction
              if (this.gallery.hasPrev()) {
                doPrev();
              } else if (this.gallery.hasNext()) {
                this.pingPongDirection = 'forward';
                doNext();
              }
            }
          } else if (mode === 'backward') {
            doPrev();
          } else {
            doNext();
          }
        };

        updatePlayback();
      };

      // Initial start
      startTimer();

      // Only add hover listeners if pause mode is 'hover'
      if (pauseMode === 'hover') {
        this.nativeElement.addEventListener('mouseenter', () => updatePlayback(), { signal: controller.signal });
        this.nativeElement.addEventListener('mouseleave', () => updatePlayback(), { signal: controller.signal });
      }

      // Only add click/pointer listeners if pause mode is 'click' or 'hover'
      if (pauseMode === 'click' || pauseMode === 'hover') {
        this.nativeElement.addEventListener('pointerdown', () => {
          isPointerDown = true;
          updatePlayback();

          this.document.addEventListener('pointerup', () => {
            isPointerDown = false;
            updatePlayback();
          }, { signal: controller.signal });
        }, { signal: controller.signal });
      }

      onCleanup(() => {
        animation?.cancel();
        animation = null;
        controller.abort();
        // Only emit 'stopped' when autoplay has been disabled or the element is gone (final cleanup).
        // This prevents emitting 'stopped' on ordinary effect re-runs (e.g. when the active item changes)
        if (!this.autoplay()) {
          emitState('stopped');
        }
      });
    });
  }
}
