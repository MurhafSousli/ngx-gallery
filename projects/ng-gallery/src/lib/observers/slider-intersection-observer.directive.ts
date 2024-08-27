import {
  Directive,
  Output,
  inject,
  effect,
  input,
  EventEmitter,
  OnDestroy,
  NgZone,
  ElementRef,
  InputSignal
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { ActiveItemObserver } from './active-item-observer';
import { SliderAdapter } from '../components/adapters';
import { GalleryItemComponent } from '../components/gallery-item.component';

@Directive({
  standalone: true,
  selector: '[sliderIntersectionObserver]'
})
export class SliderIntersectionObserver implements OnDestroy {

  private _zone: NgZone = inject(NgZone);

  private _viewport: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private _currentSubscription: Subscription;

  private _sensor: ActiveItemObserver = new ActiveItemObserver();

  adapter: InputSignal<SliderAdapter> = input<SliderAdapter>();

  items: InputSignal<GalleryItemComponent[]> = input<GalleryItemComponent[]>();

  config: InputSignal<GalleryConfig> = input<GalleryConfig>();

  disabled: InputSignal<boolean> = input<boolean>(false, { alias: 'sliderIntersectionObserverDisabled' });

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    effect(() => {
      (this.config().itemAutosize || this.disabled()) ? this._unsubscribe() : this._subscribe();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private _subscribe(): void {
    this._unsubscribe();

    if (!!this.adapter() && !!this.items()?.length) {
      const rootMargin: string = this.adapter().getRootMargin();
      if (this.config().debug) {
        this._viewport.style.setProperty('--intersection-margin', `"INTERSECTION(${ rootMargin })"`);
      }

      this._zone.runOutsideAngular(() => {
        this._currentSubscription = this._sensor.observe(
          this._viewport,
          this.items().map((item: GalleryItemComponent) => item.nativeElement),
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
