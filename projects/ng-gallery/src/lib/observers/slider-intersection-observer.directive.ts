import { Directive, Input, Output, OnChanges, OnDestroy, NgZone, ElementRef, EventEmitter } from '@angular/core';
import { skip, Subscription } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { ActiveItemObserver } from './active-item-observer';
import { SliderAdapter } from '../components/adapters';
import { GalleryItemComponent } from '../components/gallery-item.component';

@Directive({
  selector: '[sliderIntersectionObserver]',
  standalone: true
})
export class SliderIntersectionObserver implements OnChanges, OnDestroy {

  private _currentSubscription: Subscription;

  private _sensor: ActiveItemObserver = new ActiveItemObserver();

  private get _viewport(): HTMLElement {
    return this._el.nativeElement;
  }

  @Input() adapter: SliderAdapter;

  @Input() items: GalleryItemComponent[];

  @Input() config: GalleryConfig;

  @Input('sliderIntersectionObserverDisabled') disabled: boolean;

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _zone: NgZone, private _el: ElementRef<HTMLElement>) {
  }

  ngOnChanges(): void {
    (this.config.itemAutosize || this.disabled) ? this._unsubscribe() : this._subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private _subscribe(): void {
    this._unsubscribe();

    if (!!this.adapter && !!this.items?.length) {
      const rootMargin: string = this.adapter.getRootMargin();
      if (this.config.debug) {
        this._viewport.style.setProperty('--intersection-margin', `"INTERSECTION(${ rootMargin })"`);
      }

      this._zone.runOutsideAngular(() => {
        this._currentSubscription = this._sensor.observe(
          this._viewport,
          this.items.map((item: GalleryItemComponent) => item.nativeElement),
          rootMargin
        ).subscribe((index: number) => {
          this._zone.run(() => this.activeIndexChange.emit(index));
        });
      });
    }
  }

  private _unsubscribe(): void {
    this._currentSubscription?.unsubscribe();
  }
}
