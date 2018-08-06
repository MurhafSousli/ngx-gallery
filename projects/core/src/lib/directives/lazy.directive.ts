import { Directive, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Subject, zip, fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[lazyImage]'
})
export class LazyDirective implements OnDestroy {

  // Lazy load worker
  private _worker$ = new Subject();

  @Input('lazyImage')
  set lazyImage(imagePath: string) {
    this.loadImage(imagePath);
  }

  @Output() loaded = new EventEmitter<string>();

  constructor() {
    const img = new Image();

    this._worker$.pipe(
      switchMap((imageSrc: string) => {

        // Image is loading
        this.loaded.emit(null);

        // Stop previously loading
        img.src = imageSrc;

        // Image load success
        const loadSuccess = fromEvent(img, 'load').pipe(
          tap(() => {
            this.loaded.emit(`url(${imageSrc})`);
          })
        );

        // Image load error
        const loadError = fromEvent(img, 'error').pipe(tap((err: Error) => {
          console.warn('Gallery: Lazy image could not load!', err);
          this.loaded.emit(null);
        }));

        return zip(loadSuccess, loadError);
      })
    ).subscribe();
  }

  loadImage(imagePath: string) {
    this._worker$.next(imagePath);
  }

  ngOnDestroy() {
    this._worker$.complete();
  }

}
