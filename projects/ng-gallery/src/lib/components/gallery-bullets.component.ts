import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  standalone: true,
  selector: 'gallery-bullets',
  template: `
    @for (item of galleryRef.items(); track item.data.src; let i = $index) {
      <div class="g-bullet"
           [class.g-bullet-active]="i === galleryRef.currIndex()"
           [style.width.px]="galleryRef.config()?.bulletSize"
           [style.height.px]="galleryRef.config()?.bulletSize"
           (click)="galleryRef.config().disableBullets ? null : galleryRef.set(i)">
        <div class="g-bullet-inner"></div>
      </div>
    }
  `,
  styleUrl: './gallery-bullets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryBulletsComponent {
  readonly galleryRef: GalleryRef = inject(GalleryRef);
}
