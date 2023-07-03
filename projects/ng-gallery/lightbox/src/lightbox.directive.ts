import { Directive, Input, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, tap, SubscriptionLike, Subscription } from 'rxjs';
import { Lightbox } from './lightbox.service';

@Directive({
  selector: '[lightbox]',
  standalone: true
})
export class LightboxDirective implements OnInit, OnDestroy {

  clickEvent: SubscriptionLike = Subscription.EMPTY;

  @Input('lightbox') index = 0;
  @Input('gallery') id = 'root';

  constructor(private _lightbox: Lightbox, private _el: ElementRef, private _renderer: Renderer2) {
  }

  ngOnInit() {
    this._renderer.setStyle(this._el.nativeElement, 'cursor', 'pointer');
    this.clickEvent = fromEvent(this._el.nativeElement, 'click').pipe(
      tap(() => this._lightbox.open(this.index, this.id))
    ).subscribe();
  }

  ngOnDestroy() {
    this.clickEvent.unsubscribe();
  }
}
