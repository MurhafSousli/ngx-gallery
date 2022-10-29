import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GalleryComponent } from './gallery.component';
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
         (click)="gallery.set(i)">
      <div class="g-dot-inner"></div>
    </div>
  `
})
export class GalleryDotsComponent {
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: GalleryComponent) {
  }
}
