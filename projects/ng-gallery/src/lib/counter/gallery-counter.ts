import {
  Component,
  inject,
  input,
  computed,
  Signal,
  InputSignal,
  ChangeDetectionStrategy
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Gallery } from '../gallery';
import { GalleryOptions, GalleryCounterPosition } from '../models/config.model';
import { GALLERY_OPTIONS } from '../models/gallery.token';

@Component({
  selector: 'gallery-counter',
  host: {
    '[class.g-panel]': 'true',
    '[class.g-counter]': 'true',
    '[attr.align]': 'align()'
  },
  template: `{{ text() }}`,
  styleUrl: 'gallery-counter.scss',
  providers: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCounter {

  private readonly defaultConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  private readonly gallery: Gallery = inject(Gallery);

  private readonly decimalPipe: DecimalPipe = inject(DecimalPipe);

  /**
   * Sets the vertical position of the counter-overlay.
   */
  readonly align: InputSignal<GalleryCounterPosition> = input<GalleryCounterPosition>(this.defaultConfig.counterAlign);

  protected readonly text: Signal<string> = computed(() => {
    const totalCount = this.gallery.itemsCount();
    const activeIndex = totalCount ? this.gallery.activeIndex() + 1 : 0;
    const active = this.decimalPipe.transform(activeIndex) ?? String(activeIndex);
    const total = this.decimalPipe.transform(totalCount) ?? String(totalCount);
    return this.defaultConfig.counterText(active, total);
  });
}
