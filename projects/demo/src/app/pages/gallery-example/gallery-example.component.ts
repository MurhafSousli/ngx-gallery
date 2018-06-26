import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Pixabay } from '../../service/pixabay.service';
import { GalleryItem } from '../../../../../core/src/lib/models/index';

@Component({
  selector: 'gallery-example',
  templateUrl: './gallery-example.component.html',
  styleUrls: ['./gallery-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryExampleComponent {

  readonly code: any;
  readonly lions$: Observable<GalleryItem[]>;
  readonly tigers$: Observable<GalleryItem[]>;
  readonly media$: Observable<string>;

  constructor(pixabay: Pixabay, media: ObservableMedia) {
    this.code = code;
    this.lions$ = pixabay.getImages('lion');
    this.tigers$ = pixabay.getImages('tiger');
    this.media$ = media.asObservable().pipe(map((res: MediaChange) => res.mqAlias));
  }

}

const code = {
  ex1: '<gallery id="ex1" [items]="items" thumbPosition="left"></gallery>',
  ex2: '<gallery id="ex2" [items]="items" thumbPosition="right" slidingDirection="vertical"></gallery>',
  galleryItems: `import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  template: \`
    <gallery [items]="images"></gallery>
  \`
})
export class AppComponent implements OnInit {

  images: GalleryItem[];

  ngOnInit() {
    // Set gallery items array
    this.images = [
      new ImageItem('IMAGE_SRC_URL', '(OPTIONAL)IMAGE_THUMBNAIL_URL')),
      // ...
    ];
  }
}`,
  galleryHttp: `import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  template: \`
    <gallery [items]="images$ | async"></gallery>
  \`
})
export class AppComponent implements OnInit {

  images$: Observable<GalleryItem[]>;

  constructor(private _http: HttpClient){
  }

  ngOnInit() {
    this.images$ = this._http.get('REQUEST_URL').pipe(
      map(res => new ImageItem(res.srcUrl, res.thumbUrl))
    );
  }
}`,
  galleryCmp: `import { Component, OnInit } from '@angular/core';
import { ImageItem, VideoItem, YoutubeItem, IframeItem } from '@ngx-gallery/core';

@Component({
  template: \`
    <gallery></gallery>
  \`
})
export class AppComponent implements OnInit {

  @ViewChild(GalleryComponent) gallery: GalleryComponent;

  ngOnInit() {
    // Add items individually
    this.gallery.add(new ImageItem('IMAGE_SRC_URL', '(OPTIONAL)IMAGE_THUMBNAIL_URL'));

    // Or add an array items at once
    this.gallery.load([
      new ImageItem('IMAGE_SRC_URL', '(OPTIONAL)IMAGE_THUMBNAIL_URL'))
    ]);
  }
}`,
  galleryRef: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef, ImageItem } from '@ngx-gallery/core';

@Component({
  template: \`
    <gallery id="myGallery"></gallery>
  \`
})
export class AppComponent implements OnInit {

  constructor(private gallery: Gallery){
  }

  ngOnInit() {
    // Get the gallery reference by id, default: 'root'
    const galleryRef = gallery.ref('myGallery');

    // Add items individually
    this.galleryRef.add(new ImageItem('IMAGE_SRC_URL', '(OPTIONAL)IMAGE_THUMBNAIL_URL'));

    // Or add an array items at once
    this.galleryRef.load([
      new ImageItem('IMAGE_SRC_URL', '(OPTIONAL)IMAGE_THUMBNAIL_URL'))
    ]);
  }
}`
};
