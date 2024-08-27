import {
  Component,
  Output,
  ViewChild,
  inject,
  signal,
  effect,
  computed,
  viewChildren,
  input,
  EventEmitter,
  Signal,
  InputSignal,
  WritableSignal,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryError } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { Orientation } from '../models/constants';
import { SliderAdapter, HorizontalAdapter, VerticalAdapter } from './adapters';
import { SmoothScroll, SmoothScrollOptions } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SliderIntersectionObserver } from '../observers/slider-intersection-observer.directive';
import { ItemIntersectionObserver } from '../observers/item-intersection-observer.directive';
import { GalleryItemComponent } from './gallery-item.component';
import { SliderResizeObserver } from '../observers/slider-resize-observer.directive';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  standalone: true,
  selector: 'gallery-slider',
  template: `
    <div #slider
         class="g-slider"
         [attr.centralised]="config().itemAutosize"
         [smoothScroll]="position()"
         [smoothScrollInterruptOnMousemove]="!config().disableMouseScroll"
         sliderIntersectionObserver
         [sliderIntersectionObserverDisabled]="disableInteractionObserver()"
         [hammerSliding]="!config().disableMouseScroll"
         [adapter]="adapter()"
         [items]="items()"
         [config]="config()"
         [galleryId]="galleryId()"
         (isScrollingChange)="isScrolling.set($event)"
         (isSlidingChange)="isSliding.set($event)"
         (isResizingChange)="isResizing.set($event)"
         (activeIndexChange)="onActiveIndexChange($event)"
         sliderResizeObserver>
      <div class="g-slider-content">
        @for (item of galleryRef.items(); track item.data.src; let i = $index; let count = $count) {
          <gallery-item [attr.galleryId]="galleryId()"
                        [type]="item.type"
                        [config]="config()"
                        [data]="item.data"
                        [currIndex]="galleryRef.currIndex()"
                        [index]="i"
                        [count]="count"
                        itemIntersectionObserver
                        [itemIntersectionObserverDisabled]="disableInteractionObserver()"
                        [adapter]="adapter()"
                        (activeIndexChange)="onActiveIndexChange($event)"
                        (click)="itemClick.emit(i)"
                        (error)="error.emit({ itemIndex: i, error: $event })"/>
        }
      </div>

      @if (config().debug) {
        <div class="g-slider-debug">
          <div class="g-slider-resizing">RESIZING</div>
          <div class="g-slider-scrolling">SCROLLING</div>
          <div class="g-slider-sliding">SLIDING</div>
        </div>
      }
    </div>
    <ng-content/>
  `,
  styleUrl: './gallery-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GalleryItemComponent, SmoothScroll, HammerSliding, SliderIntersectionObserver, ItemIntersectionObserver, SliderResizeObserver]
})
export class GallerySliderComponent {

  galleryRef: GalleryRef = inject(GalleryRef);

  /** Stream that emits the slider position */
  position: WritableSignal<SmoothScrollOptions> = signal(null);

  isScrolling: WritableSignal<boolean> = signal(false);
  isSliding: WritableSignal<boolean> = signal(false);
  isResizing: WritableSignal<boolean> = signal(false);

  disableInteractionObserver: Signal<boolean> = computed(() => {
    return this.isScrolling() || this.isSliding() || this.isResizing();
  });

  /** Gallery ID */
  galleryId: InputSignal<string> = input();

  /** Gallery config */
  config: InputSignal<GalleryConfig> = input();

  /** Stream that emits when item is clicked */
  @Output() itemClick: EventEmitter<number> = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error: EventEmitter<GalleryError> = new EventEmitter<GalleryError>();

  /** Slider ElementRef */
  @ViewChild('slider', { static: true }) sliderEl: ElementRef<HTMLElement>;

  items: Signal<ReadonlyArray<GalleryItemComponent>> = viewChildren<GalleryItemComponent>(GalleryItemComponent);

  /** Slider adapter */
  adapter: Signal<SliderAdapter> = computed(() => {
    const config: GalleryConfig = this.config();
    return config.orientation === Orientation.Horizontal ?
      new HorizontalAdapter(this.slider, config) :
      new VerticalAdapter(this.slider, config);
  });

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  constructor() {
    effect(() => {
      // Scroll to index when current index changes
      // requestAnimationFrame(() => {
      this.scrollToIndex(this.galleryRef.currIndex(), this.galleryRef.scrollBehavior());
      // });
    }, { allowSignalWrites: true });

    // effect(() => {
    //   // this.scrollToIndex(this.galleryRef.currIndex(), 'auto');
    // });
  }

  onActiveIndexChange(index: number): void {
    if (index === -1) {
      // Reset active index position
      this.scrollToIndex(this.galleryRef.currIndex(), 'smooth');
    } else {
      this.galleryRef.set(index, 'smooth');
    }
  }

  private scrollToIndex(index: number, behavior: ScrollBehavior): void {
    const el: HTMLElement = this.items()[index]?.nativeElement;
    if (el) {
      const pos: SmoothScrollOptions = this.adapter().getScrollToValue(el, behavior || this.config().scrollBehavior);
      this.position.set(pos);
    }
  }
}
