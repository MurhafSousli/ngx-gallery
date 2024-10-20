import {
  Directive,
  effect,
  inject,
  signal,
  untracked,
  input,
  ElementRef,
  InputSignal,
  WritableSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import { Observable, Subscription, of, filter, fromEvent, switchMap, tap, take } from 'rxjs';
import { ImgManager } from '../utils/img-manager';
import { GalleryRef } from '../services/gallery-ref';

/**
 * Auto height feature prerequisites:
 * - autosize should be set to 'false'
 * - if thumbnails exist, it should not be aligned to the right or left
 */

@Directive({
  standalone: true,
  selector: '[autoHeight]'
})
export class AutoHeight {

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly manager: ImgManager = inject(ImgManager);

  private readonly _viewport: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly _galleryCore: HTMLElement = this._viewport.parentElement.parentElement.parentElement;

  readonly isResizing: WritableSignal<boolean> = signal(false);

  disabled: InputSignal<boolean> = input<boolean>(false, { alias: 'disableAutoHeight' });

  constructor() {
    let sub$: Subscription;

    let afterHeightChanged$: Observable<any>;


    // Check if height has transition for the auto-height feature
    const transitionDuration: string = getComputedStyle(this._viewport).transitionDuration;
    console.log(parseFloat(transitionDuration))
    if (!parseFloat(transitionDuration)) {
      afterHeightChanged$ = of(null);
    } else {
      afterHeightChanged$ = fromEvent(this._viewport, 'transitionend');
    }

    effect((onCleanup: EffectCleanupRegisterFn) => {
      if (this.disabled()) return;
      // const currIndex = this.galleryRef.currIndex();
      untracked(() => {
        sub$ = this.manager.getActiveItem().pipe(
          tap((img)=> {
            console.log('🤡 getActiveItem!', img.height, this._viewport.clientHeight);
          }),
          // SKip if img height is equal the slider height
          filter((img: HTMLImageElement) => img.height !== this._viewport.clientHeight),
          switchMap((img: HTMLImageElement) => {
            // TODO: Check if even to execute this code if there is no transition duration set.
            this._galleryCore.style.setProperty('--slider-height', `${ img.clientHeight }px`);
            this.isResizing.set(true);
            console.log('👽 Resize started!')

            return afterHeightChanged$.pipe(
              tap(() => {
                this.isResizing.set(false);
                console.log('🍄 Resize ended!')
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
