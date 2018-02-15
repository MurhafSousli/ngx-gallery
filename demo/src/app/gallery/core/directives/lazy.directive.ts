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

  /** Lazy load worker */
  worker$ = new Subject();

  @Input('lazyImage')
  set lazyImage(imagePath) {
    this.getImage(imagePath);
  }

  @Output() loading = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
    const img = this.renderer.createElement('img');

    this.worker$.pipe(
      switchMap((imageSrc: string) => {

        /** Image is loading */
        this.loading.emit(true);

        /** Stop previously loading */
        img.src = imageSrc;

        /** Image load success */
        const imageSuccess = fromEvent(img, 'load').pipe(
          tap(() => {
            this.renderer.setStyle(this.el.nativeElement, 'backgroundImage', `url(${imageSrc})`);
            this.loading.emit(false);
          })
        );

        /** Image load error */
        const imageError = fromEvent(img, 'error').pipe(tap(() => this.loading.emit(false)));

        return zip(imageSuccess, imageError);
      })
    ).subscribe();
  }

  getImage(imagePath) {
    this.worker$.next(imagePath);
  }

  ngOnDestroy() {
    this.worker$.unsubscribe();
  }

}
