import {
  Directive,
  Inject,
  Input,
  Output,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  NgZone,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Directionality } from '@angular/cdk/bidi';
import { SliderAdapter } from '../components/adapters';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { Orientation } from '../models/constants';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { GalleryThumbComponent } from '../components/gallery-thumb.component';

declare const Hammer: any;

@Directive({
  selector: '[hammerSliding]',
  standalone: true
})
export class HammerSliding implements OnChanges, OnDestroy {

  /** HammerJS instance */
  private _hammer: any;

  get _viewport(): HTMLElement {
    return this._el.nativeElement;
  }

  @Input('hammerSliding') enabled: boolean;

  @Input() galleryId: string;

  @Input() items: GalleryItemComponent[] | GalleryThumbComponent[];

  @Input() adapter: SliderAdapter;

  @Input() state: GalleryState;

  @Input() config: GalleryConfig;

  @Output() activeIndexChange: EventEmitter<number> = new EventEmitter<number>();

  @Output() isSlidingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(@Inject(DOCUMENT) private _document: Document,
              private _el: ElementRef<HTMLElement>,
              private _dir: Directionality,
              private _platform: Platform,
              private _zone: NgZone) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.enabled && changes.enabled?.currentValue !== changes.enabled?.previousValue) {
      this.enabled ? this._subscribe() : this._unsubscribe();
    }
    if (!changes.adapter?.firstChange && changes.adapter?.currentValue !== changes.adapter?.previousValue) {
      this.enabled ? this._subscribe() : this._unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  private _subscribe(): void {
    this._unsubscribe();

    if (!this._platform.ANDROID && !this._platform.IOS && typeof Hammer !== 'undefined') {
      this._zone.runOutsideAngular(() => {

        const direction: number = this.adapter.hammerDirection;
        this._hammer = new Hammer(this._el.nativeElement, { inputClass: Hammer.MouseInput });
        this._hammer.get('pan').set({ direction });

        let offset: number;

        // Set panOffset for sliding on pan start event
        this._hammer.on('panstart', () => {
          this._zone.run(() => {
            this.isSlidingChange.emit(true);
          });

          offset = this.adapter.scrollValue;
          this._viewport.classList.add('g-sliding');
          this._viewport.style.setProperty('--slider-scroll-snap-type', 'none');
        });

        this._hammer.on('panmove', (e: any) => this._viewport.scrollTo(this.adapter.getHammerValue(offset, e, 'auto')));

        this._hammer.on('panend', (e: any) => {
          this._document.onselectstart = null;
          this._viewport.classList.remove('g-sliding');
          const index: number = this.getIndexOnMouseUp(e);

          this._zone.run(() => {
            this.isSlidingChange.emit(false);
            this.activeIndexChange.emit(index);
          });
        });
      });
    }
  }

  private _unsubscribe(): void {
    this._hammer?.destroy();
  }

  private getIndexOnMouseUp(e: any): number {
    // Check if scrolled item is great enough to navigate
    const currElement: Element = this.items[this.state.currIndex].nativeElement;

    // Find the gallery item element in the center elements
    const elementAtCenter: Element = this.getElementFromViewportCenter();

    // Check if center item can be taken from element using
    if (elementAtCenter && elementAtCenter !== currElement) {
      return +elementAtCenter.getAttribute('galleryIndex');
    }

    const velocity: number = this.adapter.getHammerVelocity(e);
    // Check if velocity is great enough to navigate
    if (Math.abs(velocity) > 0.3) {
      if (this.config.orientation === Orientation.Horizontal) {
        if (velocity > 0) {
          return this._dir.value === 'rtl' ? this.state.currIndex + 1 : this.state.currIndex - 1;
        }
        return this._dir.value === 'rtl' ? this.state.currIndex - 1 : this.state.currIndex + 1;
      } else {
        return velocity > 0 ? this.state.currIndex - 1 : this.state.currIndex + 1;
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
      return element.getAttribute('galleryId') === this.galleryId;
    });
  }
}
