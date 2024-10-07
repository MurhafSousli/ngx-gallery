import {
  Component,
  inject,
  signal,
  output,
  viewChildren,
  viewChild,
  Signal,
  WritableSignal,
  OutputEmitterRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryError } from '../models/gallery.model';
import { SmoothScroll, SmoothScrollOptions } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SliderIntersectionObserver } from '../observers/slider-intersection-observer.directive';
import { GalleryItemComponent } from './gallery-item.component';
import { GalleryRef } from '../services/gallery-ref';
import { ScrollSnapType } from '../services/scroll-snap-type';
import { ResizeSensor } from '../services/resize-sensor';
import { Adapter } from './adapters/adapter';

@Component({
  standalone: true,
  selector: 'gallery-slider',
  template: `
    <div adapter
         class="g-slider"
         resizeSensor
         scrollSnapType
         smoothScroll
         sliderIntersectionObserver
         hammerSliding
         [attr.centralised]="galleryRef.config().centralized"
         [items]="items()">
      <div class="g-slider-content">
        @for (item of galleryRef.items(); track item.data.src; let i = $index; let count = $count) {
          <gallery-item [type]="item.type"
                        [data]="item.data"
                        [currIndex]="galleryRef.currIndex()"
                        [index]="i"
                        [count]="count"
                        (click)="itemClick.emit(i)"
                        (error)="error.emit({ itemIndex: i, error: $event })"/>
        }
      </div>

      @if (galleryRef.config().debug) {
        <div class="g-slider-debug">
          <div class="g-slider-resizing">RESIZING</div>
          <div class="g-slider-scrolling">SCROLLING</div>
          <div class="g-slider-sliding">SLIDING</div>
          <div class="g-slider-observed">CURRENT: {{ galleryRef.currIndex() }}</div>
        </div>
      }
    </div>
    <ng-content/>
  `,
  styleUrl: './gallery-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ResizeSensor,
    GalleryItemComponent,
    SmoothScroll,
    HammerSliding,
    SliderIntersectionObserver,
    ScrollSnapType,
    Adapter
  ]
})
export class GallerySliderComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly adapter: Signal<Adapter> = viewChild(Adapter);

  /** Stream that emits the slider position */
  readonly position: WritableSignal<SmoothScrollOptions> = signal(null);

  readonly items: Signal<ReadonlyArray<GalleryItemComponent>> = viewChildren<GalleryItemComponent>(GalleryItemComponent);

  /** Stream that emits when thumb is clicked */
  itemClick: OutputEmitterRef<number> = output<number>();

  /** Stream that emits when an error occurs */
  error: OutputEmitterRef<GalleryError> = output<GalleryError>();
}
