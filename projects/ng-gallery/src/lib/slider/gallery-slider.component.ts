import {
  Component,
  inject,
  output,
  input,
  viewChild,
  InputSignal,
  TemplateRef,
  OutputEmitterRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryRef } from '../services/gallery-ref';
import { SmoothScroll } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { IntersectionSensor } from '../observers/intersection-sensor.directive';
import { SliderItem } from './slider-item/slider-item';
import { ScrollSnapType } from '../services/scroll-snap-type';
import { ResizeSensor } from '../services/resize-sensor';
import { SliderComponent } from './slider/slider';
import { GalleryItemContext } from '../directives/gallery-item-def.directive';
import { GalleryItemData } from '../templates/items.model';

@Component({
  selector: 'gallery-slider',
  template: `
    <g-slider [orientation]="galleryRef.config().orientation"
              [autosize]="galleryRef.config().itemAutosize"
              [centralized]="galleryRef.config().centralized"
              resizeSensor
              smoothScroll
              intersectionSensor
              hammerSliding
              scrollSnapType>
      <div class="g-slider-content">
        @for (item of galleryRef.items(); track i; let i = $index; let count = $count) {
          <slider-item [data]="item"
                       [template]="template()"
                       [currIndex]="galleryRef.currIndex()"
                       [index]="i"
                       [count]="count"
                       (click)="itemClick.emit(i)"/>
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
    </g-slider>
    <ng-content/>
  `,
  styleUrl: './gallery-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ResizeSensor,
    IntersectionSensor,
    SmoothScroll,
    HammerSliding,
    ScrollSnapType,
    SliderItem,
    SliderComponent
  ]
})
export class GallerySliderComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  // TODO: Allow auto-height to access resize sensor
  resizeSensor = viewChild(ResizeSensor);

  template: InputSignal<TemplateRef<GalleryItemContext<GalleryItemData>>> = input<TemplateRef<GalleryItemContext<GalleryItemData>>>();

  /** Stream that emits when thumb is clicked */
  itemClick: OutputEmitterRef<number> = output<number>();
}
