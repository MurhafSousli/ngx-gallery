import { computed, Directive, inject, Signal } from '@angular/core';
import { Gallery } from '../gallery';
import { SliderItem } from '../slider-item/slider-item';
import { GalleryA11yOptions } from '../a11y/a11y.model';
import { GALLERY_A11Y_OPTIONS } from '../a11y/a11y.token';

@Directive({
  selector: '[galleryThumbClick]',
  host: {
    '[attr.role]': 'a11y?.thumbRole || null',
    '[attr.aria-roledescription]': 'a11y?.thumbRoleDescription || null',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-current]': 'ariaCurrent()',
    '(click)': 'gallery.goTo({ index: item.index() })'
  }
})
export class GalleryThumbClick {

  protected readonly gallery: Gallery = inject(Gallery);

  protected readonly item: SliderItem = inject(SliderItem);

  protected readonly a11y: GalleryA11yOptions = inject(GALLERY_A11Y_OPTIONS);

  protected readonly ariaLabel: Signal<string | null> = computed(() => {
    return this.a11y?.thumbLabel(this.item.index(), this.item.count()) || null;
  });

  protected readonly ariaCurrent: Signal<string | null> = computed(() => {
    return this.a11y && this.item.active() ? "true" : null
  });
}
