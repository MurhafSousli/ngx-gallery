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
import { GalleryConfig } from '../models/config.model';
import { GalleryError } from '../models/gallery.model';
import { ThumbnailsPosition } from '../models/constants';
import { VerticalAdapter, HorizontalAdapter, SliderAdapter } from './adapters';
import { SmoothScroll, SmoothScrollOptions } from '../smooth-scroll';
import { GalleryThumbComponent } from './gallery-thumb.component';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { ThumbResizeObserver } from '../observers/thumb-resize-observer.directive';
import { GalleryRef } from '../services/gallery-ref';
import { ResizeSensor } from '../services/resize-sensor';
import { SliderCentraliser } from '../services/slider-centraliser';
import { ScrollSnapType } from '../services/scroll-snap-type';

@Component({
  standalone: true,
  selector: 'gallery-thumbs',
  template: `
    <div #slider
         class="g-slider"
         [smoothScroll]="position()"
         [attr.centralised]="galleryRef.config().thumbCentralized || adapter().isContentLessThanContainer"
         [hammerSliding]="!galleryRef.config().disableThumbMouseScroll"
         [galleryId]="galleryId()"
         [items]="items()"
         [adapter]="adapter()"
         (resizeSensor)="scrollToIndex(galleryRef.currIndex(), 'auto')"
         sliderCentralizer
         (activeIndexChange)="onActiveIndexChange($event)">
      <div class="g-slider-content">
        @for (item of galleryRef.items(); track item.data.src; let i = $index; let count = $count) {
          <gallery-thumb [attr.galleryId]="galleryId"
                         [type]="item.type"
                         [data]="item.data"
                         [currIndex]="galleryRef.currIndex()"
                         [index]="i"
                         [count]="count"
                         (click)="galleryRef.config().disableThumbs ? null : thumbClick.emit(i)"
                         (error)="error.emit({ itemIndex: i, error: $event })"/>
        }
      </div>
    </div>
  `,
  styleUrl: './gallery-thumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GalleryThumbComponent,
    SmoothScroll,
    HammerSliding,
    ThumbResizeObserver,
    ResizeSensor,
    SliderCentraliser,
    ScrollSnapType
  ]
})
export class GalleryThumbsComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  /** Gallery ID */
  galleryId: InputSignal<string> = input<string>();

  /** Slider ElementRef */
  sliderRef: Signal<ElementRef<HTMLElement>> = viewChild('slider');

  slider: Signal<HTMLElement> = computed(() => this.sliderRef().nativeElement);

  /** Stream that emits the slider position */
  position: WritableSignal<SmoothScrollOptions> = signal(null);

  items: Signal<ReadonlyArray<GalleryThumbComponent>> = viewChildren<GalleryThumbComponent>(GalleryThumbComponent);

  /** Slider adapter */
  adapter: Signal<SliderAdapter> = computed(() => {
    const config: GalleryConfig = this.galleryRef.config();
    switch (config.thumbPosition) {
      case ThumbnailsPosition.Right:
      case ThumbnailsPosition.Left:
        return new VerticalAdapter(this.slider(), config);
      case ThumbnailsPosition.Top:
      case ThumbnailsPosition.Bottom:
        return new HorizontalAdapter(this.slider(), config);
    }
  });

  /** Stream that emits when thumb is clicked */
  thumbClick: OutputEmitterRef<number> = output<number>();

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
      this.scrollToIndex(index, 'smooth');
    }
  }

  scrollToIndex(index: number, behavior: ScrollBehavior): void {
    const el: HTMLElement = this.items()[index]?.nativeElement;
    if (el) {
      const pos: SmoothScrollOptions = this.adapter().getScrollToValue(el, behavior || this.galleryRef.config().scrollBehavior);
      this.position.set(pos);
    }
  }
}
