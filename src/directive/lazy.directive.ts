import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[lazyImage]'
})
export class LazyDirective {

  // Image source
  @Input('lazyImage') set lazyImage(imagePath) {
    this.getImage(imagePath);
  }

  @Output() lazyLoad = new EventEmitter<boolean>(false);

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  getImage(imagePath) {
    this.lazyLoad.emit(false);
    const img = this.renderer.createElement('img');
    img.src = imagePath;

    img.onload = () => {
      this.renderer.setProperty(this.el.nativeElement, 'src', imagePath);
      this.lazyLoad.emit(true);
    };

    img.onerror = err => {
      console.error('[GalleryLazyDirective]:', err);
      this.lazyLoad.emit(err);
    };
  }

}

