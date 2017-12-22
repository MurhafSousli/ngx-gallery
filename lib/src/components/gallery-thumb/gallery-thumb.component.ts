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
import { GalleryState, GalleryAction, GalleryItem, GalleryThumbConfig } from '../../models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

declare const Hammer: any;

export interface ThumbnailState {
  position: any;
  items: ThumbnailItem[];
}

export interface ThumbnailItem {
  index: number;
  activeClass: string;
  thumbnail: string;
}

@Component({
  selector: 'gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryThumbComponent implements OnInit {

  state$: Observable<ThumbnailState>;
  @Input() config: GalleryThumbConfig;

  constructor(public gallery: Gallery, private el: ElementRef, private renderer: Renderer2) {

    this.state$ = this.gallery.state$.pipe(
      switchMap((state: GalleryState) => of({
        currIndex: state.currIndex,
        position: this.translateThumbnails(state.currIndex),
        items: this.thumbnailsFactory(state)
      }))
    );
  }

  /**
   * Centralize active thumbnail
   * @param i - Current index
   */
  translateThumbnails(i: number) {
    const x = (i * this.config.width) + (this.config.width / 2);
    const position = `translate3d(${-x}px, 0, 0)`;
    return {
      msTransform: position,
      webkitTransform: position,
      transform: position
    };
  }

  /**
   * Prepare thumbnails for rendering
   * @param state
   */
  thumbnailsFactory(state: GalleryState) {
    return state.items.map((item: GalleryItem, i) => ({
      index: i,
      activeClass: (i === state.currIndex) ? ' g-thumb-current' : '',
      thumbnail: `url(${item.thumbnail})`
    }));
  }

  /**
   * Set current gallery item
   * @param i - Item index
   * @param currIndex - current index
   */
  setCurrentItem(i: number, currIndex: number) {
    if (i !== currIndex) {
      this.gallery.set(i, GalleryAction.THUMB_CLICK);
    }
  }

  ngOnInit() {

    /** Set thumbnails position (top or bottom) */
    const order = this.config.position === 'top' ? 0 : 2;
    this.renderer.setStyle(this.el.nativeElement, '-webkit-order', order);
    this.renderer.setStyle(this.el.nativeElement, 'order', order);

    /** Enable gestures */
    if (this.gallery.config.gestures) {
      if (typeof Hammer === 'undefined') {

        throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
      } else {
        const el = this.el.nativeElement;
        const mc = new Hammer(el);

        /** Allow the container to move on pan start */
        mc.on('panstart', () => {
          this.renderer.removeClass(el, '-reset');
        });

        /** Reset the container position on pan end */
        mc.on('panend', () => {
          this.renderer.addClass(el, '-reset');
        });

        /** Move the container on panning */
        mc.on('pan', (e) => {
          const position = `translate3d(${e.deltaX}px, 0px, 0px)`;
          this.renderer.setStyle(el, 'mozTransform', position);
          this.renderer.setStyle(el, 'oTransform', position);
          this.renderer.setStyle(el, 'msTransform', position);
          this.renderer.setStyle(el, 'webkitTransform', position);
          this.renderer.setStyle(el, 'transform', position);
        });

        /** Swipe next */
        mc.on('swipeleft', () => {
          this.gallery.next();
        });

        /** Swipe prev */
        mc.on('swiperight', () => {
          this.gallery.prev();
        });
      }
    }

  }

}
