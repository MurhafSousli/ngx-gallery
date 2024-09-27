import {
  Directive,
  inject,
  effect,
  output,
  input,
  NgZone,
  InputSignal,
  OutputEmitterRef,
  EffectCleanupRegisterFn
} from '@angular/core';
import { Subscription, combineLatest, filter, switchMap } from 'rxjs';
import { ActiveItemObserver } from './active-item-observer';
import { resizeObservable } from '../utils/resize-observer';
import { SliderAdapter } from '../components/adapters';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { ItemState } from '../components/templates/items.model';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryConfig } from '../models/config.model';

@Directive({
  standalone: true,
  selector: '[itemIntersectionObserver]'
})
export class ItemIntersectionObserver {

  private _galleryRef: GalleryRef = inject(GalleryRef);

  private _zone: NgZone = inject(NgZone);

  private _item: GalleryItemComponent = inject(GalleryItemComponent);

  private _sensor: ActiveItemObserver = new ActiveItemObserver();

  adapter: InputSignal<SliderAdapter> = input();

  disabled: InputSignal<boolean> = input(false, { alias: 'itemIntersectionObserverDisabled' });

  activeIndexChange: OutputEmitterRef<number> = output<number>();

  private get _viewport(): HTMLElement {
    return this._item.nativeElement.parentElement.parentElement;
  }

  constructor() {
    let intersectionSub$: Subscription;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: GalleryConfig = this._galleryRef.config();
      const adapter: SliderAdapter = this.adapter();

      intersectionSub$?.unsubscribe();

      if (config.itemAutosize && !this.disabled() && adapter) {
        this._zone.runOutsideAngular(() => {
          intersectionSub$ = combineLatest([
            resizeObservable(this._viewport),
            resizeObservable(this._item.nativeElement)
          ]).pipe(
            switchMap(() => this._item.state$),
            filter((state: ItemState) => state !== 'loading'),
            switchMap(() => {
                const rootMargin: string = adapter.getElementRootMargin(this._viewport, this._item.nativeElement);
                if (config.debug) {
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
      onCleanup(() => intersectionSub$?.unsubscribe());
    });
  }
}
