import {Directive, ElementRef, AfterViewInit, Renderer2} from '@angular/core';

import 'prismjs/prism';
declare const Prism: any;

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'inline');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '5px');
    Prism.highlightElement(this.el.nativeElement, true);
  }

}
