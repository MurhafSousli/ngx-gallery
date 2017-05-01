import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ElementRef,
  Renderer2
} from '@angular/core';
import { GalleryState } from '../../service/gallery.state';
import { GalleryConfig } from '../../config/gallery.config';
import { GalleryService } from '../../service/gallery.service';
import { animation } from './gallery-image.animation';

declare const Hammer: any;

@Component({
  selector: 'gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: animation
})
export class GalleryImageComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  loading: boolean;
  animate: string;

  constructor(public gallery: GalleryService, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    /** Enable gestures */
    if (this.config.gestures) {
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

  imageLoad(done: boolean) {
    this.loading = !done;
    /** TODO: Add some animation */

    if (done) {
      this.animate = 'none';
    } else {
      switch (this.config.animation) {
        case 'fade':
          this.animate = 'fade';
          break;
        default:
          this.animate = 'none';
      }
      //     this.animate = 'none';
      //   case 'slide':
      //     this.animate = (this.state.currIndex > this.state.prevIndex) ? 'slideLeft' : 'slideRight';
      //     break;
      //   default:
      //     this.animate = 'none';
    }

  }
}
