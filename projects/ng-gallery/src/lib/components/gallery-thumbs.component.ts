import {
  Component,
  Input,
  Output,
  ViewChild,
  ViewChildren,
  inject,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  QueryList,
  SimpleChanges,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, map, startWith } from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { GalleryError } from '../models/gallery.model';
import { ThumbnailsPosition } from '../models/constants';
import { VerticalAdapter, HorizontalAdapter, SliderAdapter } from './adapters';
import { SmoothScroll, SmoothScrollOptions } from '../smooth-scroll';
import { GalleryThumbComponent } from './gallery-thumb.component';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { ThumbResizeObserver } from '../observers/thumb-resize-observer.directive';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  standalone: true,
  selector: 'gallery-thumbs',
  template: `
    <div #slider
         class="g-slider"
         [smoothScroll]="position$ | async"
         [smoothScrollInterruptOnMousemove]="!config.disableThumbMouseScroll"
         [attr.centralised]="config.thumbCentralized || adapter.isContentLessThanContainer"
         [hammerSliding]="!config.disableThumbMouseScroll"
         [galleryId]="galleryId"
         [items]="items$ | async"
         [config]="config"
         [adapter]="adapter"
         (thumbResizeObserver)="scrollToIndex(galleryRef.currIndex(), 'auto')"
         (activeIndexChange)="onActiveIndexChange($event)">
      <div class="g-slider-content">
        @for (item of galleryRef.items(); track item.data.src; let i = $index; let count = $count) {
          <gallery-thumb [attr.galleryId]="galleryId"
                         [type]="item.type"
                         [config]="config"
                         [data]="item.data"
                         [currIndex]="galleryRef.currIndex()"
                         [index]="i"
                         [count]="count"
                         (click)="config.disableThumbs ? null : thumbClick.emit(i)"
                         (error)="error.emit({ itemIndex: i, error: $event })"/>
        }
      </div>
    </div>
  `,
  styleUrl: './gallery-thumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, GalleryThumbComponent, SmoothScroll, HammerSliding, ThumbResizeObserver]
})
export class GalleryThumbsComponent implements AfterViewInit, OnChanges {

  galleryRef: GalleryRef = inject(GalleryRef);

  /** Stream that emits the slider position */
  readonly position$: Subject<SmoothScrollOptions> = new Subject<SmoothScrollOptions>();

  /** Slider adapter */
  adapter: SliderAdapter;

  /** Stream that emits the thumb components once they're initialized */
  items$: Observable<GalleryThumbComponent[]>;

  /** Gallery ID */
  @Input() galleryId: string;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when thumb is clicked */
  @Output() thumbClick: EventEmitter<number> = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error: EventEmitter<GalleryError> = new EventEmitter<GalleryError>();

  /** Slider ElementRef */
  @ViewChild('slider', { static: true }) sliderEl: ElementRef<HTMLElement>;

  @ViewChildren(GalleryThumbComponent) items: QueryList<GalleryThumbComponent> = new QueryList<GalleryThumbComponent>();

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      // Sets sliding direction
      if (changes.config.currentValue?.thumbPosition !== changes.config.previousValue?.thumbPosition) {
        switch (this.config.thumbPosition) {
          case ThumbnailsPosition.Right:
          case ThumbnailsPosition.Left:
            this.adapter = new VerticalAdapter(this.slider, this.config);
            break;
          case ThumbnailsPosition.Top:
          case ThumbnailsPosition.Bottom:
            this.adapter = new HorizontalAdapter(this.slider, this.config);
            break;
        }

        if (!changes.config.firstChange) {
          // Keep the correct sliding position when direction changes
          requestAnimationFrame(() => {
            this.scrollToIndex(this.galleryRef.currIndex(), 'auto');
          });
        }
      }
    }

    if (changes.state && (changes.state.firstChange || !this.config.detachThumbs)) {
      if (changes.state.currentValue?.currIndex !== changes.state.previousValue?.currIndex) {
        // Scroll slide to item when current index changes.
        requestAnimationFrame(() => {
          this.scrollToIndex(this.galleryRef.currIndex(), changes.state?.firstChange ? 'auto' : 'smooth');
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.items.notifyOnChanges();
    this.items$ = this.items.changes.pipe(
      // In some cases, items is not notified at first, need to force start the stream
      startWith(null),
      map(() => this.items.toArray())
    );
  }

  trackByFn(index: number, item: any) {
    return item.type;
  }

  onActiveIndexChange(index: number): void {
    if (index === -1) {
      // Reset active index position
      this.scrollToIndex(this.galleryRef.currIndex(), 'smooth');
    } else {
      this.scrollToIndex(index, 'smooth');
    }
  }

  scrollToIndex(value: number, behavior: ScrollBehavior): void {
    const el: HTMLElement = this.items.get(value)?.nativeElement;
    if (el) {
      const pos: SmoothScrollOptions = this.adapter.getScrollToValue(el, behavior);
      this.position$.next(pos);
    }
  }
}
