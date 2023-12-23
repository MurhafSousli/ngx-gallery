import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gallery } from '../services/gallery.service';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

@Component({
  selector: 'gallery-bullets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gallery-bullets.scss'],
  template: `
    <div class="g-bullet"
         *ngFor="let item of state.items; let i = index"
         [class.g-bullet-active]="i === state.currIndex"
         [style.width.px]="config?.bulletSize"
         [style.height.px]="config?.bulletSize"
         (click)="config.disableBullets ? null : gallery.ref(this.galleryId).set(i)">
      <div class="g-bullet-inner"></div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class GalleryBulletsComponent {

  @Input() galleryId: string;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery) {
  }
}
