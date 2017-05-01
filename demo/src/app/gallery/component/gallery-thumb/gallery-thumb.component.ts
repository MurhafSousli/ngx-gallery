import {
  Component, Input, ChangeDetectionStrategy, ElementRef, Renderer2, OnInit
} from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryState } from '../../service/gallery.state';
import { GalleryThumbConfig } from '../../config/gallery.config';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryThumbComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryThumbConfig;

  contStyle;

  constructor(public gallery: GalleryService, private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {

    this.contStyle = this.getContainerStyle();

    /** Enable gestures */
    if (this.gallery.config.gestures) {
      if (typeof Hammer === 'undefined') {

        throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
      } else {
        const el = this.el.nativeElement;
        const mc = new Hammer(el);

        mc.on('panstart', () => {
          this.renderer.removeClass(el, 'g-pan-reset');
        });
        mc.on('panend', () => {
          this.renderer.addClass(el, 'g-pan-reset');
        });

        /** Pan left and right */
        mc.on('pan', (e) => {
          this.renderer.setStyle(el, 'transform', `translate3d(${e.deltaX}px, 0px, 0px)`);
        });
        /** Swipe next and prev */
        mc.on('swipeleft', () => {
          this.gallery.next();
        });
        mc.on('swiperight', () => {
          this.gallery.prev();
        });
      }
    }
  }

  translateThumbs() {
    const x = this.state.currIndex * this.config.width + this.config.width / 2;
    return `translate3d(${-x}px, 0, 0)`;
  }

  getContainerStyle() {
    /** Set thumbnails position (top, bottom) */
    const order = this.config.position === 'top' ? 0 : 2;
    this.renderer.setStyle(this.el.nativeElement, 'order', order);

    return {
      height: this.config.height + 'px',
      margin: this.config.space + 'px'
    };
  }

  getThumbImage(i) {
    /** Use thumbnail if presented */
    return `url(${this.state.images[i].thumbnail || this.state.images[i].src})`;
  }

}
