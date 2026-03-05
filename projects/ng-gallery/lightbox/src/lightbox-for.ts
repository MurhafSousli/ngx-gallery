import { Directive, input, inject, InputSignal } from '@angular/core';
import { Gallery } from 'ng-gallery';
import { Lightbox } from './lightbox';

@Directive({
  selector: '[lightboxFor]',
  host: {
    '(click)': 'lightboxFor().showModal(gallery?.activeIndex() ?? lightboxIndex())'
  }
})
export class LightboxFor {

  readonly gallery: Gallery = inject(Gallery, { optional: true });

  readonly lightboxFor: InputSignal<Lightbox> = input.required<Lightbox>();

  readonly lightboxIndex: InputSignal<number> = input<number>(0);

}
