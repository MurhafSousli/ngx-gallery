import {
  Directive,
  effect,
  inject,
  signal,
  untracked,
  WritableSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import {
  Observable,
  Subscription,
  of,
  filter,
  fromEvent,
  switchMap,
  tap,
  take,
  debounceTime,
  animationFrameScheduler
} from 'rxjs';
import { ImgManager } from '../utils/img-manager';
import { GalleryComponent } from '../core/gallery.component';
import { ResizeSensor } from '../services/resize-sensor';

/**
 * Auto height feature prerequisites:
 * - autosize should be set to 'false'
 * - if thumbnails exist, it should not be aligned to the right or left
 */

@Directive({
  selector: 'gallery[autoHeight]',
  host: {
    '[attr.autoHeight]': 'true',
    '[class.g-resizing]': 'isResizing()',
    '[style.--slider-auto-height.px]': 'height()',
  }
})
export class AutoHeight {

  private readonly gallery: GalleryComponent = inject(GalleryComponent);

  private readonly manager: ImgManager = inject(ImgManager);

  readonly isResizing: WritableSignal<boolean> = signal(false);

  readonly height: WritableSignal<number> = signal(0);

  constructor() {
    let sub$: Subscription;

    let afterHeightChanged$: Observable<any>;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const resizeSensor: ResizeSensor = this.gallery.slider().resizeSensor();
      // Check if height has transition for the auto-height feature
      const transitionDuration: string = getComputedStyle(resizeSensor.nativeElement).transitionDuration;
      if (!parseFloat(transitionDuration)) {
        afterHeightChanged$ = of({});
      } else {
        console.log(transitionDuration)
        afterHeightChanged$ = fromEvent(resizeSensor.nativeElement, 'transitionend');
      }
      // if (!this.galleryRef.config().autoHeight) return;
      // const currIndex = this.galleryRef.currIndex();
      untracked(() => {
        sub$ = this.manager.getActiveItem().pipe(
          filter((img: HTMLImageElement) => !!img),
          // Wait for item image to be rendered
          debounceTime(0, animationFrameScheduler),
          // Skip if img height is equal the slider height
          filter((img: HTMLImageElement) => {
            console.log('🦕', resizeSensor.nativeElement.clientHeight, img.height)
            return img.height !== resizeSensor.nativeElement.clientHeight
          }),
          switchMap((img: HTMLImageElement) => {
            console.log('👽 Resize started! --slider-height', resizeSensor.nativeElement.clientHeight, img.height)
            resizeSensor.disabled.set(true);
            this.isResizing.set(true);

            resizeSensor.nativeElement.style.setProperty('--slider-height', `${img.height}px`)

            return afterHeightChanged$.pipe(
              debounceTime(0, animationFrameScheduler),
              tap(() => {
                resizeSensor.disabled.set(false);
                this.isResizing.set(false);
              }),
              take(1)
            );
          })
        ).subscribe();

        onCleanup(() => sub$?.unsubscribe());
      });
    });
  }
}
