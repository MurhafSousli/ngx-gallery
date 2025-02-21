import {
  Component,
  inject,
  computed,
  numberAttribute,
  booleanAttribute,
  input,
  Signal,
  InputSignal,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { Orientation } from '../models/constants';
import { SmoothScroll } from '../smooth-scroll';
import { GalleryThumbComponent } from './gallery-thumb.component';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { GalleryRef } from '../services/gallery-ref';
import { ResizeSensor } from '../services/resize-sensor';
import { ScrollSnapType } from '../services/scroll-snap-type';
// import { IntersectionSensor } from '../observers/intersection-sensor.directive';
import { SliderComponent } from './slider/slider';

@Component({
  host: {
    '[attr.autosize]': 'autosize()',
    '[attr.disabled]': 'disabled()',
    '[attr.scrollDisabled]': 'disableScroll()',
    '[attr.imageSize]': 'imageSize()',
    '[attr.position]': 'position()',
    '[style.grid-area]': 'position()',
    '[style.--g-thumb-width.px]': 'thumbWidth()',
    '[style.--g-thumb-height.px]': 'thumbHeight()'
  },
  selector: 'gallery-thumbs',
  template: `
    <g-slider [orientation]="orientation()"
              [autosize]="autosize()"
              [centralized]="centralized()"
              isThumbs
              resizeSensor
              [smoothScroll]="detach()"
              hammerSliding
              scrollSnapType>
      <div class="g-slider-content">
        @for (item of galleryRef.items(); track i; let i = $index; let count = $count) {
          <gallery-thumb [data]="item"
                         [currIndex]="galleryRef.currIndex()"
                         [index]="i"
                         [count]="count"
                         (click)="disabled() || galleryRef.set(i)"/>
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
    // IntersectionSensor,
    SliderComponent
  ]
})
export class GalleryThumbsComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef, { host: true, skipSelf: true });

  // readonly align: InputSignal<'start' | 'end'> = input<'start' | 'end'>();

  /**
   * Fits each thumbnail size to its content
   */
  readonly autosize: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * Centralize active thumb
   */
  readonly centralized: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * Disables thumbnails' clicks
   */
  readonly disabled: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding of thumbnails using touchpad, scroll and gestures on touch devices
   */
  disableScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding of thumbnails using the mouse
   */
  disableMouseScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * De-attaching the thumbnails from the main slider
   * If enabled - thumbnails won't automatically scroll to the active thumbnails
   */
  detach: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * TODO: Rename this to align and add start and end options to work with RTL
   * Sets the thumbnails position, it also sets the sliding direction of the thumbnails accordingly
   */
  position: InputSignal<'top' | 'left' | 'right' | 'bottom'> = input<'top' | 'left' | 'right' | 'bottom'>('bottom');

  /**
   * Sets the object-fit style applied on items' images
   */
  imageSize: InputSignal<'cover' | 'contain'> = input<'cover' | 'contain'>('cover');

  /**
   * Sets the thumbnail's width
   */
  thumbWidth: InputSignalWithTransform<number, string | number> = input<number, string | number>(120, {
    transform: numberAttribute
  });

  /**
   * Sets the thumbnail's height
   */
  thumbHeight: InputSignalWithTransform<number, string | number> = input<number, string | number>(90, {
    transform: numberAttribute
  });

  readonly orientation: Signal<Orientation> = computed(() => {
    return (this.position() === 'top' || this.position() === 'bottom') ? Orientation.Horizontal : Orientation.Vertical;
  });

}
