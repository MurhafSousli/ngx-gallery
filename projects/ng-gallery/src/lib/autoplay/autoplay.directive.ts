import { Directive, Input, AfterViewInit, OnDestroy, inject, effect } from '@angular/core';
import { Subscription, delay, of, switchMap, tap, EMPTY } from 'rxjs';
import { ImgManager } from '../utils/img-manager';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryConfig } from '../models/config.model';

@Directive({
  selector: 'gallery-core[autoplay]',
  standalone: true
})
export class AutoplayDirective implements AfterViewInit, OnDestroy {

  private _currentSubscription: Subscription;

  private _galleryRef: GalleryRef = inject(GalleryRef);

  private _imgManager: ImgManager = inject(ImgManager);

  @Input() config: GalleryConfig;

  @Input() galleryId: string;

  constructor() {
    effect(() => {
      if (this._galleryRef.config().autoplay) {
        this._galleryRef.play();
      } else {
        this._galleryRef.stop();
      }
    }, { allowSignalWrites: true });
  }

  ngAfterViewInit(): void {
    this._subscribe();
    if (this.config.autoplay) {
      this._galleryRef.play();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }


  private _subscribe(): void {
    this._unsubscribe();

    // this._currentSubscription = this._galleryRef.playingChanged.pipe(
    //   switchMap((state: GalleryState) => {
    //     if (state.isPlaying) {
    //       return this._imgManager.getActiveItem(this._galleryRef.state).pipe(
    //         switchMap(() => of({}).pipe(
    //           delay(this.config.autoplayInterval),
    //           tap(() => {
    //             if (this._galleryRef.stateSnapshot.hasNext) {
    //               this._galleryRef.next(this.config.scrollBehavior);
    //             } else {
    //               this._galleryRef.set(0, this.config.scrollBehavior);
    //             }
    //           })
    //         ))
    //       );
    //     }
    //     return EMPTY;
    //   })
    // ).subscribe();
  }

  private _unsubscribe(): void {
    this._currentSubscription?.unsubscribe();
  }
}
