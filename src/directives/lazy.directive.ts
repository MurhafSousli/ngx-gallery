import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Renderer2,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

@Directive({
  selector: '[lazyImage]'
})
export class LazyDirective implements OnDestroy {

  /** Lazy load worker */
  lazyWorker$ = new Subject();

  @Input('lazyImage')
  set lazyImage(imagePath) {
    this.getImage(imagePath);
  }

  @Output() loading = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private renderer: Renderer2) {

    this.lazyWorker$.switchMap((imageSrc) =>

      Observable.of(imageSrc)
        .do((src: string) => {

          /** Image is loading */
          this.loading.emit(true);

          const img = this.renderer.createElement('img');
          img.src = src;

          /** Image is loaded */
          img.onload = () => {
            this.renderer.setProperty(this.el.nativeElement, 'src', src);
            this.loading.emit(false);
          };

          /** Image load error */
          img.onerror = err => {
            console.error('[GalleryLazyDirective]:', err);
            this.loading.emit(false);
          };
        })
    ).subscribe();
  }

  getImage(imagePath) {
    this.lazyWorker$.next(imagePath);
  }

  ngOnDestroy() {
    this.lazyWorker$.unsubscribe();
  }

}
