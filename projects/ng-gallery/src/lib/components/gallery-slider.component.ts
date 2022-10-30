import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Subscription, fromEvent } from 'rxjs';
import { tap, debounceTime, filter } from 'rxjs/operators';
import { Gallery } from '../services/gallery.service';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { SlidingDirection } from '../models/constants';
import { SliderAdapter, HorizontalAdapter, VerticalAdapter } from './adapters';
import { SmoothScrollManager } from '../smooth-scroll';
import { resizeObservable } from '../utils/resize-observer';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="g-items-container">
      <div #slider class="g-slider">
        <gallery-item *ngFor="let item of state.items; trackBy: trackByFn; index as i"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (click)="itemClick.emit(i)"
                      (error)="error.emit({itemIndex: i, error: $event})">
        </gallery-item>
      </div>
    </div>
    <ng-content></ng-content>
  `
})
export class GallerySliderComponent implements OnInit, OnChanges, OnDestroy {

  /** HammerJS instance */
  private _hammer: any;

  /** Subscription reference to slider scroll stream */
  private _scrollObserver$: Subscription;

  /** Subscription reference to host resize stream */
  private _resizeObserver$: Subscription;

  private _isPanning: boolean;

  /** Slider adapter */
  adapter: SliderAdapter;

  /** Gallery ID */
  @Input() galleryId: string;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when item is clicked */
  @Output() itemClick = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<GalleryError>();

  @ViewChild('container', { static: true }) containerEl: ElementRef;

  @ViewChild('slider', { static: true }) sliderEl: ElementRef;

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  constructor(private _el: ElementRef,
              private _zone: NgZone,
              private _platform: Platform,
              private _smoothScroll: SmoothScrollManager,
              private _gallery: Gallery) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      if (changes.config.currentValue?.slidingDirection !== changes.config.previousValue?.slidingDirection) {
        switch (this.config.slidingDirection) {
          case SlidingDirection.Horizontal:
            this.adapter = new HorizontalAdapter(this.slider, this.config);
            break;
          case SlidingDirection.Vertical:
            this.adapter = new VerticalAdapter(this.slider, this.config);
            break;
        }

        if (!changes.config.firstChange) {
          // Keep the correct sliding position when direction changes
          requestAnimationFrame(() => {
            this.scrollToIndex(this.state.currIndex, 'auto');
          });
        }

        // Reactivate gestures
        this.enableDisableGestures();
      }

      if (!changes.config.firstChange && changes.config.currentValue?.mouseSlidingDisabled !== changes.config.previousValue?.mouseSlidingDisabled) {
        this.enableDisableGestures();
      }
    }

    // Scroll to current index
    if (changes.state && changes.state.currentValue?.currIndex !== changes.state.previousValue?.currIndex) {
      requestAnimationFrame(() => {
        this.scrollToIndex(this.state.currIndex, changes.state.firstChange ? 'auto' : 'smooth');
      });
    }
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => {
      // Subscribe to slider scroll event
      this._scrollObserver$ = fromEvent(this.slider, 'scroll', { passive: true }).pipe(
        debounceTime(50),
        filter(() => !this._isPanning),
        tap(() => {
          const index: number = this.adapter.measureIndex;
          // Check if the index value has no fraction
          this.slider.style.scrollSnapType = this.adapter.scrollSnapType;
          if (Number.isSafeInteger(index)) {
            this._zone.run(() => this._gallery.ref(this.galleryId).set(index));
          }
        })
      ).subscribe();

      // Detect if the size of the slider has changed detecting current index on scroll
      if (this._platform.isBrowser) {
        this._resizeObserver$ = resizeObservable(this._el.nativeElement).pipe(
          debounceTime(this.config.resizeDebounceTime),
          tap(([entry]: ResizeObserverEntry[]) => {
            const width: number = Math.ceil(entry.contentRect.width);
            const height: number = Math.ceil(entry.contentRect.height);
            this.slider.style.width = `${ width }px`;
            this.slider.style.height = `${ height }px`;
            if (this.config.contentVisibilityAuto) {
              this.slider.style.setProperty('--item-contain-intrinsic-size', `${ width }px ${ height }px`);
            }
          })
        ).subscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.deactivateGestures();
    this._resizeObserver$?.unsubscribe();
    this._scrollObserver$?.unsubscribe();
  }

  trackByFn(index: number, item: any) {
    return item.type;
  }

  private scrollToIndex(value: number, behavior: ScrollBehavior): void {
    this._zone.runOutsideAngular(() => {
      this.slider.style.scrollSnapType = 'unset';
      this._smoothScroll.scrollTo(this.slider, this.adapter.getScrollToValue(value, behavior)).then(() => {
        this.slider.style.scrollSnapType = this.adapter.scrollSnapType;
      });
    });
  }

  private enableDisableGestures(): void {
    // Enable/Disable mouse sliding on desktop browser only
    if (!this._platform.IOS && !this._platform.ANDROID) {
      if (!this.config.mouseSlidingDisabled) {
        this.activateGestures();
      } else {
        this.deactivateGestures();
      }
    }
  }

  private activateGestures(): void {
    if (typeof Hammer !== 'undefined') {
      // Destroy hammer if a previous instance was created
      this.deactivateGestures();

      const direction: number = this.adapter.panDirection;

      // Activate gestures
      this._zone.runOutsideAngular(() => {
        this._hammer = new Hammer(this._el.nativeElement, { inputClass: Hammer.MouseInput });
        this._hammer.get('pan').set({ direction });

        let panOffset: number;

        // Set panOffset for sliding on pan start event
        this._hammer.on('panstart', () => {
          this._smoothScroll.dismissOngoingScroll(this.slider);
          this.slider.classList.add('g-sliding');
          panOffset = this.adapter.scrollValue;
          // Disable scroll-snap-type functionality
          this.slider.style.scrollSnapType = 'unset';
          this._isPanning = true;
        });

        this._hammer.on('panmove', (e: any) => this.slider.scrollTo(this.adapter.getPanValue(panOffset, e, 'auto')));

        this._hammer.on('panend', (e: any) => {
          this.slider.classList.remove('g-sliding');
          this.onPanEnd(e);
          this._isPanning = false;
        });
      });
    }
  }

  private deactivateGestures(): void {
    this._hammer?.destroy();
  }

  protected onPanEnd(e): void {
    this._zone.run(() => {
      const delta: number = this.adapter.getPanDelta(e);
      const velocity: number = this.adapter.getPanVelocity(e);

      const galleryRef = this._gallery.ref(this.galleryId);

      // Check if scrolled item is great enough to navigate
      if (Math.abs(delta) > this.adapter.clientSize / 2) {
        return delta > 0 ? galleryRef.prev(false) : galleryRef.next(false);
      }
      // Check if velocity is great enough to navigate
      if (Math.abs(velocity) > 0.3) {
        return velocity > 0 ? galleryRef.prev(false) : galleryRef.next(false);
      }
      // Need to scroll back manually since the currIndex did not change
      this.scrollToIndex(this.state.currIndex, 'smooth');
    });
  }
}
