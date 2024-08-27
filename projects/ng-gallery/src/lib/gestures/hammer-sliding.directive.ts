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
import { DOCUMENT } from '@angular/common';
import { HammerGestureConfig } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { SliderAdapter } from '../components/adapters';
import { GalleryConfig } from '../models/config.model';
import { Orientation } from '../models/constants';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { GalleryThumbComponent } from '../components/gallery-thumb.component';
import { GalleryRef } from '../services/gallery-ref';

import { CustomHammerConfig, HammerInstance } from '../services/hammer';

@Directive({
  selector: '[hammerSliding]',
  providers: [{ provide: HammerGestureConfig, useClass: CustomHammerConfig }],
  standalone: true
})
export class HammerSliding implements OnDestroy {

  private readonly hammer: HammerGestureConfig = inject(HammerGestureConfig);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly _viewport: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly _document: Document = inject(DOCUMENT);

  private readonly _dir: Directionality = inject(Directionality);

  private readonly _platform: Platform = inject(Platform);

  private readonly _zone: NgZone = inject(NgZone);

  /** HammerJS instance */
  private _mc: HammerInstance;

  enabled: InputSignal<boolean> = input(false, { alias: 'hammerSliding' });

  adapter: InputSignal<SliderAdapter> = input();

  galleryId: InputSignal<string> = input();

  items: InputSignal<GalleryItemComponent[] | GalleryThumbComponent[]> = input();

  config: InputSignal<GalleryConfig> = input();

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() isSlidingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    effect(() => {
      this.enabled() ? this._subscribe(this.adapter()) : this._unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private _subscribe(adapter: SliderAdapter): void {
    this._unsubscribe();

    if (!this._platform.ANDROID && !this._platform.IOS && (this._document.defaultView as any).Hammer) {
      this._zone.runOutsideAngular(() => {

        const direction: number = adapter.hammerDirection;

        // this.hammer.options =  { inputClass: Hammer.MouseInput };
        this.hammer.overrides.pan = { direction };
        this._mc = this.hammer.buildHammer(this._viewport);

        // this._hammer = new Hammer(this._viewport, { inputClass: Hammer.MouseInput });
        // this._mc.get('pan').set({ direction });

        let offset: number;

        // Set panOffset for sliding on pan start event
        this._mc.on('panstart', () => {
          this._zone.run(() => {
            this.isSlidingChange.emit(true);
          });

          offset = adapter.scrollValue;
          this._viewport.classList.add('g-sliding');
          this._viewport.style.setProperty('--slider-scroll-snap-type', 'none');
        });

        this._mc.on('panmove', (e: any) => {
          this._viewport.scrollTo(adapter.getHammerValue(offset, e, 'auto'));
        });

        this._mc.on('panend', (e: any) => {
          this._document.onselectstart = null;
          this._viewport.classList.remove('g-sliding');
          const index: number = this.getIndexOnMouseUp(e, adapter);

          this._zone.run(() => {
            this.isSlidingChange.emit(false);
            this.activeIndexChange.emit(index);
          });
        });
      });
    }
  }

  private _unsubscribe(): void {
    this._mc?.destroy();
  }

  private getIndexOnMouseUp(e: any, adapter: SliderAdapter): number {
    const currIndex: number = this.galleryRef.currIndex();
    // Check if scrolled item is great enough to navigate
    const currElement: Element = this.items()[currIndex].nativeElement;

    // Find the gallery item element in the center elements
    const elementAtCenter: Element = this.getElementFromViewportCenter();

    // Check if center item can be taken from element using
    if (elementAtCenter && elementAtCenter !== currElement) {
      return +elementAtCenter.getAttribute('galleryIndex');
    }

    const velocity: number = adapter.getHammerVelocity(e);
    // Check if velocity is great enough to navigate
    if (Math.abs(velocity) > 0.3) {
      if (this.config().orientation === Orientation.Horizontal) {
        if (velocity > 0) {
          return this._dir.value === 'rtl' ? currIndex + 1 : currIndex - 1;
        }
        return this._dir.value === 'rtl' ? currIndex - 1 : currIndex + 1;
      } else {
        return velocity > 0 ? currIndex - 1 : currIndex + 1;
      }
    }

    // Reset position to the current index
    return -1;
  }

  private getElementFromViewportCenter(): Element {
    // Get slider position relative to the document
    const sliderRect: DOMRect = this._viewport.getBoundingClientRect();
    // Try look for the center item using `elementsFromPoint` function
    const centerElements: Element[] = this._document.elementsFromPoint(
      sliderRect.x + (sliderRect.width / 2),
      sliderRect.y + (sliderRect.height / 2)
    );
    // Find the gallery item element in the center elements
    return centerElements.find((element: Element) => {
      return element.getAttribute('galleryId') === this.galleryId();
    });
  }
}
