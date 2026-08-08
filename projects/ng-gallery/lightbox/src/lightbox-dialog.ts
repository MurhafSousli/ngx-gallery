import { Component, inject, Injector, OnDestroy, ElementRef, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LightboxCloseButton } from './lightbox-close-button';
import { LIGHTBOX_DIALOG, LightboxRef, DialogClosePolicy } from './lightbox.model';
import { DIALOG_CLOSEDBY_SUPPORTED } from './lightbox-closedby.token';

@Component({
  host: {
    '[class]': 'class || null',
    '[attr.aria-label]': '!ariaLabelledBy ? ariaLabel : null',
    '[attr.aria-labelledby]': 'ariaLabelledBy || null',
    '[attr.closedby]': 'closedBy',
    '[attr.animationDisabled]': 'disableAnimation ? "" : null'
  },
  selector: 'dialog[lightbox]',
  template: `
    <ng-container *ngTemplateOutlet="templateRef; injector: injector"/>

    <!-- The default close button must be placed under the template outlet to avoid setting hasCustomCloseButton after the default button is initialized -->
    @if (!hideCloseButton && !hasCustomCloseButton) {
      <button lightboxCloseButton defaultCloseButton>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    }
  `,
  providers: [
    { provide: LIGHTBOX_DIALOG, useExisting: LightboxDialog }
  ],
  styleUrls: ['../../variables.scss', 'lightbox-dialog.scss'],
  imports: [NgTemplateOutlet, LightboxCloseButton]
})
export class LightboxDialog implements LightboxRef, OnDestroy {

  private readonly isClosedBySupported: boolean = inject(DIALOG_CLOSEDBY_SUPPORTED);

  readonly injector: Injector = inject(Injector);

  readonly dialogElement: HTMLDialogElement = inject(ElementRef<HTMLDialogElement>).nativeElement;

  closedBy: DialogClosePolicy;

  hideCloseButton: boolean;

  hasCustomCloseButton: boolean;

  disableAnimation: boolean;

  class: string | string[];

  ariaLabelledBy: string;

  ariaLabel: string;

  templateRef: TemplateRef<any>;

  private readonly destroyer: AbortController = new AbortController();

  constructor() {
    if (!this.isClosedBySupported) {
      let mouseDownTarget: EventTarget;

      // Track where the press starts
      this.dialogElement.addEventListener('mousedown', (e) => {
        mouseDownTarget = e.target;
      }, { signal: this.destroyer.signal });

      this.dialogElement.addEventListener('click', (e: PointerEvent) => {
        // Only respond to the primary (left) button
        if (this.closedBy !== 'any') return;

        if (e.target === e.currentTarget && mouseDownTarget === e.currentTarget) {
          const rect: DOMRect = this.dialogElement.getBoundingClientRect();

          const inside: boolean =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;

          if (!inside) {
            this.dialogElement.close();
          }
        }
      }, { signal: this.destroyer.signal });
    }
  }

  ngOnDestroy(): void {
    this.destroyer.abort();
  }
}
