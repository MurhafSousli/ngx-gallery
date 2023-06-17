import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgFor } from '@angular/common';
import { Gallery } from '../services/gallery.service';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

@Component({
  selector: 'gallery-dots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="g-dot"
         *ngFor="let item of state.items; let i = index"
         [class.g-dot-active]="i === state.currIndex"
         [style.width.px]="config?.dotsSize"
         [style.height.px]="config?.dotsSize"
         (click)="gallery.ref(this.galleryId).set(i)">
      <div class="g-dot-inner"></div>
    </div>
  `,
  standalone: true,
  imports: [NgFor]
})
export class GalleryDotsComponent {
  @Input() galleryId: string;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery) {
  }
}
