import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/delay';

@Directive({
  selector: '[lazyImage]'
})
export class LazyDirective implements OnDestroy {

  // Image source
  @Input('lazyImage') set lazyImage(imagePath) {
    this.getImage(imagePath);
  }

  @Output() lazyLoad = new EventEmitter<boolean>(false);

  el: HTMLElement;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }

  getImage(imagePath) {
    this.lazyLoad.emit(false);
    const img = this.renderer.createElement('img');
    img.src = imagePath;

    img.onload = () => {
      // Observable.of(null).delay(600).subscribe(() => {
      this.renderer.setStyle(this.el, 'backgroundImage', `url(${imagePath})`);
      this.lazyLoad.emit(true);
      // });
    };

    img.onerror = err => {
      console.error('[LazyImageDirective]:', err);
      this.lazyLoad.emit(true);
    };
  }

  ngOnDestroy() {
  }
}

