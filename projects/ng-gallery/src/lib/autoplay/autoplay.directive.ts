import {
  Directive,
  inject,
  effect,
  untracked,
  EffectCleanupRegisterFn
} from '@angular/core';
import { Subscription, delay, of, switchMap, tap } from 'rxjs';
import { ImgManager } from '../utils/img-manager';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryConfig } from '../models/config.model';

@Directive({
  standalone: true,
  selector: 'gallery[autoplay]'
})
export class AutoplayDirective {

  private _galleryRef: GalleryRef = inject(GalleryRef);

  private _imgManager: ImgManager = inject(ImgManager);

  constructor() {
    let sub: Subscription;

    // TODO: Should not observe config in the two effects, will be refactored
    // TODO: Make especial inputs for the autoplay directive such as autoplayScrollBehavior

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: GalleryConfig = this._galleryRef.config();
      const isPlaying: boolean = this._galleryRef.isPlaying();

      untracked(() => {
        if (isPlaying) {
          sub = this._imgManager.getActiveItem().pipe(
            switchMap(() => of({}).pipe(
              delay(config.autoplayInterval),
              tap(() => {
                if (this._galleryRef.hasNext()) {
                  this._galleryRef.next(config.scrollBehavior);
                } else {
                  this._galleryRef.set(0, config.scrollBehavior);
                }
              })
            ))
          ).subscribe();
        }
        onCleanup(() => sub?.unsubscribe());
      });
    });

    effect(() => {
      const autoplay: boolean = this._galleryRef.config().autoplay;
      untracked(() => autoplay ? this._galleryRef.play() : this._galleryRef.stop());
    });
  }
}
