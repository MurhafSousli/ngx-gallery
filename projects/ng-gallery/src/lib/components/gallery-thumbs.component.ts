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
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { GalleryConfig } from '../models/config.model';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { ThumbnailsPosition, ThumbnailsView } from '../models/constants';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #container class="g-thumbs-container">
      <div #slider class="g-slider">
        <div *ngIf="config.thumbView === thumbnailsView.Contain || isContentLessThanContainer"
             [style.flex]="'0 0 ' + centralizerSize + 'px'"></div>
        <gallery-thumb *ngFor="let item of state.items;let i = index"
                       [style.flex]="'0 0 ' + thumbSize + 'px'"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       [tapClickDisabled]="config.disableThumb"
                       (tapClick)="thumbClick.emit(i)"
                       (error)="error.emit({itemIndex: i, error: $event})"></gallery-thumb>
        <div *ngIf="config.thumbView === thumbnailsView.Contain || isContentLessThanContainer"
             [style.flex]="'0 0 ' + centralizerSize + 'px'"></div>
      </div>
      <div>{{slider.clientWidth}}, {{ slider.scrollWidth}}, {{slider.offsetWidth }}</div>
    </div>
  `
})
export class GalleryThumbsComponent implements OnInit, OnChanges, OnDestroy {

  /** HammerJS instance */
  private _hammer: any;

  private _scrollSub$: Subscription;

  /** Thumbnails view enum */
  readonly thumbnailsView = ThumbnailsView;

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

  @ViewChild('container', { static: true }) containerEl: ElementRef;

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  get container(): HTMLElement {
    return this.containerEl.nativeElement;
  }

  get centralizerSize(): number {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        if (this.isContentLessThanContainer) {
          const thumbSize = this.config.thumbWidth;
          const size = this.slider.clientWidth - (thumbSize * this.state.items.length);
          return size / 2;
        }
        return (this.container.clientWidth / 2) - (this.config.thumbWidth / 2);
      case ThumbnailsPosition.Left:
      case ThumbnailsPosition.Right:
        if (this.isContentLessThanContainer) {
          const thumbSize = this.config.thumbHeight;
          const size = this.slider.clientHeight - (thumbSize * this.state.items.length);
          return size / 2;
        }
        return (this.container.clientHeight / 2) - (this.config.thumbHeight / 2);
    }
  }

  get thumbSize(): number {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        return this.config.thumbWidth;
    }
    return this.config.thumbHeight;
  }

  get isContentLessThanContainer(): boolean {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        return this.slider.clientWidth >= this.slider.scrollWidth;
    }
    return this.slider.clientHeight >= this.slider.scrollHeight;
  }

  constructor(private _el: ElementRef, private _zone: NgZone) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.state.firstChange || !this.config.thumbDetached) {
      // Scroll slide to item when current index changes.
      requestAnimationFrame(() => {
        this.scrollToIndex(this.state.currIndex, changes.state.firstChange ? 'auto' : 'smooth');
      });
    }

    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Right:
      case ThumbnailsPosition.Left:
        this.height = '100%';
        this.width = this.config.thumbWidth + 'px';
        break;
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        this.height = this.config.thumbHeight + 'px';
        this.width = '100%';
        break;
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

  private scrollToIndex(value: number, behavior) {
    switch (this.config.thumbPosition) {
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        let left: number = (value * this.config.thumbWidth);
        if (this.config.thumbView === ThumbnailsView.Default) {
          left -= (this.slider.parentElement.clientWidth / 2) - (this.config.thumbWidth / 2);
        }
        this.slider.scrollTo({ behavior, left });
        break;

      case ThumbnailsPosition.Left:
      case ThumbnailsPosition.Right:
        let top: number = value * this.config.thumbHeight;
        if (this.config.thumbView === ThumbnailsView.Default) {
          top -= (this.slider.parentElement.clientHeight / 2) - (this.config.thumbHeight / 2);
        }
        this.slider.scrollTo({ behavior, top });
    }
  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => {
      // this._scrollSub$ = fromEvent(this.slider, 'scroll').pipe(
      //   debounceTime(50),
      //   tap(() => {
      //     let index: number;
      //     switch (this.config.thumbPosition) {
      //       case ThumbnailsPosition.Top:
      //       case ThumbnailsPosition.Bottom:
      //         index = this.slider.scrollLeft / this.slider.clientWidth;
      //         break;
      //       case ThumbnailsPosition.Left:
      //       case ThumbnailsPosition.Right:
      //         index = this.slider.scrollTop / this.slider.clientHeight;
      //         break;
      //     }
      //     // Check if index value is
      //     if (Number.isSafeInteger(index)) {
      //       this._zone.run(() => this.action.emit(index));
      //     }
      //   })
      // ).subscribe();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollToIndex(this.state.currIndex, 'auto');
    }, 200);
  }

  ngOnDestroy() {
    this._hammer?.destroy();
    this._scrollSub$?.unsubscribe();
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
        let freeModeCurrentOffset: number = 0;
        // Move the slider
        this._hammer.on('panstart', () => {
          switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
              freeModeCurrentOffset = this.slider.scrollTop;
              break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
              freeModeCurrentOffset = this.slider.scrollLeft;

          }
        });
        this._hammer.on('pan', (e) => {
          switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
              this.slider.scrollTo({ top: freeModeCurrentOffset - e.deltaY, behavior: 'auto' });
              break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
              this.slider.scrollTo({ left: freeModeCurrentOffset - e.deltaX, behavior: 'auto' });
          }
        });
      });
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
