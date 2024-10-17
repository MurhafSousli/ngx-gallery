import {
  Component,
  inject,
  output,
  input,
  viewChild,
  Signal,
  InputSignal,
  TemplateRef,
  OutputEmitterRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryError } from '../models/gallery.model';
import { Orientation } from '../models/constants';
import { SmoothScroll } from '../smooth-scroll';
import { GalleryThumbComponent } from './gallery-thumb.component';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { GalleryRef } from '../services/gallery-ref';
import { ResizeSensor } from '../services/resize-sensor';
import { ScrollSnapType } from '../services/scroll-snap-type';
import { IntersectionSensor } from '../observers/intersection-sensor.directive';
import { SliderComponent } from './slider/slider';

@Component({
  standalone: true,
  selector: 'gallery-thumbs',
  template: `
    <g-slider [orientation]="orientation()"
              [autoSize]="autosize()"
              [centralized]="centralized()"
              resizeSensor
              smoothScroll
              intersectionSensor
              hammerSliding
              scrollSnapType>
      <div class="g-slider-content">
        @for (item of galleryRef.items(); track item.data.src; let i = $index; let count = $count) {
          <gallery-thumb [type]="item.type"
                         [data]="item.data"
                         [visible]="!!galleryRef.visibleItems()[i]"
                         [currIndex]="galleryRef.currIndex()"
                         [index]="i"
                         [count]="count"
                         (click)="onThumbClick(i)"
                         (error)="error.emit({ itemIndex: i, error: $event })"/>
        }
      </div>
    </g-slider>
    <ng-content/>
  `,
  styleUrl: './gallery-thumbs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GalleryThumbComponent,
    SmoothScroll,
    HammerSliding,
    ResizeSensor,
    ScrollSnapType,
    IntersectionSensor,
    SliderComponent
  ]
})
export class GalleryThumbsComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef, { host: true, skipSelf: true });

  readonly orientation: InputSignal<Orientation> = input<Orientation>();

  readonly align: InputSignal<'start' | 'end'> = input<'start' | 'end'>();

  readonly autosize: InputSignal<boolean> = input<boolean>();

  readonly centralized: InputSignal<boolean> = input<boolean>();

  readonly disableThumbs: InputSignal<boolean> = input<boolean>();

  /** Stream that emits when thumb is clicked */
  thumbClick: OutputEmitterRef<number> = output<number>();

  /** Stream that emits when an error occurs */
  error: OutputEmitterRef<GalleryError> = output<GalleryError>();

  onThumbClick(index: number): void {
    if (this.disableThumbs()) return;

    this.galleryRef.set(index);
    this.thumbClick.emit(index)
  }
}
