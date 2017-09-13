/** This directive enable tap if HammerJS is loaded, otherwise it uses the normal click event (useful for thumbnail click) */

import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { GalleryService } from '../service/gallery.service';

declare const Hammer: any;

@Directive({
  selector: '[tap]'
})
export class TapDirective implements OnInit {

  @Input() tap: any;
  @Output() tapClick = new EventEmitter();

  constructor(private gallery: GalleryService, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setTapEvent();
  }

  /** Enable gestures if hammer is loaded */
  setTapEvent() {

    if (this.gallery.config.gestures) {
      if (typeof Hammer === 'undefined') {

        throw Error('[NgGallery]: HammerJS is undefined, make sure it is loaded');
      } else {
        /** Use tap for click event */
        if (typeof Hammer !== 'undefined') {
          const mc = new Hammer(this.el.nativeElement);
          mc.on('tap', () => {
            this.tapClick.emit();
          });
        }
      }
    } else {
      /** Use normal click event */
      this.renderer.setProperty(this.el.nativeElement, 'onclick', () => {
        this.tapClick.emit();
      });
    }

  }
}
