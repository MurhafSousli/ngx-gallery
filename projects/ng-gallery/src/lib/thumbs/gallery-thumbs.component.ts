import {
  Component,
  inject,
  computed,
  numberAttribute,
  booleanAttribute,
  input,
  contentChild,
  Signal,
  InputSignal,
  TemplateRef,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { SmoothScroll } from '../smooth-scroll';
import { Orientation } from '../models/constants';
import { GalleryRef } from '../services/gallery-ref';
import { ResizeSensor } from '../services/resize-sensor';
import { SliderComponent } from '../slider/slider/slider';
import { ScrollSnapType } from '../services/scroll-snap-type';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SliderItem } from '../slider/slider-item/slider-item';
import { GalleryItemContext, GalleryItemDef } from '../directives/gallery-item-def.directive';
import { GalleryItemData } from '../templates/items.model';
// import { IntersectionSensor } from '../observers/intersection-sensor.directive';

@Component({
  host: {
    '[attr.autosize]': 'autosize()',
    '[attr.disabled]': 'disabled()',
    '[attr.scrollDisabled]': 'disableScroll()',
    '[attr.imageSize]': 'imageSize()',
    '[attr.position]': 'position()',
    '[style.grid-area]': 'position()',
    // '[style.--g-thumb-width.px]': 'thumbWidth()',
    // '[style.--g-thumb-height.px]': 'thumbHeight()',
    '[style.--g-item-width.px]': 'thumbWidth()',
    '[style.--g-item-height.px]': 'thumbHeight()'
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
          <slider-item [data]="item"
                       [template]="template()"
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
    // IntersectionSensor,
    SmoothScroll,
    HammerSliding,
    ResizeSensor,
    ScrollSnapType,
    SliderComponent,
    SliderItem
  ]
})
export class GalleryThumbsComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  // readonly align: InputSignal<'start' | 'end'> = input<'start' | 'end'>();

  /**
   * Fits each thumbnail size to its content
   */
  autosize: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * Centralize active thumb
   */
  centralized: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * Disables thumbnails' clicks
   */
  disabled: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
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

  orientation: Signal<Orientation> = computed(() => {
    return (this.position() === 'top' || this.position() === 'bottom') ? Orientation.Horizontal : Orientation.Vertical;
  });

  /** @ignore */
  private itemDef: Signal<GalleryItemDef> = contentChild(GalleryItemDef);

  template: Signal<TemplateRef<GalleryItemContext<GalleryItemData>>> = computed(() => this.itemDef()?.templateRef)
}
