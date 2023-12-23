import { Directive, Input, Output, OnChanges, OnDestroy, NgZone, EventEmitter } from '@angular/core';
import { Subscription, combineLatest, filter, switchMap } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { ActiveItemObserver } from './active-item-observer';
import { resizeObservable } from '../utils/resize-observer';
import { SliderAdapter } from '../components/adapters';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { ItemState } from '../components/templates/items.model';

@Directive({
  selector: '[itemIntersectionObserver]',
  standalone: true
})
export class ItemIntersectionObserver implements OnChanges, OnDestroy {

  private _currentSubscription: Subscription;

  private _sensor: ActiveItemObserver = new ActiveItemObserver();

  private get _viewport(): HTMLElement {
    return this._item.nativeElement.parentElement.parentElement;
  }

  @Input() adapter: SliderAdapter;

  @Input() config: GalleryConfig;

  @Input('itemIntersectionObserverDisabled') disabled: boolean;

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _zone: NgZone, private _item: GalleryItemComponent) {
  }

  ngOnChanges(): void {
    (this.config.itemAutosize && !this.disabled) ? this._subscribe() : this._unsubscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private _subscribe(): void {
    this._unsubscribe();

    if (!!this.adapter) {
      this._zone.runOutsideAngular(() => {
        this._currentSubscription = combineLatest([
          resizeObservable(this._viewport),
          resizeObservable(this._item.nativeElement)
        ]).pipe(
          switchMap(() => this._item.state$),
          filter((state: ItemState) => state !== 'loading'),
          switchMap(() => {
            const rootMargin: string = this.adapter.getElementRootMargin(this._viewport, this._item.nativeElement);
            if (this.config.debug) {
              this._item.nativeElement.style.setProperty('--item-intersection-margin', `"VIEWPORT(${ this._viewport.clientWidth }x${ this._viewport.clientHeight }) ITEM(${ this._item.nativeElement.clientWidth }x${ this._item.nativeElement.clientHeight }) INTERSECTION(${ rootMargin })"`);
            }

            return this._sensor.observe(
              this._viewport,
              [this._item.nativeElement],
              rootMargin
            );
          }
          )
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
