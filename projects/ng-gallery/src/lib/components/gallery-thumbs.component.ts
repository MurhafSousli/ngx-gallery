import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges,
  HostBinding,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GalleryConfig } from '../models/config.model';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { ThumbnailsPosition, ThumbnailsMode, ThumbnailsView } from '../models/constants';
import { SliderState, WorkerState } from '../models/slider.model';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="g-thumbs-container">
      <div #slider
           class="g-slider"
           [class.g-contain]="config.thumbView === thumbnailsView.Contain"
           [class.g-contain-small-content]="thumbnailsLessThanSlider">

        <gallery-thumb *ngFor="let item of state.items;let i = index"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       [tapClickDisabled]="config.disableThumb"
                       (tapClick)="thumbClick.emit(i)"
                       (error)="error.emit({itemIndex: i, error: $event})"></gallery-thumb>
      </div>
    </div>
  `
})
export class GalleryThumbsComponent implements OnInit, OnChanges, OnDestroy {

  /** Sliding worker */
  private readonly _slidingWorker$ = new BehaviorSubject<WorkerState>({ value: 0, instant: true });

  /** HammerJS instance */
  private _hammer: any;

  /** Current slider position in free sliding mode */
  private _freeModeCurrentOffset = 0;

  /** Subscription reference to slider state stream */
  private _sliderStateSub$: Subscription;

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
  @Output() action = new EventEmitter<string | number>();

  /** Stream that emits when thumb is clicked */
  @Output() thumbClick = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<GalleryError>();

  /** Host height */
  @HostBinding('style.height') height: string;

  /** Host width */
  @HostBinding('style.width') width: string;

  @ViewChild('slider', { static: true }) sliderEl: ElementRef;

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  constructor(private _el: ElementRef, private _zone: NgZone) {

    // Activate sliding worker
    this.sliderState$ = this._slidingWorker$.pipe(map((state: WorkerState) => ({
      style: this.getSliderStyles(state),
      instant: state.instant
    })));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Refresh the slider
    if (changes.state) {
      this.updateSlider({ value: 0, instant: changes.state.firstChange });
    }

    // Enable/Disable gestures on changes
    if (changes.config && changes.config.currentValue?.gestures !== changes.config.previousValue?.gestures) {
      if (this.config.gestures) {
        this.activateGestures();
      } else {
        this.deactivateGestures();
      }
    }

    this._freeModeCurrentOffset = 0;
  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => {
      // Set styles manually avoid triggering change detection on dragging
      this._sliderStateSub$ = this.sliderState$.pipe(
        tap((state: SliderState) => {
          this.slider.style.transform = state.style.transform;
          this.slider.style.height = state.style.height;
          this.slider.style.width = state.style.width;
          this.slider.classList.toggle('g-no-transition', state.instant);
        })
      ).subscribe();
    });
  }

  ngOnDestroy() {
    this._hammer?.destroy();
    this._sliderStateSub$?.unsubscribe();
    this._slidingWorker$.complete();
  }

  private activateGestures() {
    if (!this.config.disableThumb && typeof Hammer !== 'undefined') {

      let direction: number;
      let touchAction: 'pan-x' | 'pan-y' | 'compute' = 'compute';

      switch (this.config.thumbPosition) {
        case ThumbnailsPosition.Right:
        case ThumbnailsPosition.Left:
          direction = Hammer.DIRECTION_VERTICAL;
          if (this.config.reserveGesturesAction) {
            touchAction = 'pan-y';
          }
          break;
        case ThumbnailsPosition.Top:
        case ThumbnailsPosition.Bottom:
          direction = Hammer.DIRECTION_HORIZONTAL;
          if (this.config.reserveGesturesAction) {
            touchAction = 'pan-x';
          }
          break;
      }

      // Activate gestures
      this._hammer = new Hammer(this._el.nativeElement);
      this._hammer.get('pan').set({ direction });

      this._zone.runOutsideAngular(() => {
        // Move the slider
        switch (this.config.thumbMode) {
          case ThumbnailsMode.Strict:
            this._hammer.on('pan', (e) => this.strictMode(e));
            break;
          case ThumbnailsMode.Free:
            this._hammer.on('pan', (e) => this.freeMode(e));
        }
      });
    }
  }

  private deactivateGestures() {
    this._hammer?.destroy();
  }

  /**
   * Sliding strict mode
   */
  private strictMode(e) {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Right:
      case ThumbnailsPosition.Left:
        if (e.isFinal) {
          this.updateSlider({ value: 0, instant: false });
          this.verticalPan(e);
        } else {
          this.updateSlider({ value: e.deltaY, instant: true });
        }
        break;
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        if (e.isFinal) {
          this.updateSlider({ value: 0, instant: false });
          this.horizontalPan(e);
        } else {
          this.updateSlider({ value: e.deltaX, instant: true });
        }
    }
  }

  /**
   * Sliding free mode
   */
  private freeMode(e) {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Right:
      case ThumbnailsPosition.Left:
        this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaY, instant: true });
        if (e.isFinal) {
          if (this.minFreeScrollExceeded(e.deltaY, this.config.thumbWidth, this.config.thumbHeight)) {
            this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbHeight;
          } else if (this.maxFreeScrollExceeded(e.deltaY, this.config.thumbHeight, this.config.thumbWidth)) {
            this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbHeight;
          } else {
            this._freeModeCurrentOffset += e.deltaY;
          }
          this.updateSlider({ value: this._freeModeCurrentOffset, instant: false });
        }
        break;
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaX, instant: true });
        if (e.isFinal) {
          if (this.minFreeScrollExceeded(e.deltaX, this.config.thumbHeight, this.config.thumbWidth)) {
            this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbWidth;
          } else if (this.maxFreeScrollExceeded(e.deltaX, this.config.thumbWidth, this.config.thumbHeight)) {
            this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbWidth;
          } else {
            this._freeModeCurrentOffset += e.deltaX;
          }
          this.updateSlider({ value: this._freeModeCurrentOffset, instant: false });
        }
    }
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
          transform: `translate3d(${ value }px, 0, 0)`,
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
          transform: `translate3d(0, ${ value }px, 0)`,
          width: '100%',
          height: itemsLength * thumbHeight + 'px'
        };
    }
  }

  private verticalPan(e: any) {
    if (!(e.direction & Hammer.DIRECTION_VERTICAL && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
      return;
    }
    if (e.velocityY > 0.3) {
      this.prev();
    } else if (e.velocityY < -0.3) {
      this.next();
    } else {
      if (e.deltaY / 2 <= -this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
        this.next();
      } else if (e.deltaY / 2 >= this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
        this.prev();
      } else {
        this.action.emit(this.state.currIndex);
      }
    }
  }

  private horizontalPan(e: any) {
    if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
      return;
    }
    if (e.velocityX > 0.3) {
      this.prev();
    } else if (e.velocityX < -0.3) {
      this.next();
    } else {
      if (e.deltaX / 2 <= -this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
        this.next();
      } else if (e.deltaX / 2 >= this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
        this.prev();
      } else {
        this.action.emit(this.state.currIndex);
      }
    }
  }

  private next() {
    this.action.emit('next');
  }

  private prev() {
    this.action.emit('prev');
  }

  private updateSlider(state: WorkerState) {
    const newState: WorkerState = { ...this._slidingWorker$.value, ...state };
    this._slidingWorker$.next(newState);
  }
}
