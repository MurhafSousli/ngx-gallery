import { Directive, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Subject, zip, fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[lazyImage]'
})
export class LazyImage implements OnDestroy {

  private _worker$ = new Subject();

  @Input('lazyImage')
  set lazyImage(imagePath: string) {
    this.loadImage(encodeURIComponent(imagePath));
  }

  @Output() loaded = new EventEmitter<string>();
  @Output() error = new EventEmitter<Error>();

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

        // Image load failed
        const loadError = fromEvent(img, 'error').pipe(
          tap(() => {
            this.error.emit(new Error(`[lazyImage]: The image ${imageSrc} did not load`));
            this.loaded.emit(null);
          })
        );

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
