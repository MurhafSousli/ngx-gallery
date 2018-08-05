import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  HostBinding,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryConfig, GalleryState, ThumbnailsPosition, ThumbnailsMode } from '../models';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div *ngIf="slider$ | async; let slider"
         class="g-thumbs-container">
      <div class="g-thumbs-slider"
           [class.g-no-transition]="slider.active"
           [ngStyle]="slider.style">

        <gallery-thumb *ngFor="let item of state.items;let i = index"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       (tapClick)="action.emit(i)"
                       [tapClickDisabled]="config.disableThumb"></gallery-thumb>
      </div>
    </div>
  `
})
export class GalleryThumbsComponent implements OnInit, OnChanges, OnDestroy {

  /** Sliding worker */
  private readonly _slidingWorker$ = new BehaviorSubject({value: 0, active: false});

  /** HammerJS instance */
  private _hammer: any;

  /** Current slider position in free sliding mode */
  private _freeModeCurrentOffset = 0;

  /** Stream that emits sliding state */
  slider$: Observable<{ style: any, active: boolean }>;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when the active item should change */
  @Output() action = new EventEmitter<string | number>();

  /** Stream that emits when thumb is clicked */
  @Output() thumbClick = new EventEmitter<number>();

  /** Host height */
  @HostBinding('style.height') height: string;

  /** Host width */
  @HostBinding('style.width') width: string;

  constructor(private _el: ElementRef) {

    // Activate sliding worker
    this.slider$ = this._slidingWorker$.pipe(
      map((state: any) => ({
        style: this.thumbsStyle(state.value),
        active: state.active
      })));
  }

  ngOnChanges() {
    // Refresh the slider
    this.updateSlider({value: 0, active: false});
    this._freeModeCurrentOffset = 0;
  }

  ngOnInit() {
    if (this.config.gestures && !this.config.disableThumb && typeof Hammer !== 'undefined') {

      // Activate gestures
      this._hammer = new Hammer(this._el.nativeElement);
      this._hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});

      // Move the slider
      switch (this.config.thumbMode) {
        case ThumbnailsMode.Strict:
          this._hammer.on('pan', (e) => this.strictMode(e));
          break;
        case ThumbnailsMode.Free:
          this._hammer.on('pan', (e) => this.freeMode(e));
      }
    }
  }

  ngOnDestroy() {
    if (this._hammer) {
      this._hammer.destroy();
    }
  }

  /**
   * Sliding strict mode
   */
  private strictMode(e) {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Right:
      case ThumbnailsPosition.Left:
        this.updateSlider({value: e.deltaY, active: true});
        if (e.isFinal) {
          this.updateSlider({value: 0, active: false});
          this.verticalPan(e);
        }
        break;
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        this.updateSlider({value: e.deltaX, active: true});
        if (e.isFinal) {
          this.updateSlider({value: 0, active: false});
          this.horizontalPan(e);
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
        this.updateSlider({value: this._freeModeCurrentOffset + e.deltaY, active: true});
        if (e.isFinal) {
          if (this.minFreeScrollExceeded(e.deltaY, this.config.thumbWidth, this.config.thumbHeight)) {
            this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbHeight;
          } else if (this.maxFreeScrollExceeded(e.deltaY, this.config.thumbHeight, this.config.thumbWidth)) {
            this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbHeight;
          } else {
            this._freeModeCurrentOffset += e.deltaY;
          }
          this.updateSlider({value: this._freeModeCurrentOffset, active: false});
        }
        break;
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        this.updateSlider({value: this._freeModeCurrentOffset + e.deltaX, active: true});
        if (e.isFinal) {
          if (this.minFreeScrollExceeded(e.deltaX, this.config.thumbHeight, this.config.thumbWidth)) {
            this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbWidth;
          } else if (this.maxFreeScrollExceeded(e.deltaX, this.config.thumbWidth, this.config.thumbHeight)) {
            this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbWidth;
          } else {
            this._freeModeCurrentOffset += e.deltaX;
          }
          this.updateSlider({value: this._freeModeCurrentOffset, active: false});
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
  private thumbsStyle(delta: number) {
    let value: number;
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        this.width = '100%';
        this.height = this.config.thumbHeight + 'px';
        value = -(this.state.currIndex * this.config.thumbWidth) - (this.config.thumbWidth / 2 - delta);
        return {
          transform: `translate3d(${value}px, 0, 0)`,
          width: this.state.items.length * this.config.thumbWidth + 'px',
          height: '100%'
        };
      case ThumbnailsPosition.Left:
      case ThumbnailsPosition.Right:
        this.width = this.config.thumbWidth + 'px';
        this.height = '100%';
        value = -(this.state.currIndex * this.config.thumbHeight) - (this.config.thumbHeight / 2 - delta);
        return {
          transform: `translate3d(0, ${value}px, 0)`,
          width: '100%',
          height: this.state.items.length * this.config.thumbHeight + 'px',
        };
    }
  }

  private verticalPan(e) {
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

  private horizontalPan(e) {
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

  private updateSlider(state: any) {
    this._slidingWorker$.next({...this._slidingWorker$, ...state});
  }
}
