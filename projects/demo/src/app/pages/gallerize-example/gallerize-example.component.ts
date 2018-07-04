import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Gallery } from '@ngx-gallery/core';
import { Pixabay } from '../../service/pixabay.service';

@Component({
  selector: 'gallerize-example',
  templateUrl: './gallerize-example.component.html',
  styleUrls: ['./gallerize-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GallerizeExampleComponent {

  readonly code: any;
  readonly images$ = this._pixabay.getImages('camera');

  constructor(private _pixabay: Pixabay, gallery: Gallery) {
    this.code = code;
    gallery.ref('lightbox').setConfig({
      thumbPosition: 'bottom'
    });
    gallery.ref('auto-detect').setConfig({
      dots: true
    });
  }

}

const code = {
  onElements: `<div class="container" gallerize>
  <img *ngFor="let srcPath of images" src="{{srcPath}}">
</div>`,
  withSelector: `<div class="container" gallerize selector=".gallery-img">
  <div *ngFor="let srcPath of images" class="gallery-img" [style.backgroundImage]="'url(' + srcPath + ')'"></div>
</div>`,
  onGallery: `<gallery gallerize [items]="cameraImages"></gallery>`
};
