import { Directive, Input, AfterViewInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription, delay, of, switchMap, tap, EMPTY } from 'rxjs';
import { ImgManager } from '../utils/img-manager';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

@Directive({
  selector: 'gallery-core[autoplay]',
  standalone: true
})
export class AutoplayDirective implements AfterViewInit, OnChanges, OnDestroy {

  private _currentSubscription: Subscription;

  private _galleryRef: GalleryRef;

  @Input() config: GalleryConfig;

  @Input() galleryId: string;

  constructor(private _gallery: Gallery, private _imgManager: ImgManager) {
  }

  ngAfterViewInit(): void {
    this._galleryRef = this._gallery.ref(this.galleryId);
    this._subscribe();
    if (this.config.autoplay) {
      this._galleryRef.play();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this._galleryRef && changes.config?.currentValue.autoplay !== changes.config?.previousValue.autoplay) {
      this.config.autoplay ? this._galleryRef.play() : this._galleryRef.stop();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }


  private _subscribe(): void {
    this._unsubscribe();

    this._currentSubscription = this._galleryRef.playingChanged.pipe(
      switchMap((state: GalleryState) => {
        if (state.isPlaying) {
          return this._imgManager.getActiveItem(this._galleryRef.state).pipe(
            switchMap(() => of({}).pipe(
              delay(this.config.autoplayInterval),
              tap(() => {
                if (this._galleryRef.stateSnapshot.hasNext) {
                  this._galleryRef.next(this.config.scrollBehavior);
                } else {
                  this._galleryRef.set(0, this.config.scrollBehavior);
                }
              })
            ))
          );
        }
        return EMPTY;
      })
    ).subscribe();
  }

  private _unsubscribe(): void {
    this._currentSubscription?.unsubscribe();
  }
}
