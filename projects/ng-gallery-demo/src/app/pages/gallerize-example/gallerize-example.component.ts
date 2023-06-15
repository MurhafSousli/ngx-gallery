import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor, AsyncPipe, SlicePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Gallery, GalleryComponent } from 'ng-gallery';
import { GallerizeDirective } from 'ng-gallery/lightbox';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HlCodeComponent } from '../../shared/hl-code/hl-code.component';
import { NoteComponent } from '../../shared/note/note.component';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'gallerize-example',
  templateUrl: './gallerize-example.component.html',
  styleUrls: ['./gallerize-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SectionTitleComponent, NoteComponent, MatButtonModule, RouterLink, HlCodeComponent, GallerizeDirective, NgFor, GalleryComponent, FooterComponent, AsyncPipe, SlicePipe]
})
export class GallerizeExampleComponent implements OnInit {

  readonly code: any;
  readonly images$ = this._pixabay.getHDImages('jaguar');
  readonly examples$ = this._pixabay.getHDImages('crocodile');

  constructor(private _pixabay: Pixabay, gallery: Gallery, private _title: Title) {
    this.code = code;
    gallery.ref('lightbox').setConfig({
      thumbPosition: 'bottom',
      imageSize: 'cover',
      itemAutosize: false,
      thumbAutosize: false,
      // thumbWidth: 120,
      // thumbHeight: 90,
      // thumbView: 'contain'
    });
    gallery.ref('auto-detect').setConfig({
      thumbPosition: 'top',
      autoHeight: true,
      imageSize: 'cover',
      itemAutosize: false,
      thumbAutosize: false,
      // thumbView: 'contain'
    });
  }

  ngOnInit() {
    this._title.setTitle('Gallerize | ng-gallery');
  }

}

const code = {
  onElements: `<div class="container" gallerize>
  <img *ngFor="let image of images"
       [src]="image.thumb"
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
