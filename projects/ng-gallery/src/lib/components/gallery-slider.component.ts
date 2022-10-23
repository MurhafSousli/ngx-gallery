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
import { Subscription, fromEvent } from 'rxjs';
import { tap, debounceTime } from 'rxjs/operators';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { SlidingDirection } from '../models/constants';
import { SliderAdapter, HorizontalAdapter, VerticalAdapter } from './adapters';
import { SmoothScrollManager } from '../smooth-scroll';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #container class="g-items-container">
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
  private _scrollSub$: Subscription;

  /** Slider adapter */
  adapter: SliderAdapter;

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

  @ViewChild('container', { static: true }) containerEl: ElementRef;

  @ViewChild('slider', { static: true }) sliderEl: ElementRef;

  get container(): HTMLElement {
    return this.containerEl.nativeElement;
  }

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  /** Item zoom */
  get zoom(): { transform: string } {
    return { transform: `perspective(50px) translate3d(0, 0, ${ -this.config.zoomOut }px)` };
  }

  constructor(private _el: ElementRef,
              private _zone: NgZone,
              private _smoothScroll: SmoothScrollManager) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      if (changes.config.currentValue?.thumbPosition !== changes.config.previousValue?.thumbPosition) {
        switch (this.config.slidingDirection) {
          case SlidingDirection.Horizontal:
            this.adapter = new HorizontalAdapter(this.slider, this.config);
            break;
          case SlidingDirection.Vertical:
            this.adapter = new VerticalAdapter(this.slider, this.config);
            break;
        }
      }

      // Enable/Disable gestures on changes
      if (changes.config.currentValue?.gestures !== changes.config.previousValue?.gestures) {
        if (this.config.gestures) {
          this.activateGestures();
        } else {
          this.deactivateGestures();
        }
      }
    }

    // Scroll to current index
    if (changes.state) {
      requestAnimationFrame(() => {
        this.scrollToIndex(this.state.currIndex, changes.state.firstChange ? 'auto' : 'smooth');
      });
    }
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => {
      // Subscribe to slider scroll event
      this._scrollSub$ = fromEvent(this.slider, 'scroll', { passive: true }).pipe(
        debounceTime(50),
        tap(() => {
          const index: number = this.adapter.measureIndex;
          // Check if index value is
          if (Number.isSafeInteger(index)) {
            this._zone.run(() => this.action.emit(index));
          }
        })
      ).subscribe();
    });
  }

  ngOnDestroy(): void {
    this.deactivateGestures();
    this._scrollSub$?.unsubscribe();
  }

  trackByFn(index: number, item: any) {
    return item.type;
  }

  private scrollToIndex(value: number, behavior: ScrollBehavior): void {
    this.container.style.transform = this.zoom.transform;
    this._zone.runOutsideAngular(() => {
      this.slider.style.scrollSnapType = 'unset';
      this._smoothScroll.scrollTo(this.slider, this.adapter.getScrollToValue(value, behavior)).then(() => {
        this.slider.style.scrollSnapType = this.adapter.scrollSnapType;
      });
    });
  }

  private activateGestures(): void {
    if (typeof Hammer !== 'undefined') {

      const direction: number = this.adapter.panDirection;

      // Activate gestures
      this._zone.runOutsideAngular(() => {
        this._hammer = new Hammer(this.slider, { inputClass: Hammer.MouseInput });
        this._hammer.get('pan').set({ direction });

        let panOffset: number;

        // Set panOffset for sliding on pan start event
        this._hammer.on('panstart', () => {
          this._smoothScroll.dismissOngoingScroll(this.slider);
          this.slider.classList.add('g-sliding');
          panOffset = this.adapter.scrollValue;
          // Disable scroll-snap-type functionality
          this.slider.style.scrollSnapType = 'unset';
        });

        this._hammer.on('panmove', (e: any) => this.slider.scrollTo(this.adapter.getPanValue(panOffset, e, 'auto')));

        this._hammer.on('panend', (e: any) => {
          this.slider.classList.remove('g-sliding');
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
      });
    }
  }

  private deactivateGestures(): void {
    this._hammer?.destroy();
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

  private next(): void {
    this.action.emit('next');
  }

  private prev(): void {
    this.action.emit('prev');
  }
}
