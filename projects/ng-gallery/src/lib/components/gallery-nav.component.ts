import { Component, inject, computed, Signal, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  standalone: true,
  selector: 'gallery-nav',
  template: `
    @if (galleryRef.config().loop || galleryRef.hasPrev()) {
      <i class="g-nav-prev"
         aria-label="Previous"
         role="button"
         (click)="galleryRef.prev(galleryRef.config().scrollBehavior)"
         [innerHtml]="navIcon()"></i>
    }
    @if (galleryRef.config().loop || galleryRef.hasNext()) {
      <i class="g-nav-next"
         aria-label="Next"
         role="button"
         (click)="galleryRef.next(galleryRef.config().scrollBehavior)"
         [innerHtml]="navIcon()"></i>
    }
  `,
  styleUrl: './gallery-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryNavComponent {

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  galleryRef: GalleryRef = inject(GalleryRef);

  navIcon: Signal<SafeHtml> = computed(() =>
    this._sanitizer.bypassSecurityTrustHtml(this.galleryRef.config().navIcon)
  );

}
