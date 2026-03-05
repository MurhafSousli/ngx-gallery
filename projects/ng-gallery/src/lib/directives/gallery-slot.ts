import { Directive, input, InputSignal, InputSignalWithTransform } from '@angular/core';
import { GalleryAlign, GalleryPosition } from '../models/config.model';


@Directive({
  selector: '[gallerySlot]',
  host: {
    '[style.z-index]': '3',
    '[style.grid-area]': 'position()',
    '[style.align-self]': 'align()',
    '[style.justify-self]': 'justify()',
  }
})
export class GallerySlot {

  /**
   * Defines the docking position of the slot inside the gallery grid.
   * - 'center' (default): slot floats over the main slider.
   */
  readonly position: InputSignalWithTransform<GalleryPosition, GalleryPosition | ''> = input<GalleryPosition, GalleryPosition | ''>('center', {
    alias: 'gallerySlot',
    transform: (value: GalleryPosition | '') => !value ? 'center' : value
  });

  /**
   * Controls main-axis justification within the selected area.
   */
  readonly justify: InputSignal<GalleryAlign> = input<GalleryAlign>('center', {
    alias: 'gallerySlotJustify'
  });

  /**
   * Controls cross-axis alignment within the selected area.
   */
  readonly align: InputSignal<GalleryAlign> = input<GalleryAlign>('center', {
    alias: 'gallerySlotAlign'
  });
}

