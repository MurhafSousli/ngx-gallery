import { Directive, Inject, Input, OnDestroy, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent, Subscription, SubscriptionLike } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

declare let Hammer: any;

/**
 * This directive uses tap event if HammerJS is loaded, otherwise it falls back to normal click event
 */
@Directive({
  selector: '[tapClick]'
})
export class TapClick implements OnInit, OnDestroy {

  private hammer: any;
  clickListener: SubscriptionLike = Subscription.EMPTY;
  @Input() tapClickDisabled: boolean;
  @Output() tapClick = new EventEmitter();

  constructor(private el: ElementRef, @Inject(DOCUMENT) document: any) {
    Hammer = (<any>document.defaultView).Hammer;
  }

  ngOnInit() {
    this.activateClickEvent();
  }

  activateClickEvent() {
    if (Hammer) {
      // Use Hammer.js tap event
      this.hammer = new Hammer(this.el.nativeElement);
      this.hammer.on('tap', () => {
        if (!this.tapClickDisabled) {
          this.tapClick.emit(null);
        }
      });
    } else {
      // Use normal click event
      this.clickListener = fromEvent(this.el.nativeElement, 'click').pipe(
        filter(() => !this.tapClickDisabled),
        tap(() => this.tapClick.emit(null))
      ).subscribe();
    }
  }

  ngOnDestroy() {
    if (this.hammer) {
      this.hammer.destroy();
    }
    this.clickListener.unsubscribe();
  }
}
