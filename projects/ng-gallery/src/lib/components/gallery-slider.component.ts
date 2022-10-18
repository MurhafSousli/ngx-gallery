import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges,
  Inject,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { SlidingDirection } from '../models/constants';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #container class="g-items-container">
      <div #slider class="g-slider">
        <gallery-item *ngFor="let item of state.items; let i = index"
                      [style.flex]="'0 0 ' + container.clientWidth + 'px'"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (tapClick)="itemClick.emit(i)"
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

  /** Subscription reference to window resize stream */
  private _resizeSub$: Subscription;

  /** Subscription reference to slider scroll stream */
  private _scrollSub$: Subscription;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when the active item should change */
  @Output() action = new EventEmitter<string | number>();

  /** Stream that emits when item is clicked */
  @Output() itemClick = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<GalleryError>();

  @Output() indexChange = new EventEmitter<number>();

  @ViewChild('container', { static: true }) containerEl: ElementRef;

  @ViewChild('slider', { static: true }) sliderEl: ElementRef;

  get container(): HTMLElement {
    return this.containerEl.nativeElement;
  }

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  /** Item zoom */
  get zoom() {
    return { transform: `perspective(50px) translate3d(0, 0, ${ -this.config.zoomOut }px)` };
  }

  constructor(private _el: ElementRef, private _zone: NgZone, @Inject(PLATFORM_ID) private _platform: Object) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // Scroll to current index
    if (changes.state) {
      requestAnimationFrame(() => {
        this.scrollToIndex(this.state.currIndex, changes.state.firstChange ? 'auto' : 'smooth');
      });
    }

    // Enable/Disable gestures on changes
    if (changes.config && changes.config.currentValue?.gestures !== changes.config.previousValue?.gestures) {
      if (this.config.gestures) {
        this.activateGestures();
      } else {
        this.deactivateGestures();
      }
    }
  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => {
      // Subscribe to slider scroll event
      this._scrollSub$ = fromEvent(this.slider, 'scroll').pipe(
        debounceTime(50),
        tap(() => {
          let index: number;
          switch (this.config.slidingDirection) {
            case SlidingDirection.Horizontal:
              index = this.slider.scrollLeft / this.slider.clientWidth;
              break;
            case SlidingDirection.Vertical:
              index = this.slider.scrollTop / this.slider.clientHeight;
              break;
          }
          // this.slider.style.scrollSnapType = 'x mandatory';
          // Check if index value is
          if (Number.isSafeInteger(index)) {
            this._zone.run(() => this.action.emit(index));
          }
        })
      ).subscribe();
    });

    // Rearrange slider on window resize
    if (isPlatformBrowser(this._platform)) {
      this._resizeSub$ = fromEvent(window, 'resize').pipe(
        debounceTime(200),
        // tap(() => this.updateSlider({ value: 0, instant: true }))
      ).subscribe();
    }
  }

  ngOnDestroy() {
    this.deactivateGestures();
    this._resizeSub$?.unsubscribe();
  }

  private scrollToIndex(value: number, behavior) {
    this.container.style.transform = this.zoom.transform;
    switch (this.config.slidingDirection) {
      case SlidingDirection.Horizontal:
        this.slider.scrollTo({
          behavior,
          left: value * this.slider.parentElement.clientWidth
        });
        break;
      case SlidingDirection.Vertical:
        this.slider.scrollTo({
          behavior,
          top: value * this.slider.parentElement.clientHeight
        });
    }
  }

  private activateGestures() {
    if (typeof Hammer !== 'undefined') {
      let direction: number;
      let touchAction: 'pan-x' | 'pan-y' | 'compute' = 'compute';

      if (this.config.slidingDirection === SlidingDirection.Horizontal) {
        direction = Hammer.DIRECTION_HORIZONTAL;
        if (this.config.reserveGesturesAction) {
          touchAction = 'pan-x';
        }
      } else {
        direction = Hammer.DIRECTION_VERTICAL;
        if (this.config.reserveGesturesAction) {
          touchAction = 'pan-y';
        }
      }

      // Activate gestures
      // this._hammer = new Hammer(this._el.nativeElement, { touchAction, inputClass: Hammer.MouseInput });
      this._hammer = new Hammer(this._el.nativeElement, { touchAction });
      this._hammer.get('pan').set({ direction });

      let _panOffset: number;

      // Set _panOffset for sliding on pan start event
      this._hammer.on('panstart', () => {
        this.slider.style.scrollSnapType = 'none';
        switch (this.config.slidingDirection) {
          case SlidingDirection.Horizontal:
            _panOffset = this.slider.scrollLeft;
            break;
          case SlidingDirection.Vertical:
            _panOffset = this.slider.scrollTop;
        }
      });

      this._hammer.on('panend', (e: any) => {
        this._zone.run(() => {
          switch (this.config.slidingDirection) {
            case SlidingDirection.Horizontal:
              this.horizontalPan(e);
              break;
            case SlidingDirection.Vertical:
              this.verticalPan(e);
          }
        });
      });

      this._hammer.on('panmove', (e: any) => {
        switch (this.config.slidingDirection) {
          case SlidingDirection.Horizontal:
            this.slider.scrollTo({ left: -(e.deltaX - _panOffset), behavior: 'auto' });
            break;
          case SlidingDirection.Vertical:
            this.slider.scrollBy({ top: -e.deltaY, behavior: 'auto' });
        }
      });
    }
  }

  private horizontalPan(e) {
    if (e.velocityX > 0.3) {
      this.prev();
    } else if (e.velocityX < -0.3) {
      this.next();
    } else {
      if (e.deltaX / 2 <= -this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
        this.next();
      } else if (e.deltaX / 2 >= this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
        this.prev();
      } else {
        this.scrollToIndex(this.state.currIndex, 'smooth');
        this.action.emit(this.state.currIndex);
      }
    }
  }

  private verticalPan(e) {
    if (e.velocityY > 0.3) {
      this.prev();
    } else if (e.velocityY < -0.3) {
      this.next();
    } else {
      if (e.deltaY / 2 <= -this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
        this.next();
      } else if (e.deltaY / 2 >= this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
        this.prev();
      } else {
        this.scrollToIndex(this.state.currIndex, 'smooth');
        this.action.emit(this.state.currIndex);
      }
    }
  }

  private deactivateGestures() {
    this._hammer?.destroy();
  }

  private next() {
    this.action.emit('next');
  }

  private prev() {
    this.action.emit('prev');
  }
}
