import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../gallery';

@Component({
  selector: 'gallery-debug',
  template: `
      <div class="g-slider-debug">
          <div class="g-slider-resizing">RESIZING</div>
          <div class="g-slider-scrolling">SCROLLING</div>
          <div class="g-slider-sliding">SLIDING</div>
          <div class="g-slider-observed">CURRENT: {{ gallery.activeIndex() }}</div>
      </div>
  `,
  styleUrl: 'debug.scss',
  encapsulation: ViewEncapsulation.None
})
export class GalleryDebug {
  readonly gallery: Gallery = inject(Gallery);
}
