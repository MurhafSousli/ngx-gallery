import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyComponent implements OnInit {

  items: GalleryItem[];

  imageData = [
    {
      srcUrl: 'assets/img1.jpg',
      previewUrl: 'assets/img1.jpg'
    },
    {
      srcUrl: 'assets/img2.jpg',
      previewUrl: 'assets/img2.jpg',
    },
    {
      srcUrl: 'assets/img3.jpg',
      previewUrl: 'assets/img3.jpg',
    },
    {
      srcUrl: 'assets/img4.jpg',
      previewUrl: 'assets/img4.jpg',
    }
  ];

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }

  ngOnInit() {

    this.items = this.imageData.map(item => {
      return new ImageItem({src: item.srcUrl, thumb: item.previewUrl});
    });

    // This is for Lightbox example
    this.gallery.ref('lightbox', {imageSize: 'cover', loadingStrategy: 'lazy', thumbPosition: 'top'}).load(this.items);
  }

  openLightbox() {
    this.lightbox.open(0, 'lightbox');
  }
}
