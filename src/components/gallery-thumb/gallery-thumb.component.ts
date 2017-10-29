import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryThumbConfig } from '../../models';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryThumbComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryThumbConfig;

  constructor(public gallery: Gallery, private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {

    /** Set thumbnails position (top or bottom) */
    const order = this.config.position === 'top' ? 0 : 2;
    this.renderer.setStyle(this.el.nativeElement, 'order', order);
    this.renderer.setStyle(this.el.nativeElement, '-webkit-order', order);

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

  /** Centralize active thumbnail */
  translateThumbs() {
    const x = this.state.currIndex * this.config.width + this.config.width / 2;
    return `translate3d(${-x}px, 0, 0)`;
  }

  getThumbImage(i) {
    /** Use thumbnail if presented */
    return `url(${this.state.items[i].thumbnail || this.state.items[i].src})`;
  }

}
