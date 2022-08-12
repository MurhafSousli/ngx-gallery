import {
  Component,
  Input,
  Output,
  OnChanges,
  HostBinding,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GalleryConfig } from '../models/config.model';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { SlidingDirection, ThumbnailsMode, ThumbnailsPosition, ThumbnailsView } from '../models/constants';
import { SliderState, WorkerState } from '../models/slider.model';
import { createSwipeSubscription } from '../utils/touch-functions';
import { SwipeEvent } from '../models/swipe.model';


@Component({
  selector: 'gallery-thumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="sliderState$ | voAsync; let sliderState"
         class="g-thumbs-container">
      <div class="g-slider"
           [class.g-contain]="config.thumbView === thumbnailsView.Contain"
           [class.g-contain-small-content]="thumbnailsLessThanSlider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-thumb *ngFor="let item of state.items;let i = index"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       (click)="config.disableThumb || thumbClick.emit(i)"
                       (error)="error.emit({itemIndex: i, error: $event})"></gallery-thumb>
      </div>
    </div>
  `
})
export class GalleryThumbsComponent implements OnChanges, OnInit, OnDestroy {

  /** Sliding worker */
  private readonly _slidingWorker$ = new BehaviorSubject<WorkerState>({ value: 0, active: false });

  /** Current slider position in free sliding mode */
  private _freeModeCurrentOffset = 0;
  private swipeSubscription: Subscription

  /** Thumbnails view enum */
  thumbnailsView = ThumbnailsView;

  /** Thumbnails size is less than slider size (for contain thumbnails view) */
  thumbnailsLessThanSlider: boolean;

  /** Stream that emits sliding state */
  sliderState$: Observable<SliderState>;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when the active item should change */
  @Output() action = new EventEmitter<'next' | 'prev' | number>();

  /** Stream that emits when thumb is clicked */
  @Output() thumbClick = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<GalleryError>();

  /** Host height */
  @HostBinding('style.height') height: string;

  /** Host width */
  @HostBinding('style.width') width: string;

  constructor(private _el: ElementRef, private _zone: NgZone) {

    // Activate sliding worker
    this.sliderState$ = this._slidingWorker$.pipe(map((state: WorkerState) => ({
      style: this.getSliderStyles(state),
      active: state.active
    })));
  }

  ngOnInit() {
    if (this.config.gestures && !this.config.disableThumb) {
      this._zone.runOutsideAngular(() => this.swipeSubscription = createSwipeSubscription({
        domElement: this._el.nativeElement,
        onSwipeMove: event => {
          if (event.direction === this.currentDirection) {
            this.updateSlider({
              value: this.config.thumbMode === ThumbnailsMode.Strict ? event.distance : (this._freeModeCurrentOffset + event.distance),
              active: true
            });

          }
        },
        onSwipeEnd: event => this.config.thumbMode === ThumbnailsMode.Strict
          ? this.onSwipeStrictMode(event)
          : this.onSwipeFreeMode(event)
      }));
    }
  }
  ngOnChanges() {
    // Refresh the slider
    this.updateSlider({ value: 0, active: false });
    this._freeModeCurrentOffset = 0;
  }

  ngOnDestroy(): void {
    this.swipeSubscription?.unsubscribe();
  }

  private get currentDirection(): SlidingDirection {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Right:
      case ThumbnailsPosition.Left:
        return SlidingDirection.Vertical;
    }
    return SlidingDirection.Horizontal;
  }


  /**
   * Check if the minimum free scroll is exceeded (used in Bottom, Left directions)
   */
  private minFreeScrollExceeded(delta: number, width: number, height: number): boolean {
    return -(this._freeModeCurrentOffset + delta - width / 2) > (this.state.items.length - this.state.currIndex) * height;
  }

  /**
   * Check if the maximum free scroll is exceeded (used in Top, Right directions)
   */
  private maxFreeScrollExceeded(delta: number, width: number, height: number): boolean {
    return this._freeModeCurrentOffset + delta > (this.state.currIndex * width) + (height / 2);
  }

  private next() {
    this.action.emit('next');
  }

  private prev() {
    this.action.emit('prev');
  }

  /**
   * Sliding free mode
   */
  private onSwipeFreeMode(e: SwipeEvent): void {
    let width: number;
    let height: number;
    if (this.currentDirection === SlidingDirection.Horizontal) {
      width = this.config.thumbWidth;
      height = this.config.thumbHeight;
    } else {
      width = this.config.thumbHeight;
      height = this.config.thumbWidth;
    }

    if (this.minFreeScrollExceeded(e.distance, width, height)) {
      this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * height;
    } else if (this.maxFreeScrollExceeded(e.distance, height, width)) {
      this._freeModeCurrentOffset = this.state.currIndex * height;
    } else {
      this._freeModeCurrentOffset += e.distance;
    }
    this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
  }


  /**
   * Sliding strict mode
   */
  private onSwipeStrictMode(e: SwipeEvent): void {
    if (e.direction === this.config.slidingDirection) {
      const limit = (e.direction === SlidingDirection.Vertical
        ? this._el.nativeElement.offsetHeight
        : this._el.nativeElement.offsetWidth
      ) * this.state.items.length / this.config.panSensitivity;
      if (e.velocity > 0.3 && e.distance > 50 || e.distance >= limit) {
        this.prev();
      } else if (e.velocity < -0.3 && e.distance < 50 || e.distance <= -limit) {
        this.next();
      } else {
        this.action.emit(this.state.currIndex);
      }
      this.updateSlider({ value: 0, active: false });
    }
  }

  /**
   * Convert sliding state to styles
   */
  private getSliderStyles(state: WorkerState): any {
    const currIndex: number = this.state.currIndex;
    const itemsLength: number = this.state.items.length;
    const { thumbWidth, thumbHeight } = this.config;

    let value: number;
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        this.width = '100%';
        this.height = this.config.thumbHeight + 'px';
        switch (this.config.thumbView) {
          case 'contain':
            const containerWidth: number = this._el.nativeElement.clientWidth;
            const minHorizontalShift: number = itemsLength * thumbWidth - containerWidth;
            // If slider size is larger than thumbnails size
            if (containerWidth > (itemsLength * thumbWidth)) {
              this.thumbnailsLessThanSlider = true;
            } else {
              // If slider size is smaller than thumbnails size
              this.thumbnailsLessThanSlider = false;
              if ((currIndex * thumbWidth + thumbWidth / 2) > containerWidth / 2) {
                value = -(Math.min((currIndex * thumbWidth + thumbWidth / 2) - (containerWidth / 2), minHorizontalShift));
              } else {
                value = 0;
              }
            }
            break;
          default:
            value = -(currIndex * thumbWidth) - (thumbWidth / 2 - state.value);
        }
        return {
          transform: `translate3d(${value}px, 0, 0)`,
          width: itemsLength * thumbWidth + 'px',
          height: '100%'
        };
      case ThumbnailsPosition.Left:
      case ThumbnailsPosition.Right:
        this.width = this.config.thumbWidth + 'px';
        this.height = '100%';
        switch (this.config.thumbView) {
          case 'contain':
            const containerHeight: number = this._el.nativeElement.clientHeight;
            const minVerticalShift: number = itemsLength * thumbHeight - containerHeight;
            // If slider size is larger than thumbnails size
            if (containerHeight > (itemsLength * thumbHeight)) {
              this.thumbnailsLessThanSlider = true;
            } else {
              // If slider size is smaller than thumbnails size
              this.thumbnailsLessThanSlider = false;
              if ((currIndex * thumbHeight + thumbHeight / 2) > containerHeight / 2) {
                value = -(Math.min((currIndex * thumbHeight + thumbHeight / 2) - (containerHeight / 2), minVerticalShift));
              } else {
                value = 0;
              }
            }
            break;
          default:
            value = -(currIndex * thumbHeight) - (thumbHeight / 2 - state.value);
        }
        return {
          transform: `translate3d(0, ${value}px, 0)`,
          width: '100%',
          height: itemsLength * thumbHeight + 'px'
        };
    }
  }

  private updateSlider(state: WorkerState) {
    const newState: WorkerState = { ...this._slidingWorker$.value, ...state };
    this._slidingWorker$.next(newState);
  }
}
