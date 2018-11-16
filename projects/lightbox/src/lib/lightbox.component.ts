import { Component, HostBinding, HostListener, Optional, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subscription, SubscriptionLike } from 'rxjs';
import { lightboxAnimations } from './lightbox.animation';

@Component({
  selector: 'lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [lightboxAnimations.slideLightbox],
  styleUrls: ['./lightbox.component.scss'],
  template: `
    <gallery [id]="id" [destroyRef]="false" [skipInitConfig]="true">
      <i class="g-btn-close" aria-label="Close" (click)="overlayRef.detach()"
         [innerHTML]="sanitizer.bypassSecurityTrustHtml(closeIcon)"></i>
    </gallery>
  `,
  host: {
    'tabindex': '-1',
    'aria-modal': 'true',
    '[attr.id]': '"lightbox-" + id',
    '[attr.role]': 'role',
    '[attr.aria-labelledby]': 'ariaLabel ? null : ariaLabelledBy',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-describedby]': 'ariaDescribedBy || null',
})
export class LightboxComponent implements OnDestroy {

  /** Gallery ref id */
  id: string;

  /** Overlay ref to close the lightbox */
  overlayRef: OverlayRef;

  /** close button svg data */
  closeIcon: string;

  /** Subscription to changes in the user's location. */
  private _locationChange$: SubscriptionLike = Subscription.EMPTY;

  /** The ARIA role of the lightbox element. */
  role: string;

  /** Aria label to assign to the lightbox element */
  ariaLabel: string;

  /** ID of the element that should be considered as the lightbox's label. */
  ariaLabelledBy: string;

  /** ID of the element that describes the lightbox. */
  ariaDescribedBy: string;

  /** Dispose the overlay when exit animation is done */
  @HostListener('@slideLightbox.done', ['$event']) onExitAnimationDone(e) {
    if (e.toState === 'void') {
      this.overlayRef.dispose();
    }
  }

  constructor(public sanitizer: DomSanitizer, @Optional() location: Location) {
    // Close the Lightbox when the location changes
    if (location) {
      this._locationChange$ = location.subscribe(() => this.overlayRef.detach());
    }
  }

  ngOnDestroy() {
    this._locationChange$.unsubscribe();
  }

}
