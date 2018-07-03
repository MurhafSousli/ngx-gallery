import { Component, HostBinding, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { OverlayRef } from '@angular/cdk/overlay';
import { filter, tap, take } from 'rxjs/operators';
import { lightboxAnimations } from './lightbox.animation';

@Component({
  selector: 'lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [lightboxAnimations.slideLightbox],
  template: `
    <gallery [id]="id" [destroyRef]="false" [skipInitConfig]="true">
      <button class="g-btn-close" aria-label="Close" (click)="overlayRef.detach()"
              [innerHTML]="sanitizer.bypassSecurityTrustHtml(closeIcon)"></button>
    </gallery>
  `
})
export class LightboxComponent {

  /** Gallery ref id */
  id: string;

  /** Overlay ref to close the lightbox */
  overlayRef: OverlayRef;

  /** close button svg data */
  closeIcon: string;

  /** Use slide animation on opening and closing the lightbox */
  @HostBinding('@slideLightbox') slideAnimation;

  /** Dispose the overlay when exit animation is done */
  @HostListener('@slideLightbox.done', ['$event']) onMouseLeave(e) {
    if (e.toState === 'void') {
      this.overlayRef.dispose();
    }
  }

  constructor(public sanitizer: DomSanitizer, router: Router) {
    // Close the lightbox if the current route has changed
    router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.overlayRef.detach()),
      take(1)
    ).subscribe();
  }

}
