import { Component, inject, computed, input, Signal, InputSignal, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GalleryRef } from '../services/gallery-ref';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  standalone: true,
  host: {
    '[attr.dir]': 'dir.value'
  },
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

  readonly dir: Directionality = inject(Directionality);

  private readonly _sanitizer: DomSanitizer = inject(DomSanitizer);

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly navIcon: Signal<SafeHtml> = computed(() =>
    this._sanitizer.bypassSecurityTrustHtml(this.galleryRef.config().navIcon)
  );

  readonly scrollBehavior: InputSignal<ScrollBehavior> = input<ScrollBehavior>('smooth');

}
