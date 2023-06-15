import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { GalleryComponent, GalleryItem, GalleryConfig, ThumbnailsPosition } from 'ng-gallery';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, map } from 'rxjs';

import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HlCodeComponent } from '../../shared/hl-code/hl-code.component';
import { NoteComponent } from '../../shared/note/note.component';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'gallery-example',
  templateUrl: './gallery-example.component.html',
  styleUrls: ['./gallery-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [SectionTitleComponent, NoteComponent, MatButtonModule, RouterLink, MatTabsModule, HlCodeComponent, NgIf, GalleryComponent, FontAwesomeModule, FooterComponent, AsyncPipe]
})
export class GalleryExampleComponent implements OnInit {

  readonly code = code;
  readonly fruits$: Observable<GalleryItem[]>;
  readonly media$: Observable<GalleryConfig>;

  constructor(pixabay: Pixabay, mediaObserver: MediaObserver, private _title: Title) {
    this.fruits$ = pixabay.getHDImages('vegetables');
    this.media$ = mediaObserver.asObservable().pipe(
      map((res: MediaChange[]) => {
        if (res.some((x => x.mqAlias === 'sm' || x.mqAlias === 'xs'))) {
          return {
            thumbPosition: ThumbnailsPosition.Top,
            thumbWidth: 80,
            thumbHeight: 80
          };
        }
        return {
          thumbPosition: ThumbnailsPosition.Left,
          thumbWidth: 120,
          thumbHeight: 90
        };
      })
    );
  }

  ngOnInit() {
    this._title.setTitle('Gallery | ng-gallery');
  }

}

const code = {
  example: '<gallery [items]="items" thumbPosition="left"></gallery>',
  basic: `import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  template: \`
    <gallery [items]="images"></gallery>
  \`
})
export class AppComponent implements OnInit {

  images: GalleryItem[];

  ngOnInit() {
    // Set items array
    this.images = [
      new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' })),
      // ... more items
    ];
  }
}`,
  stream: `import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Observable, map } from 'rxjs';

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
      map(res => new ImageItem({ src: res.srcUrl, thumb: res.thumbUrl }))
    );
  }
}`,
  galleryCmp: `import { Component, OnInit } from '@angular/core';
import { GalleryComponent, ImageItem } from 'ng-gallery';

@Component({
  template: \`
    <gallery></gallery>
  \`
})
export class AppComponent implements OnInit {

  @ViewChild(GalleryComponent) gallery: GalleryComponent;

  ngOnInit() {
    // Add items individually
    this.gallery.addImage({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' });

    // Or load a new set of items
    this.gallery.load([
      new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' }),
      // ... more items
    ]);
  }
}`,
  galleryRef: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef, ImageItem } from 'ng-gallery';

@Component({
  template: \`
    <gallery id="myGallery"></gallery>
  \`
})
export class AppComponent implements OnInit {

  constructor(private gallery: Gallery){
  }

  ngOnInit() {
    // Get the galleryRef by id
    const galleryRef = gallery.ref('myGallery');

    // Add items individually
    this.galleryRef.addImage({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' });

    // Or load a new set of items
    this.galleryRef.load([
      new ImageItem({ src: 'IMAGE_SRC_URL', thumb: 'IMAGE_THUMBNAIL_URL' })
      // ... more items
    ]);
  }
}`
};
