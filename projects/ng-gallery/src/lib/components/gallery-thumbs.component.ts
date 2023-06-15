import {
  Component,
  Input,
  Output,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  OnChanges,
  ViewChild,
  ViewChildren,
  QueryList,
  SimpleChanges,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgFor } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { GalleryConfig } from '../models/config.model';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { ThumbnailsPosition, ThumbnailsView } from '../models/constants';
import { ThumbSliderAdapter, HorizontalThumbAdapter, VerticalThumbAdapter } from './adapters';
import { SmoothScrollManager } from '../smooth-scroll';
import { resizeObservable } from '../utils/resize-observer';
import { GalleryThumbComponent } from './gallery-thumb.component';

declare const Hammer: any;

@Component({
  selector: 'gallery-thumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #slider
         class="g-slider"
         [attr.centralised]="config.thumbView === thumbnailsView.Contain || adapter.isContentLessThanContainer">
      <div class="g-slider-content">
        <gallery-thumb *ngFor="let item of state.items; trackBy: trackByFn; index as i"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       (click)="config.disableThumb ? null : thumbClick.emit(i)"
                       (error)="error.emit({ itemIndex: i, error: $event })">
        </gallery-thumb>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgFor, GalleryThumbComponent]
})
export class GalleryThumbsComponent implements AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {

  /** HammerJS instance */
  private _hammer: any;

  /** Thumbnails view enum */
  readonly thumbnailsView = ThumbnailsView;

  private readonly _destroyed$ = new Subject<void>();

  /** Slider adapter */
  adapter: ThumbSliderAdapter;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when thumb is clicked */
  @Output() thumbClick = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<GalleryError>();

  /** Slider ElementRef */
  @ViewChild('slider', { static: true }) sliderEl: ElementRef;

  @ViewChildren(GalleryThumbComponent, { read: ElementRef }) items = new QueryList<ElementRef<HTMLElement>>();

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  constructor(private _el: ElementRef,
              private _zone: NgZone,
              private _smoothScroll: SmoothScrollManager,
              private _cd: ChangeDetectorRef,
              private _platform: Platform) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      // Sets sliding direction
      if (changes.config.currentValue?.thumbPosition !== changes.config.previousValue?.thumbPosition) {
        switch (this.config.thumbPosition) {
          case ThumbnailsPosition.Right:
          case ThumbnailsPosition.Left:
            this.adapter = new VerticalThumbAdapter(this.slider, this.config);
            break;
          case ThumbnailsPosition.Top:
          case ThumbnailsPosition.Bottom:
            this.adapter = new HorizontalThumbAdapter(this.slider, this.config);
            break;
        }

        if (this._platform.isBrowser) {
          if (!changes.config.firstChange) {
            // Keep the correct sliding position when direction changes
            requestAnimationFrame(() => {
              this.scrollToIndex(this.state.currIndex, 'auto');
            });
          }

          // Reactivate gestures
          this.enableDisableGestures();
        }
      }
      if (this._platform.isBrowser) {
        if (!changes.config.firstChange && changes.config.currentValue?.thumbMouseSlidingDisabled !== changes.config.previousValue?.thumbMouseSlidingDisabled) {
          this.enableDisableGestures();
        }

        this.slider.style.setProperty('--thumb-height', `${ this.config.thumbHeight }px`);
        this.slider.style.setProperty('--thumb-width', `${ this.config.thumbWidth }px`);
      }
    }

    if (this._platform.isBrowser && changes.state && (changes.state.firstChange || !this.config.thumbDetached)) {
      if (changes.state.currentValue?.currIndex !== changes.state.previousValue?.currIndex) {
        // Scroll slide to item when current index changes.
        requestAnimationFrame(() => {
          this.scrollToIndex(this.state.currIndex, changes.state?.firstChange ? 'auto' : 'smooth');
        });
      }
    }
  }

  ngAfterViewInit(): void {
    if (this._platform.isBrowser) {
      // Workaround: opening a lightbox (centralised) with last index active, show in wrong position
      setTimeout(() => this.scrollToIndex(this.state.currIndex, 'auto'), 200);

      this._zone.runOutsideAngular(() => {
        // Update necessary calculation on host resize
        resizeObservable(this._el.nativeElement).pipe(
          debounceTime(this.config.resizeDebounceTime),
          tap(() => {
            // Update thumb centralize size
            const el: HTMLElement = this.items.get(this.state.currIndex)?.nativeElement;
            if (el) {
              this.slider.style.setProperty('--thumb-centralize-start-size', this.adapter.getCentralizerStartSize() + 'px');
              this.slider.style.setProperty('--thumb-centralize-end-size', this.adapter.getCentralizerEndSize() + 'px');
            }
            this._cd.detectChanges();
            this.scrollToIndex(this.state.currIndex, 'auto');
          }),
          takeUntil(this._destroyed$)
        ).subscribe();
      });
    }
  }

  ngAfterViewChecked(): void {
    const el: HTMLElement = this.items.get(this.state.currIndex)?.nativeElement;
    if (el && this._platform.isBrowser) {
      this.slider.style.setProperty('--thumb-centralize-start-size', this.adapter.getCentralizerStartSize() + 'px');
      this.slider.style.setProperty('--thumb-centralize-end-size', this.adapter.getCentralizerEndSize() + 'px');
    }
  }

  ngOnDestroy(): void {
    this.deactivateGestures();
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  trackByFn(index: number, item: any) {
    return item.type;
  }

  private scrollToIndex(value: number, behavior: ScrollBehavior): void {
    this._zone.runOutsideAngular(() => {
      this.slider.style.scrollSnapType = 'unset';

      const el: HTMLElement = this.items.get(value)?.nativeElement;
      if (el) {
        this._smoothScroll.scrollTo(this.slider, this.adapter.getScrollToValue(el, behavior)).then(() => {
          this.slider.style.scrollSnapType = this.adapter.scrollSnapType;
        });
      }
    });
  }

  private enableDisableGestures(): void {
    if (!this._platform.IOS && !this._platform.ANDROID) {
      // Enable/Disable mouse sliding on desktop browser only
      if (!this.config.thumbMouseSlidingDisabled) {
        this.activateGestures();
      } else {
        this.deactivateGestures();
      }
    }
  }

  private activateGestures(): void {
    if (typeof Hammer !== 'undefined' && !this.config.disableThumb) {

      const direction: number = this.adapter.panDirection;

      // Activate gestures
      this._zone.runOutsideAngular(() => {
        this._hammer = new Hammer(this._el.nativeElement, { inputClass: Hammer.MouseInput });
        this._hammer.get('pan').set({ direction });

        let panOffset: number = 0;

        this._hammer.on('panstart', () => {
          panOffset = this.adapter.scrollValue;
          // Disable scroll-snap-type functionality
          this.slider.style.scrollSnapType = 'unset';
          this.slider.classList.add('g-sliding');
        });
        this._hammer.on('panmove', (e) => this.slider.scrollTo(this.adapter.getPanValue(panOffset, e, 'auto')));
        this._hammer.on('panend', () => {
          // Enable scroll-snap-type functionality
          this.slider.style.scrollSnapType = this.adapter.scrollSnapType;
          this.slider.classList.remove('g-sliding');
        });
      });
    }
  }

  private deactivateGestures(): void {
    this._hammer?.destroy();
  }
}
