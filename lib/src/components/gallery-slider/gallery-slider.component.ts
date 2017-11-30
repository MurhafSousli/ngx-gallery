import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  templateUrl: './gallery-slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GallerySliderComponent implements OnInit {

  showNav = new BehaviorSubject(true);
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {

    /** Enable gestures */
    if (this.config.gestures) {
      if (typeof Hammer === 'undefined') {

        throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
      } else {
        const mc = new Hammer(this.el.nativeElement);

        mc.on('panstart', () => {
          this.renderer.removeClass(this.el.nativeElement, '-reset');

          /** Hide navigation */
          this.showNav.next(false);
        });

        mc.on('panend', () => {
          this.renderer.addClass(this.el.nativeElement, '-reset');

          /** Show navigation */
          this.showNav.next(true);
        });

        mc.on('pan', (e) => {
          const position = `translate3d(${e.deltaX}px, 0px, 0px)`;
          this.renderer.setStyle(this.el.nativeElement, 'mozTransform', position);
          this.renderer.setStyle(this.el.nativeElement, 'oTransform', position);
          this.renderer.setStyle(this.el.nativeElement, 'msTransform', position);
          this.renderer.setStyle(this.el.nativeElement, 'webkitTransform', position);
          this.renderer.setStyle(this.el.nativeElement, 'transform', position);
        });

        /**
         * Swipe to next image
         */
        mc.on('swipeleft', () => {
          this.gallery.next();
        });

        /**
         * Swipe to previous image
         */
        mc.on('swiperight', () => {
          this.gallery.prev();
        });
      }
    }

  }

}
