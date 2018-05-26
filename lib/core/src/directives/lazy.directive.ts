import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { switchMap } from 'rxjs/operators/switchMap';
import { tap } from 'rxjs/operators/tap';
import { zip } from 'rxjs/observable/zip';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Directive({
  selector: '[lazyImage]'
})
export class LazyDirective implements OnDestroy {

  // Lazy load worker
  private _worker$ = new Subject();

  @Input('lazyImage')
  set lazyImage(imagePath) {
    this.loadImage(imagePath);
  }

  @Output() loading = new EventEmitter<boolean>();

  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    const img = new Image();

    this._worker$.pipe(
      switchMap((imageSrc: string) => {

        // Image is loading
        this.loading.emit(true);

        // Stop previously loading
        img.src = imageSrc;

        // Image load success
        const loadSuccess = fromEvent(img, 'load').pipe(
          tap(() => {
            this._renderer.setStyle(this._el.nativeElement, 'backgroundImage', `url(${imageSrc})`);
            this.loading.emit(false);
          })
        );

        // Image load error
        const loadError = fromEvent(img, 'error').pipe(tap(() => this.loading.emit(false)));

        return zip(loadSuccess, loadError);
      })
    ).subscribe();
  }

  loadImage(imagePath) {
    this._worker$.next(imagePath);
  }

  ngOnDestroy() {
    this._worker$.complete();
  }

}
