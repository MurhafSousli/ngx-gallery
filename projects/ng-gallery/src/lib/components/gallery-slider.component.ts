import {
  Component,
  Input,
  Output,
  ViewChild,
  ViewChildren,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, map, startWith } from 'rxjs';
import { Gallery } from '../services/gallery.service';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { Orientation } from '../models/constants';
import { SliderAdapter, HorizontalAdapter, VerticalAdapter } from './adapters';
import { SmoothScroll, SmoothScrollOptions } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SliderIntersectionObserver } from '../observers/slider-intersection-observer.directive';
import { ItemIntersectionObserver } from '../observers/item-intersection-observer.directive';
import { GalleryItemComponent } from './gallery-item.component';
import { SliderResizeObserver } from '../observers/slider-resize-observer.directive';

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gallery-slider.scss'],
  template: `
    <div #slider
         class="g-slider"
         [attr.centralised]="config.itemAutosize"
         [smoothScroll]="position$ | async"
         [smoothScrollInterruptOnMousemove]="!config.disableMouseScroll"
         sliderIntersectionObserver
         [sliderIntersectionObserverDisabled]="isScrolling || isSliding || isResizing"
         [hammerSliding]="!config.disableMouseScroll"
         [adapter]="adapter"
         [items]="items$ | async"
         [config]="config"
         [state]="state"
         [galleryId]="galleryId"
         (isScrollingChange)="isScrolling = $event"
         (isSlidingChange)="isSliding = $event"
         (activeIndexChange)="onActiveIndexChange($event)"
         (isResizingChange)="isResizing = $event"
         sliderResizeObserver>
      <div class="g-slider-content">
        <gallery-item *ngFor="let item of state.items; trackBy: trackByFn index as i"
                      [attr.galleryId]="galleryId"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      [count]="state.items.length"
                      itemIntersectionObserver
                      [itemIntersectionObserverDisabled]="isScrolling || isSliding || isResizing"
                      [adapter]="adapter"
                      (activeIndexChange)="onActiveIndexChange($event)"
                      (click)="itemClick.emit(i)"
                      (error)="error.emit({ itemIndex: i, error: $event })"/>
      </div>

      <div *ngIf="config.debug" class="g-slider-debug">
        <div class="g-slider-resizing">RESIZING</div>
        <div class="g-slider-scrolling">SCROLLING</div>
        <div class="g-slider-sliding">SLIDING</div>
      </div>
    </div>
    <ng-content></ng-content>
  `,
  standalone: true,
  imports: [CommonModule, GalleryItemComponent, SmoothScroll, HammerSliding, SliderIntersectionObserver, ItemIntersectionObserver, SliderResizeObserver]
})
export class GallerySliderComponent implements AfterViewInit, OnChanges {

  /** Stream that emits the slider position */
  readonly position$: Subject<SmoothScrollOptions> = new Subject<SmoothScrollOptions>();

  /** Slider adapter */
  adapter: SliderAdapter;

  /** Stream that emits the item components once they're initialized */
  items$: Observable<GalleryItemComponent[]>;

  isScrolling: boolean;

  isSliding: boolean;

  isResizing: boolean;

  /** Gallery ID */
  @Input() galleryId: string;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when item is clicked */
  @Output() itemClick: EventEmitter<number> = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error: EventEmitter<GalleryError> = new EventEmitter<GalleryError>();

  /** Slider ElementRef */
  @ViewChild('slider', { static: true }) sliderEl: ElementRef<HTMLElement>;

  @ViewChildren(GalleryItemComponent) items: QueryList<GalleryItemComponent> = new QueryList<GalleryItemComponent>();

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  constructor(private _gallery: Gallery) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      if (changes.config.currentValue?.orientation !== changes.config.previousValue?.orientation) {
        switch (this.config.orientation) {
          case Orientation.Horizontal:
            this.adapter = new HorizontalAdapter(this.slider, this.config);
            break;
          case Orientation.Vertical:
            this.adapter = new VerticalAdapter(this.slider, this.config);
            break;
        }
      }
      if (!changes.config.firstChange) {
        // Keep the correct sliding position when direction changes
        requestAnimationFrame(() => {
          this.scrollToIndex(this.state.currIndex, 'auto');
        });
      }
    }

    // Scroll to current index
    if (changes.state) {
      if (changes.state.currentValue?.currIndex !== changes.state.previousValue?.currIndex) {
        requestAnimationFrame(() => {
          this.scrollToIndex(this.state.currIndex, changes.state.firstChange ? 'auto' : this.state.behavior);
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
      this.scrollToIndex(this.state.currIndex, 'smooth');
    } else {
      this._gallery.ref(this.galleryId).set(index, 'smooth');
    }
  }

  private scrollToIndex(index: number, behavior: ScrollBehavior): void {
    const el: HTMLElement = this.items.get(index)?.nativeElement;
    if (el) {
      const pos: SmoothScrollOptions = this.adapter.getScrollToValue(el, behavior || this.config.scrollBehavior);
      this.position$.next(pos);
    }
  }
}
