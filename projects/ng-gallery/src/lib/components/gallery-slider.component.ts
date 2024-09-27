import {
  Component,
  inject,
  signal,
  computed,
  output,
  effect,
  untracked,
  viewChildren,
  input,
  viewChild,
  Signal,
  ElementRef,
  InputSignal,
  WritableSignal,
  OutputEmitterRef,
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
import { ScrollSnapType } from '../services/scroll-snap-type';

@Component({
  standalone: true,
  selector: 'gallery-slider',
  template: `
    <div #slider
         class="g-slider"
         scrollSnapType
         [attr.centralised]="galleryRef.config().itemAutosize"
         [smoothScroll]="position()"
         sliderIntersectionObserver
         [sliderIntersectionObserverDisabled]="disableInteractionObserver()"
         [hammerSliding]="!galleryRef.config().disableMouseScroll"
         [adapter]="adapter()"
         [items]="items()"
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

      @if (galleryRef.config().debug) {
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
  imports: [GalleryItemComponent, SmoothScroll, HammerSliding, SliderIntersectionObserver, ItemIntersectionObserver, SliderResizeObserver, ScrollSnapType]
})
export class GallerySliderComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  /** Stream that emits the slider position */
  position: WritableSignal<SmoothScrollOptions> = signal(null);

  isScrolling: WritableSignal<boolean> = signal(false);
  isSliding: WritableSignal<boolean> = signal(false);
  isResizing: WritableSignal<boolean> = signal(false);

  disableInteractionObserver: Signal<boolean> = computed(() => {
    return this.isScrolling() || this.isSliding() || this.isResizing();
  });

  /** Gallery ID */
  galleryId: InputSignal<string> = input<string>();

  /** Slider ElementRef */
  sliderRef: Signal<ElementRef<HTMLElement>> = viewChild('slider');

  slider: Signal<HTMLElement> = computed(() => this.sliderRef().nativeElement);

  items: Signal<ReadonlyArray<GalleryItemComponent>> = viewChildren<GalleryItemComponent>(GalleryItemComponent);

  /** Slider adapter */
  adapter: Signal<SliderAdapter> = computed(() => {
    const config: GalleryConfig = this.galleryRef.config();
    return config.orientation === Orientation.Horizontal ?
      new HorizontalAdapter(this.slider(), config) :
      new VerticalAdapter(this.slider(), config);
  });

  /** Stream that emits when thumb is clicked */
  itemClick: OutputEmitterRef<number> = output<number>();

  /** Stream that emits when an error occurs */
  error: OutputEmitterRef<GalleryError> = output<GalleryError>();

  constructor() {
    effect(() => {
      const currIndex: number = this.galleryRef.currIndex();
      const behavior: ScrollBehavior = this.galleryRef.scrollBehavior()
      if (behavior) {
        // Scroll to index when current index changes
        untracked(() => {
          this.scrollToIndex(currIndex, behavior);
        });
      }
    });
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
      const pos: SmoothScrollOptions = this.adapter().getScrollToValue(el, behavior || this.galleryRef.config().scrollBehavior);
      this.position.set(pos);
    }
  }
}
