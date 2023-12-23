import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gallery, GalleryItem, GalleryRef } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

@Component({
  selector: 'lightbox-example',
  template: `
    <div class="container">
      <img *ngFor="let item of items; index as i"
         class="grid-image"
         [src]="item.data.thumb"
         [lightbox]="i"
         [gallery]="galleryId"/>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      margin: 0 auto;
      padding: 20px;
      max-width: 768px;
    }
    img {
      height: 90px;
      width: 125px;
      object-fit: cover;
    }
  `],
  imports: [CommonModule, LightboxModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxExampleComponent implements OnInit, OnDestroy {

  galleryId: string = 'lightbox';

  galleryRef: GalleryRef;

  @Input() items: GalleryItem[];

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }

  ngOnInit(): void {
    this.galleryRef = this.gallery.ref('lightbox', {
      thumbPosition: 'top',
      imageSize: 'cover',
      autoHeight: false
    });

    this.galleryRef.load(this.items);
  }

  ngOnDestroy(): void {
    this.galleryRef.destroy();
  }
}
