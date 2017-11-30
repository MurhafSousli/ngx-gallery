import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from 'ng-gallery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(public gallery: Gallery) {

  }

  open() {
    this.gallery.open();
  }

  ngOnInit() {
    setTimeout(() => {

      const images: GalleryItem[] = [
        {
          src: 'assets/img1.jpg',
          thumbnail: 'assets/img1.jpg'
        },
        {
          src: 'assets/img2.jpg',
          thumbnail: 'assets/img2.jpg'
        },
        {
          src: 'assets/img3.jpg',
          thumbnail: 'assets/img3.jpg'
        },
        {
          src: 'assets/img4.jpg',
          thumbnail: 'assets/img4.jpg'
        }
      ];

      this.gallery.load(images);
    }, 1000);
  }
}
