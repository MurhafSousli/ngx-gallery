import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Directive({
  selector: '[lazyImage]'
})
export class LazyLoadImageDirective implements OnDestroy {

  // The image to be lazy
  @Input('lazyImage') set lazyImage(imagePath) {
    this.getImage(imagePath);
  }

  // prevImgSrc;
  // @Output() prevImage = new EventEmitter<string>();
  @Output() lazyLoad = new EventEmitter<boolean>(false);

  el: HTMLElement;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }

  getImage(imagePath) {
    this.lazyLoad.emit(false);
    const img = this.renderer.createElement('img');
    img.src = imagePath;
    // if (this.prevImgSrc) {
    //   this.prevImage.next(this.prevImgSrc);
    // }
    img.onload = () => {
      Observable.of(null).delay(600).subscribe(() => {
        this.renderer.setStyle(this.el, 'backgroundImage', `url(${imagePath})`);
        // this.prevImgSrc = imagePath;
        this.lazyLoad.emit(true);
      });
    };
    img.onerror = err => {
      console.error('[LazyImageDirective]:', err);
      this.lazyLoad.emit(true);
    };
  }

  ngOnDestroy() {
  }
}

