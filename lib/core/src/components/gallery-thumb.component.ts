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
  HostBinding,
  NgZone
} from '@angular/core';
import { GalleryConfig, GalleryState } from '../models';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div *ngIf="thumbState$ | async; let thumbState"
         class="g-thumb-container">
      <div class="g-thumbs"
           [class.-no-transition]="thumbState.active"
           [ngStyle]="thumbState.style">
        <div *ngFor="let item of state.items;let i = index"
             class="g-thumb"
             [class.-current]="i === state.currIndex"
             (tapClick)="indexChange.emit(i)"
             [tapClickDisabled]="config.disableThumb">
          <ng-container [item]="item" type="thumb"></ng-container>
        </div>
      </div>
    </div>
  `
})
export class GalleryThumbComponent implements OnInit, OnChanges, OnDestroy {

  mc: any;
  thumbState$: Observable<any>;
  stateStream$ = new BehaviorSubject({value: 0, active: false});
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() indexChange = new EventEmitter<string | number>();
  @HostBinding('style.height') height;
  @HostBinding('style.width') width;

  constructor(private _el: ElementRef, private _ngZone: NgZone) {
    this.thumbState$ = this.stateStream$.pipe(
      map((state: any) => ({
        style: this.thumbsStyle(state.value),
        active: state.active
      })));
  }

  ngOnChanges() {
    this.stateStream$.next({value: 0, active: false});
  }

  ngOnInit() {

    this._ngZone.runOutsideAngular(() => {
      if (this.config.gestures && !this.config.disableThumb && typeof Hammer !== 'undefined') {

        this.mc = new Hammer(this._el.nativeElement);
        this.mc.get('pan').set({direction: Hammer.DIRECTION_ALL});

        // Slides thumbnails
        this.mc.on('pan', (e) => {
          switch (this.config.thumbPosition) {
            case 'right':
            case 'left':
              this.stateStream$.next({value: e.deltaY, active: true});
              if (e.isFinal) {
                this.stateStream$.next({value: 0, active: false});
                this.verticalPan(e);
              }
              break;
            case 'top':
            case 'bottom':
              this.stateStream$.next({value: e.deltaX, active: true});
              if (e.isFinal) {
                this.stateStream$.next({value: 0, active: false});
                this.horizontalPan(e);
              }
          }
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.mc) {
      this.mc.destroy();
    }
  }

  thumbsStyle(delta: number) {
    let value: number;
    switch (this.config.thumbPosition) {
      case 'top':
      case 'bottom':
        this.height = this.config.thumbHeight + 'px';
        value = -(this.state.currIndex * this.config.thumbWidth) - (this.config.thumbWidth / 2 - delta);
        return {
          transform: `translate3d(${value}px, 0, 0)`,
          width: this.state.items.length * this.config.thumbWidth + 'px',
          height: '100%'
        };
      case 'left':
      case 'right':
        this.width = this.config.thumbWidth + 'px';
        value = -(this.state.currIndex * this.config.thumbHeight) - (this.config.thumbHeight / 2 - delta);
        return {
          transform: `translate3d(0, ${value}px, 0)`,
          width: '100%',
          height: this.state.items.length * this.config.thumbHeight + 'px',
        };
    }
  }

  verticalPan(e) {
    if (e.velocityY > 0.3) {
      this.indexChange.emit('prev');
    } else if (e.velocityY < -0.3) {
      this.indexChange.emit('next');
    } else {
      if (e.deltaY / 2 <= -this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
        this.indexChange.emit('next');
      } else if (e.deltaY / 2 >= this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
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
      if (e.deltaX / 2 <= -this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
        this.indexChange.emit('next');
      } else if (e.deltaX / 2 >= this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
        this.indexChange.emit('prev');
      } else {
        this.indexChange.emit(this.state.currIndex);
      }
    }
  }

}
