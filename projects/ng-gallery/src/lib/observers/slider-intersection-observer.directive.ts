import {
  Directive,
  Output,
  inject,
  effect,
  untracked,
  input,
  EventEmitter,
  NgZone,
  ElementRef,
  InputSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from '../services/gallery-ref';
import { ActiveItemObserver } from './active-item-observer';
import { SliderAdapter } from '../components/adapters';
import { GalleryItemComponent } from '../components/gallery-item.component';

@Directive({
  standalone: true,
  selector: '[sliderIntersectionObserver]'
})
export class SliderIntersectionObserver {

  private _zone: NgZone = inject(NgZone);

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  private _viewport: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private _sensor: ActiveItemObserver = new ActiveItemObserver();

  adapter: InputSignal<SliderAdapter> = input<SliderAdapter>();

  items: InputSignal<GalleryItemComponent[]> = input<GalleryItemComponent[]>();

  disabled: InputSignal<boolean> = input<boolean>(false, { alias: 'sliderIntersectionObserverDisabled' });

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
    let sub$: Subscription;
    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: GalleryConfig = this.galleryRef.config();
      const disabled: boolean = this.disabled();
      const items: GalleryItemComponent[] = this.items();
      const adapter: SliderAdapter = this.adapter();

      untracked(() => {
        if (!config.itemAutosize && !disabled && adapter && items.length) {
          const rootMargin: string = adapter.getRootMargin();
          if (config.debug) {
            this._viewport.style.setProperty('--intersection-margin', `"INTERSECTION(${ rootMargin })"`);
          }

          this._zone.runOutsideAngular(() => {
            sub$ = this._sensor.observe(
              this._viewport,
              items.map((item: GalleryItemComponent) => item.nativeElement),
              rootMargin
            ).subscribe((index: number) => {
              console.log('😆', index);
              this._zone.run(() => this.activeIndexChange.emit(index));
            });
          });
        }

        onCleanup(() => sub$?.unsubscribe());
      });
    });
  }
}
