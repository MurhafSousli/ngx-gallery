/** This directive enable tap if HammerJS is loaded, otherwise it falls back to normal click event */
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';

declare const Hammer: any;

@Directive({
  selector: '[tapClick]'
})
export class TapClickDirective implements OnInit, OnDestroy {

  mc: any;
  clickListener: any;
  @Input() tapClickDisabled: boolean;
  @Output() tapClick = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.setTapEvent();
  }

  /** Enable gestures if hammer is loaded */
  setTapEvent() {

    if (typeof Hammer !== 'undefined') {

      // Use hammer.js tap event
      this.mc = new Hammer(this.el.nativeElement);
      this.mc.on('tap', () => {
        if (!this.tapClickDisabled) {
          this.tapClick.emit(null);
        }
      });
    } else {
      // Use normal click event
      this.clickListener = this.renderer.listen(this.el.nativeElement, 'onclick', () => {
        if (!this.tapClickDisabled) {
          this.tapClick.emit(null);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.mc) {
      this.mc.destroy();
    } else {
      this.clickListener();
    }
  }
}
