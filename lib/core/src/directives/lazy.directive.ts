import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  OnDestroy
} from '@angular/core';

import { Subject, zip as observableZip, fromEvent as observableFromEvent } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
        const loadSuccess = observableFromEvent(img, 'load').pipe(
          tap(() => {
            this._renderer.setStyle(this._el.nativeElement, 'backgroundImage', `url(${imageSrc})`);
            this.loading.emit(false);
          })
        );

        // Image load error
        const loadError = observableFromEvent(img, 'error').pipe(tap(() => this.loading.emit(false)));

        return observableZip(loadSuccess, loadError);
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
