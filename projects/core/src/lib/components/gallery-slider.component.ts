import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  Inject,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GalleryState, GalleryConfig, SlidingDirection } from '../models';

import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div *ngIf="slider$ | async; let sliderState"
         class="g-items-container"
         [ngStyle]="zoom">

      <div class="g-items-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-item *ngFor="let item of state.items; let i = index"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (tapClick)="itemClick.emit(i)">
        </gallery-item>

      </div>
    </div>
    <ng-content></ng-content>
  `
})
export class GallerySliderComponent implements OnInit, OnChanges, OnDestroy {

  /** Sliding worker */
  private readonly _slidingWorker$ = new BehaviorSubject({value: 0, active: false});

  /** HammerJS instance */
  private _hammer: any;

  /** Stream that emits when the view is re-sized */
  private _resizeSub$: Subscription;

  /** Stream that emits sliding state */
  slider$: Observable<{ style: any, active: boolean }>;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  @Input() width: number;
  @Input() height: number;

  /** Stream that emits when the active item should change */
  @Output() action = new EventEmitter<string | number>();

  /** Stream that emits when item is clicked */
  @Output() itemClick = new EventEmitter<number>();

  /** Item zoom */
  get zoom() {
    return {transform: `perspective(50px) translate3d(0, 0, ${-this.config.zoomOut}px)`};
  }

  constructor(private _el: ElementRef, @Inject(PLATFORM_ID) private platform: Object) {

    // Activate sliding worker
    this.slider$ = this._slidingWorker$.pipe(map(
      (state: any) => ({
        style: this.sliderStyle(state.value),
        active: state.active
      })));
  }

  ngOnChanges() {
    // Refresh the slider
    this.updateSlider({value: 0, active: false});
  }

  ngOnInit() {
    if (this.config.gestures && typeof Hammer !== 'undefined') {

      // Activate gestures
      this._hammer = new Hammer(this._el.nativeElement);
      this._hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});

      // Move the slider
      this._hammer.on('pan', (e) => {

        switch (this.config.slidingDirection) {
          case SlidingDirection.Horizontal:
            this.updateSlider({value: e.deltaX, active: true});
            if (e.isFinal) {
              this.updateSlider({value: 0, active: false});
              this.horizontalPan(e);
            }
            break;
          case SlidingDirection.Vertical:
            this.updateSlider({value: e.deltaY, active: true});
            if (e.isFinal) {
              this.updateSlider({value: 0, active: false});
              this.verticalPan(e);
            }
        }
      });
    }

    // Rearrange slider on window resize
    if (isPlatformBrowser(this.platform)) {
      this._resizeSub$ = fromEvent(window, 'resize').pipe(
        debounceTime(200),
        tap(() => this.updateSlider(this._slidingWorker$.value))
      ).subscribe();
    }

    // Fix wrong slider width on init
    setTimeout(() => {
      this.updateSlider({value: 0, active: false});
    }, 300);
  }

  ngOnDestroy() {
    if (this._hammer) {
      this._hammer.destroy();
    }
    if (this._resizeSub$) {
      this._resizeSub$.unsubscribe();
    }
    this._slidingWorker$.complete();
  }

  private sliderStyle(delta: number) {
    switch (this.config.slidingDirection) {
      case SlidingDirection.Horizontal:
        return {
          transform: `translate3d(${-(this.state.currIndex * this._el.nativeElement.offsetWidth) + delta}px, 0, 0)`,
          width: this._el.nativeElement.offsetWidth * this.state.items.length + 'px',
          height: '100%'
        };
      case SlidingDirection.Vertical:
        return {
          transform: `translate3d(0, ${-(this.state.currIndex * this._el.nativeElement.offsetHeight) + delta}px, 0)`,
          width: '100%',
          height: this._el.nativeElement.offsetHeight * this.state.items.length + 'px',
        };
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
        this.action.emit(this.state.currIndex);
      }
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

  private updateSlider(state: any) {
    this._slidingWorker$.next({...this._slidingWorker$, ...state});
  }
}
