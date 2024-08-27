import { Component, Input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  standalone: true,
  selector: 'gallery-bullets',
  template: `
    @for (item of galleryRef.items(); track item.data.src; let i = $index) {
      <div class="g-bullet"
           [class.g-bullet-active]="i === galleryRef.currIndex()"
           [style.width.px]="config?.bulletSize"
           [style.height.px]="config?.bulletSize"
           (click)="config.disableBullets ? null : galleryRef.set(i)">
        <div class="g-bullet-inner"></div>
      </div>
    }
  `,
  styleUrl: './gallery-bullets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class GalleryBulletsComponent {

  galleryRef: GalleryRef = inject(GalleryRef);

  @Input() config: GalleryConfig;

}
