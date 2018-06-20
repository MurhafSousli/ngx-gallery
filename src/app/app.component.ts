import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Gallery, GalleryItem, GalleryRef, ImageItem } from './core/public_api';
import { Gallery, GalleryItem, GalleryRef, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  items: GalleryItem[];

  imageData = [
    {
      srcUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      previewUrl: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
      srcUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      previewUrl: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    },
    {
      srcUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg',
      previewUrl: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    },
    {
      srcUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg',
      previewUrl: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    }
  ];

  constructor(public gallery: Gallery
    , public lightbox: Lightbox
  ) {

  }

  ngOnInit() {
    // This is for Basic example
    const galleryRef: GalleryRef = this.gallery.ref('basic-test');

    galleryRef.state$.subscribe(res => console.log(res));
    // this.items = this.imageData.map(item => {
    this.imageData.map(item => {
      // return new ImageItem(item.srcUrl, item.previewUrl);
      galleryRef.addImage(item.srcUrl, item.previewUrl);
    });

    // This is for Lightbox example
    this.gallery.ref('lightbox').load(galleryRef.state.items);
  }

  openLightbox() {
    this.lightbox.open(0, 'lightbox');
  }
}

