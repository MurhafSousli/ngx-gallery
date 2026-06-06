import { Directive, inject } from '@angular/core';
import { SliderItem } from '../slider-item/slider-item';

/**
 * A directive used to register an img element and track the loading state
 */
@Directive({
  selector: 'img[galleryImage]',
  host: {
    '[class.g-image]': 'true',
    '(load)': 'item.state.set("ready")',
    '(error)': 'item.state.set("error")'
  }
})
export class GalleryImage {

  readonly item: SliderItem = inject(SliderItem);

  constructor() {
    if (this.item) {
      // Mark the gallery-item component as an image item
      this.item.containsImage = true;
    } else {
      console.error('[NgGallery]: galleryImage directive should be only used inside gallery item templates!');
      return;
    }
  }
}
