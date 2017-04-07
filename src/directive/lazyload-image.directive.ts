import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter, Renderer2
} from '@angular/core';

@Directive({
  selector: '[lazyImage]'
})
export class LazyLoadImageDirective implements OnDestroy {

  // The image to be lazy
  @Input('lazyImage') set lazyImage(imagePath) {
    this.getImage(imagePath);
  }

  @Output() lazyLoaded = new EventEmitter<boolean>(false);

  el: HTMLElement;

  constructor(el: ElementRef, private renderer: Renderer2) {
    this.el = el.nativeElement;
  }

  getImage(imagePath) {
    this.lazyLoaded.emit(false);
    let img = this.renderer.createElement('img');
    // const img = new Image();
    img.src = imagePath;
    img.onload = () => {
      this.setImage(imagePath, img.naturalWidth, img.naturalHeight);
      this.lazyLoaded.emit(true);
    };
    img.onerror = err => {
      console.error('[LazyImageDirective]:', err);
      this.lazyLoaded.emit(true);
    };
  }

  setImage(imagePath: string, width, height) {
    const isImgNode = this.el.nodeName.toLowerCase() === 'img';
    if (isImgNode) {
      this.renderer.setProperty(this.el, 'src', imagePath);

      let viewWidth = getWidth();
      let viewHeight = getHeight();

      let maxWidth = (viewWidth < 1000) ? viewWidth : 1000;
      let maxHeight = (viewHeight * 94) / 100;

      let dim = calculateAspectRatioFit(width, height, maxWidth, maxHeight);
      console.log(dim);

      this.renderer.setStyle(this.el, 'width', dim.width + 'px');
      this.renderer.setStyle(this.el, 'height', dim.height + 'px');
    } else {
      this.renderer.setStyle(this.el, 'backgroundImage', `url('${imagePath}')`);
    }
  }

  ngOnDestroy() {
  }
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth*ratio, height: srcHeight*ratio };
}

const getWidth = () => {
  return window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
};

const getHeight = () => {
  return window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
};
