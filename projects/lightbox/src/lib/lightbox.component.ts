import { Component, HostBinding, HostListener, Optional, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Subscription, SubscriptionLike } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';
import { lightboxAnimations } from './lightbox.animation';

@Component({
  selector: 'lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [lightboxAnimations.slideLightbox],
  template: `
    <gallery [id]="id" [destroyRef]="false" [skipInitConfig]="true">
      <i class="g-btn-close" aria-label="Close" (click)="overlayRef.detach()"
         [innerHTML]="sanitizer.bypassSecurityTrustHtml(closeIcon)"></i>
    </gallery>
  `
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

  /** Use slide animation on opening and closing the lightbox */
  @HostBinding('@slideLightbox') slideAnimation;

  /** Dispose the overlay when exit animation is done */
  @HostListener('@slideLightbox.done', ['$event']) onMouseLeave(e) {
    if (e.toState === 'void') {
      this.overlayRef.dispose();
    }
  }

  constructor(public sanitizer: DomSanitizer, @Optional() location: Location) {
    // Close the Lightbox when the location changes
    this._locationChange$ = location.subscribe(() => this.overlayRef.detach());
  }

  ngOnDestroy() {
    this._locationChange$.unsubscribe();
  }

}
