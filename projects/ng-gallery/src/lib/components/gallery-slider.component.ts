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
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { SlidingDirection } from '../models/constants';
import { SliderState, WorkerState } from '../models/slider.model';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #container class="g-items-container">
      <div #slider class="g-slider">
        <gallery-item *ngFor="let item of state.items; let i = index"
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

  /** Sliding worker */
  private readonly _slidingWorker$ = new BehaviorSubject<WorkerState>({ value: 0, instant: true });

  /** HammerJS instance */
  private _hammer: any;

  /** Subscription reference to window resize stream */
  private _resizeSub$: Subscription;

  /** Subscription reference to slider state stream */
  private _sliderStateSub$: Subscription;

  /** Stream that emits sliding state */
  sliderState$: Observable<SliderState>;

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
  get zoom() {
    return { transform: `perspective(50px) translate3d(0, 0, ${ -this.config.zoomOut }px)` };
  }

  constructor(private _el: ElementRef, private _zone: NgZone, @Inject(PLATFORM_ID) private platform: Object) {

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
          this.container.style.transform = this.zoom.transform;
        })
      ).subscribe();
    });

    // Rearrange slider on window resize
    if (isPlatformBrowser(this.platform)) {
      this._resizeSub$ = fromEvent(window, 'resize').pipe(
        debounceTime(200),
        tap(() => this.updateSlider(this._slidingWorker$.value))
      ).subscribe();
    }
  }

  ngOnDestroy() {
    this.deactivateGestures();
    this._resizeSub$?.unsubscribe();
    this._sliderStateSub$?.unsubscribe();
    this._slidingWorker$.complete();
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
      this._hammer = new Hammer(this._el.nativeElement, { touchAction });
      this._hammer.get('pan').set({ direction });

      this._zone.runOutsideAngular(() => {
        this._hammer.on('pan', (e) => {
          switch (this.config.slidingDirection) {
            case SlidingDirection.Horizontal:
              if (e.isFinal) {
                this.updateSlider({ value: 0, instant: false });
                this.horizontalPan(e);
              } else {
                this.updateSlider({ value: e.deltaX, instant: true });
              }
              break;
            case SlidingDirection.Vertical:
              if (e.isFinal) {
                this.updateSlider({ value: 0, instant: false });
                this.verticalPan(e);
              } else {
                this.updateSlider({ value: e.deltaY, instant: true });
              }
          }
        });
      });
    }
  }

  private deactivateGestures() {
    this._hammer?.destroy();
  }

  /**
   * Convert sliding state to styles
   */
  private getSliderStyles(state: WorkerState): any {
    switch (this.config.slidingDirection) {
      case SlidingDirection.Horizontal:
        return {
          transform: `translate3d(${ -(this.state.currIndex * this._el.nativeElement.offsetWidth) + state.value }px, 0, 0)`,
          width: `calc(100% * ${ this.state.items.length })`,
          height: '100%'
        };
      case SlidingDirection.Vertical:
        return {
          transform: `translate3d(0, ${ -(this.state.currIndex * this._el.nativeElement.offsetHeight) + state.value }px, 0)`,
          width: '100%',
          height: `calc(100% * ${ this.state.items.length })`,
        };
    }
  }

  private verticalPan(e) {
    if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
      return;
    }
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
        this.action.emit(this.state.currIndex);
      }
    }
  }

  private horizontalPan(e) {
    if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
      return;
    }
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
