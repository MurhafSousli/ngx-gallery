/** This directive enable tap if HammerJS is loaded, otherwise it uses the normal click event (useful for thumbnail click) */

import {Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

declare const Hammer: any;

@Directive({
  selector: '[tap]'
})
export class TapDirective implements OnInit {

  @Input() tap;
  @Output() tapClick = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setTapEvent();
  }

  /** Enable tap if hammer is loaded */
  setTapEvent() {
    if (typeof Hammer !== 'undefined') {
      const mc = new Hammer(this.el.nativeElement);
      mc.on('tap', () => {
        this.tapClick.emit(null);
      });
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'onclick', () => {
        this.tapClick.emit(null);
      });
    }
  }
}
