import { Component, inject, computed, input, Signal, InputSignal, ChangeDetectionStrategy } from '@angular/core';
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
         (click)="galleryRef.prev(scrollBehavior())"
         [innerHtml]="navIcon()"></i>
    }
    @if (galleryRef.config().loop || galleryRef.hasNext()) {
      <i class="g-nav-next"
         aria-label="Next"
         role="button"
         (click)="galleryRef.next(scrollBehavior())"
         [innerHtml]="navIcon()"></i>
    }
  `,
  styleUrl: './gallery-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryNavComponent {

  private readonly _sanitizer: DomSanitizer = inject(DomSanitizer);

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  navIcon: Signal<SafeHtml> = computed(() =>
    this._sanitizer.bypassSecurityTrustHtml(this.galleryRef.config().navIcon)
  );

  scrollBehavior: InputSignal<ScrollBehavior> = input<ScrollBehavior>('smooth');

}
