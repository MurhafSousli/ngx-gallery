import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Gallery } from '../../../../../ng-gallery/src/public-api';
import { Pixabay } from '../../service/pixabay.service';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'gallerize-example',
  templateUrl: './gallerize-example.component.html',
  styleUrls: ['./gallerize-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GallerizeExampleComponent implements OnInit {

  readonly code: any;
  readonly images$ = this._pixabay.getHDImages('camera');

  constructor(private _pixabay: Pixabay, gallery: Gallery, private _title: Title) {
    this.code = code;
    gallery.ref('lightbox').setConfig({
      thumbPosition: 'bottom',
      imageSize: 'cover'
    });
    gallery.ref('auto-detect').setConfig({
      dots: true,
      thumbPosition: 'top',
      imageSize: 'cover'
    });
  }

  ngOnInit() {
    this._title.setTitle('Gallerize | ng-gallery');
  }

}

const code = {
  onElements: `<div class="container" gallerize>
  <img *ngFor="let image of images"
       src="{{image.thumb}}"
       [attr.imageSrc]="image.src"
       [attr.thumbSrc]="image.thumb">
</div>`,
  withSelector: `<div class="container" gallerize selector=".gallery-img">
  <div *ngFor="let image of images" class="gallery-img"
       [style.backgroundImage]="'url(' + image.thumb + ')'"
       [attr.imageSrc]="image.src"
       [attr.thumbSrc]="image.thumb"></div>
</div>`,
  onGallery: `<gallery gallerize [items]="cameraImages"></gallery>`
};
