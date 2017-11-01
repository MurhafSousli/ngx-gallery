import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  template: `
    <gallery-items [state]="state" [config]="config"></gallery-items>
    <gallery-nav *ngIf="config.navigation && !panning" [state]="state"></gallery-nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GallerySliderComponent implements OnInit {

  panning = false;
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
          this.renderer.removeClass(this.el.nativeElement, 'g-pan-reset');
          this.panning = true;
        });
        mc.on('panend', () => {
          this.renderer.addClass(this.el.nativeElement, 'g-pan-reset');
          this.panning = false;
        });
        mc.on('pan', (e) => {
          this.renderer.setStyle(this.el.nativeElement, 'transform', `translate3d(${e.deltaX}px, 0px, 0px)`);
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

}
