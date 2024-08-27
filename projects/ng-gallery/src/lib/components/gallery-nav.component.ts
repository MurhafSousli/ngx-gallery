import { Component, Input, inject, computed, Signal, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from '../services/gallery-ref';
// import { Directionality } from '@angular/cdk/bidi';

@Component({
  standalone: true,
  selector: 'gallery-nav',
  template: `
    @if (config.loop || galleryRef.hasPrev()) {
      <i class="g-nav-prev"
         aria-label="Previous"
         role="button"
         (click)="galleryRef.prev(config.scrollBehavior)"
         [innerHtml]="navIcon()"></i>
    }
    @if (config.loop || galleryRef.hasNext()) {
      <i class="g-nav-next"
         aria-label="Next"
         role="button"
         (click)="galleryRef.next(config.scrollBehavior)"
         [innerHtml]="navIcon()"></i>
    }
  `,
  styleUrl: './gallery-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryNavComponent {

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  // dir: Directionality = inject(Directionality);

  galleryRef: GalleryRef = inject(GalleryRef);

  navIcon: Signal<SafeHtml> = computed(() => this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon));

  @Input() config: GalleryConfig;
}
