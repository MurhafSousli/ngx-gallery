import { Directive, inject, input, computed, Signal, InputSignal } from '@angular/core';
import { GalleryRef } from '../gallery-ref';
import { GalleryA11yOptions } from '../a11y/a11y.model';
import { GALLERY_A11Y_OPTIONS } from '../a11y/a11y.token';

@Directive({
  selector: 'button[galleryNavButton]',
  host: {
    type: 'button',
    '[class.g-nav-button]': 'true',
    '[class.g-nav-prev]': 'type() === "prev"',
    '[class.g-nav-next]': 'type() === "next"',
    '[attr.aria-label]': 'ariaLabel()',
    '[disabled]': 'isDisabled()',
    '(click)': 'type() === "next" ? galleryRef.next() : galleryRef.prev()'
  }
})
export class GalleryNavButton {

  protected readonly galleryRef: GalleryRef = inject(GalleryRef);

  protected readonly a11y: GalleryA11yOptions = inject(GALLERY_A11Y_OPTIONS);

  /**
   * Determines the navigation direction of the button.
   */
  readonly type: InputSignal<string | null> = input.required<'next' | 'prev'>({ alias: 'galleryNavButton' });

  /** @ignore */
  readonly userDisabled: InputSignal<boolean> = input<boolean>(false, { alias: 'disabled' });

  protected readonly ariaLabel: Signal<string> = computed(() => {
    if (!this.a11y) return null;
    if (this.type() === 'next') {
      const steps: number | 'page' = this.galleryRef.steps();
      const itemsPerView: number = this.galleryRef.itemsPerView();
      if (this.galleryRef.getNextNavigationIndex(steps === 'page' ? itemsPerView : steps) === this.galleryRef.itemsCount() - 1) {
        if (this.galleryRef.loop() && !this.galleryRef.hasNext()) {
          return this.a11y.firstItemLabel;
        }
        return this.a11y.lastItemLabel;
      }
      return this.a11y.nextItemLabel;
    } else {
      const steps: number | 'page' = this.galleryRef.steps();
      const itemsPerView: number = this.galleryRef.itemsPerView();
      if (this.galleryRef.getPrevNavigationIndex(steps === 'page' ? itemsPerView : steps) === 0) {
        if (this.galleryRef.loop() && !this.galleryRef.hasPrev()) {
          return this.a11y.lastItemLabel;
        }
        return this.a11y.firstItemLabel;
      }
      return this.a11y.prevItemLabel;
    }
  });

  protected readonly isDisabled: Signal<boolean> = computed(() => {
    if (this.userDisabled()) return true;
    if (this.galleryRef.loop()) return false;
    return this.type() === 'next'
      ? !this.galleryRef.hasNext()
      : !this.galleryRef.hasPrev();
  });

}
