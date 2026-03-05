import { Attribute, Directive, inject, input, InputSignal } from '@angular/core';
import { GALLERY_A11Y_OPTIONS, GalleryA11yOptions } from 'ng-gallery';
import { LIGHTBOX_DIALOG, LightboxRef } from './lightbox.model';

@Directive({
  selector: '[lightboxCloseButton]',
  host: {
    '[class.g-panel]': 'true',
    '[class.g-button]': 'true',
    '[class.g-close-button]': 'true',
    '[attr.aria-label]': 'ariaLabel()',
    '(click)': 'dialog.dialogElement.close()'
  }
})
export class LightboxCloseButton {

  protected readonly dialog: LightboxRef = inject(LIGHTBOX_DIALOG);

  private readonly defaultA11yOptions: GalleryA11yOptions = inject(GALLERY_A11Y_OPTIONS);

  readonly ariaLabel: InputSignal<string> = input<string>(this.defaultA11yOptions.lightboxCloseButtonLabel, { alias: 'aria-label' });

  constructor(@Attribute('defaultCloseButton') defaultCloseButton: string) {
    this.dialog.hasCustomCloseButton = defaultCloseButton === null;
  }
}
