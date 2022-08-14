import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
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
import { createSwipeSubscription } from '../utils/touch-functions';
import { SwipeEvent } from '../models/swipe.model'

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="sliderState$ | voAsync; let sliderState"
         class="g-items-container"
         [ngStyle]="zoom">

      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-item *ngFor="let item of state.items; let i = index"
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

  /** Sliding worker */
  private readonly _slidingWorker$ = new BehaviorSubject<WorkerState>({ value: 0, active: false });

  /** Stream that emits when the view is re-sized */
  private _resizeSub$: Subscription;

  /** Stream that emits sliding state */
  readonly sliderState$: Observable<SliderState> = this._slidingWorker$.pipe(map((state: WorkerState) => ({
    style: this.getSliderStyles(state),
    active: state.active
  })));

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when the active item should change */
  @Output() action = new EventEmitter<'next' | 'prev' | number>();

  /** Stream that emits when item is clicked */
  @Output() itemClick = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<GalleryError>();

  private swipeSubscription: Subscription

  /** Item zoom */
  get zoom() {
    return { transform: `perspective(50px) translate3d(0, 0, ${-this.config.zoomOut}px)` };
  }

  constructor(
    private readonly _el: ElementRef,
    private readonly _zone: NgZone,
    @Inject(PLATFORM_ID)
    private readonly platform: Object
  ) {

  }

  ngOnChanges(): void {
    // Refresh the slider
    this.updateSlider({ value: 0, active: false });
  }

  ngOnInit(): void {
    if (this.config.gestures) {
      this._zone.runOutsideAngular(() => this.swipeSubscription = createSwipeSubscription({
        enableMouseEvents: true,
        domElement: this._el.nativeElement,
        onSwipeMove: event => {
          if (event.direction === this.config.slidingDirection) {
            this.updateSlider({ value: event.distance, active: true });
          }
        },
        onSwipeEnd: event => this.onSwipe(event)
      }));
    }
    // Rearrange slider on window resize
    if (isPlatformBrowser(this.platform)) {
      this._resizeSub$ = fromEvent(window, 'resize').pipe(
        debounceTime(200),
        tap(() => this.updateSlider(this._slidingWorker$.value))
      ).subscribe();
    }

    setTimeout(() => this.updateSlider({ value: 0, active: false }));
  }

  ngOnDestroy() {
    this._resizeSub$?.unsubscribe();
    this.swipeSubscription?.unsubscribe();
    this._slidingWorker$.complete();
  }

  /**
   * Convert sliding state to styles
   */
  private getSliderStyles(state: WorkerState) {
    switch (this.config.slidingDirection) {
      case SlidingDirection.Horizontal:
        return {
          transform: `translate3d(${-(this.state.currIndex * this._el.nativeElement.offsetWidth) + state.value}px, 0, 0)`,
          width: `calc(100% * ${this.state.items.length})`,
          height: '100%'
        };
      case SlidingDirection.Vertical:
        return {
          transform: `translate3d(0, ${-(this.state.currIndex * this._el.nativeElement.offsetHeight) + state.value}px, 0)`,
          width: '100%',
          height: `calc(100% * ${this.state.items.length})`,
        };
    }
  }

  private onSwipe(e: SwipeEvent): void {
    if (e.direction === this.config.slidingDirection) {
      const limit = (e.direction === SlidingDirection.Vertical
        ? this._el.nativeElement.offsetHeight
        : this._el.nativeElement.offsetWidth
      ) * this.state.items.length / this.config.panSensitivity;
      if (e.velocity > 0.3 && e.distance > 30 || e.distance >= limit) {
        this.prev();
      } else if (e.velocity < -0.3 && e.distance < -30 || e.distance <= -limit) {
        this.next();
      } else {
        this.action.emit(this.state.currIndex);
      }
      this.updateSlider({ value: 0, active: false });
    }
  }

  private next(): void {
    this.action.emit('next');
  }

  private prev(): void {
    this.action.emit('prev');
  }

  private updateSlider(state: WorkerState): void {
    const newState: WorkerState = { ...this._slidingWorker$.value, ...state };
    this._slidingWorker$.next(newState);
  }
}
