import { Component, Optional, Inject, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { AnimationEvent } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import { ConfigurableFocusTrap, ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { lightboxAnimation } from './lightbox.animation';
import { GalleryComponent } from '../../src/lib/components/gallery.component';

@Component({
  selector: 'lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [lightboxAnimation],
  styleUrls: ['./lightbox.component.scss'],
  template: `
    <i class="g-btn-close" aria-label="Close" [innerHTML]="closeIcon" (click)="overlayRef.detach()"></i>
    <gallery [id]="id" [destroyRef]="false" [skipInitConfig]="true"></gallery>
  `,
  host: {
    'tabindex': '-1',
    'aria-modal': 'true',
    '[attr.id]': '"lightbox-" + id',
    '[attr.role]': 'role',
    '[attr.aria-labelledby]': 'ariaLabel ? null : ariaLabelledBy',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-describedby]': 'ariaDescribedBy || null',
    '[@lightbox]': '{ value: state, params: { startAnimationTime: startAnimationTime, exitAnimationTime: exitAnimationTime } }',
    '(@lightbox.done)': 'onAnimationDone($event)',
  },
  standalone: true,
  imports: [GalleryComponent]
})
export class LightboxComponent {

  /** Gallery ref id */
  id: string;

  /** Overlay ref to close the lightbox */
  overlayRef: OverlayRef;

  /** Close button svg data */
  closeIcon: SafeHtml;

  /** State of the lightbox animation. */
  state: 'void' | 'enter' | 'exit' = 'enter';

  /** The ARIA role of the lightbox element. */
  role: string;

  /** Aria label to assign to the lightbox element */
  ariaLabel: string;

  /** ID of the element that should be considered as the lightbox's label. */
  ariaLabelledBy: string;

  /** ID of the element that describes the lightbox. */
  ariaDescribedBy: string;

  /** The lightbox start animation time in ms */
  startAnimationTime: number;

  /** The lightbox exit animation time in ms */
  exitAnimationTime: number;

  /** The class that traps and manages focus within the lightbox. */
  private _focusTrap: ConfigurableFocusTrap;

  /** Element that was focused before the lightbox was opened. Save this to restore upon close. */
  private _elementFocusedBeforeDialogWasOpened: HTMLElement;

  constructor(@Optional() @Inject(DOCUMENT) private _document: any,
              private _focusTrapFactory: ConfigurableFocusTrapFactory,
              private _elementRef: ElementRef) {
    this._savePreviouslyFocusedElement();
  }

  /** Callback, invoked whenever an animation on the host completes. */
  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'enter') {
      this._trapFocus();
    } else {
      this.overlayRef.dispose();
      this._restoreFocus();
    }
  }

  /** Moves the focus inside the focus trap. */
  private _trapFocus() {
    if (!this._focusTrap) {
      this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
    }
    // If were to attempt to focus immediately, then the content of the lightbox would not yet be
    // ready in instances where change detection has to run first. To deal with this, we simply
    // wait for the microtask queue to be empty.
    this._focusTrap.focusInitialElementWhenReady();
  }

  /** Saves a reference to the element that was focused before the lightbox was opened. */
  private _savePreviouslyFocusedElement() {
    if (this._document) {
      this._elementFocusedBeforeDialogWasOpened = this._document.activeElement as HTMLElement;

      // Note that there is no focus method when rendering on the server.
      if (this._elementRef.nativeElement.focus) {
        // Move focus onto the lightbox immediately in order to prevent the user from accidentally
        // opening multiple dialogs at the same time. Needs to be async, because the element
        // may not be focusable immediately.
        Promise.resolve().then(() => this._elementRef.nativeElement.focus());
      }
    }
  }

  /** Restores focus to the element that was focused before the lightbox opened. */
  private _restoreFocus() {
    const toFocus = this._elementFocusedBeforeDialogWasOpened;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      toFocus.focus();
    }

    if (this._focusTrap) {
      this._focusTrap.destroy();
    }
  }
}
