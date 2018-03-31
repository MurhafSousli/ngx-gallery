import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryItemComponent } from '../models';
import { Gallery } from '../services/gallery.service';

@Component({
  selector: 'image-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div [lazyImage]="data?.src" (loading)="loading = $event"></div>
    <i class="g-loading" *ngIf="loading" [innerHTML]="sanitizer.bypassSecurityTrustHtml(gallery.config.loadingIcon)"></i>
  `,
  styles: [`
    :host {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
    div {
      background-position: center center;
      background-size: cover;
      width: 100%;
      height: 100%;
    }
  `],
})
export class ImageItemComponent implements GalleryItemComponent {
  loading: boolean;
  @Input() data: any;

  constructor(public gallery: Gallery, public sanitizer: DomSanitizer) {
  }
}
