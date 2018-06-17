import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GalleryState, GalleryConfig } from '../models';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime } from 'rxjs/operators/debounceTime';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="slides-container"
         [ngStyle]="viewDepth()">
      <div class="slides"
           [class.-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">
        <div *ngFor="let item of state.items; let i = index"
             class="slide"
             (click)="itemClick.emit(i)">
          <ng-container [item]="item"></ng-container>
        </div>
      </div>
    </div>
    <ng-content></ng-content>
  `
})
export class GallerySliderComponent implements OnInit, OnChanges, OnDestroy {

  mc: any;
  resizeSub$: Subscription;
  sliderState$: Observable<any>;
  stateStream$ = new BehaviorSubject({value: 0, active: false});
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Input() width: number;
  @Input() height: number;
  @Output() indexChange = new EventEmitter<string | number>();
  @Output() itemClick = new EventEmitter<number>();

  constructor(private _el: ElementRef, @Inject(PLATFORM_ID) private platform: Object) {
    this.sliderState$ = this.stateStream$.pipe(map(
      (state: any) => ({
        style: this.sliderStyle(state.value),
        active: state.active
      })));
  }

  viewDepth() {
    return {transform: `perspective(50px) translate3d(0, 0, ${-this.config.zoomOut}px)`};
  }

  sliderStyle(delta: number) {
    switch (this.config.slidingDirection) {
      case 'horizontal':
        return {
          transform: `translate3d(${-(this.state.currIndex * this._el.nativeElement.offsetWidth) + delta}px, 0, 0)`,
          width: this._el.nativeElement.offsetWidth * this.state.items.length + 'px',
          height: '100%'
        };
      case 'vertical':
        return {
          transform: `translate3d(0, ${-(this.state.currIndex * this._el.nativeElement.offsetHeight) + delta}px, 0)`,
          width: '100%',
          height: this._el.nativeElement.offsetHeight * this.state.items.length + 'px',
        };
    }
  }

  ngOnChanges() {
    this.stateStream$.next({value: 0, active: false});
  }

  ngOnInit() {
    if (this.config.gestures && typeof Hammer !== 'undefined') {

      this.mc = new Hammer(this._el.nativeElement);
      this.mc.get('pan').set({direction: Hammer.DIRECTION_ALL});

      // Slides thumbnails
      this.mc.on('pan', (e) => {

        switch (this.config.slidingDirection) {
          case 'horizontal':
            this.stateStream$.next({value: e.deltaX, active: true});
            if (e.isFinal) {
              this.stateStream$.next({value: 0, active: false});
              this.horizontalPan(e);
            }
            break;
          case 'vertical':
            this.stateStream$.next({value: e.deltaY, active: true});
            if (e.isFinal) {
              this.stateStream$.next({value: 0, active: false});
              this.verticalPan(e);
            }
        }
      });
    }

    // Rearrange slider on window resize
    if (isPlatformBrowser(this.platform)) {
      this.resizeSub$ = fromEvent(window, 'resize').pipe(
        debounceTime(200),
        tap(() => this.stateStream$.next(this.stateStream$.getValue()))
      ).subscribe();
    }

    // Fix wrong slider width on init
    setTimeout(() => {
      this.stateStream$.next({value: 0, active: false});
    }, 300);
  }

  ngOnDestroy() {
    if (this.mc) {
      this.mc.destroy();
    }
    if (this.resizeSub$) {
      this.resizeSub$.unsubscribe();
    }
  }

  verticalPan(e) {
    if (e.velocityY > 0.3) {
      this.indexChange.emit('prev');
    } else if (e.velocityY < -0.3) {
      this.indexChange.emit('next');
    } else {
      if (e.deltaY / 2 <= -this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
        this.indexChange.emit('next');
      } else if (e.deltaY / 2 >= this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
        this.indexChange.emit('prev');
      } else {
        this.indexChange.emit(this.state.currIndex);
      }
    }
  }

  horizontalPan(e) {
    if (e.velocityX > 0.3) {
      this.indexChange.emit('prev');
    } else if (e.velocityX < -0.3) {
      this.indexChange.emit('next');
    } else {
      if (e.deltaX / 2 <= -this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
        this.indexChange.emit('next');
      } else if (e.deltaX / 2 >= this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
        this.indexChange.emit('prev');
      } else {
        this.indexChange.emit(this.state.currIndex);
      }
    }
  }
}
