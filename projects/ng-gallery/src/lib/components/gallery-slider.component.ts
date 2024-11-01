import { Component, inject, output, OutputEmitterRef, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { GalleryRef } from '../services/gallery-ref';
import { SmoothScroll } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { IntersectionSensor } from '../observers/intersection-sensor.directive';
import { GalleryItemComponent } from './gallery-item.component';
import { ScrollSnapType } from '../services/scroll-snap-type';
import { ResizeSensor } from '../services/resize-sensor';
import { SliderComponent } from './slider/slider';

@Component({
  standalone: true,
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
          <gallery-item [data]="item"
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
    GalleryItemComponent,
    SliderComponent
  ]
})
export class GallerySliderComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  // TODO: Allow auto-height to access resize sensor
  resizeSensor = viewChild(ResizeSensor);

  /** Stream that emits when thumb is clicked */
  itemClick: OutputEmitterRef<number> = output<number>();
}
