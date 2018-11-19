import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Gallery, GalleryItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pixabay } from '../../service/pixabay.service';

@Component({
  selector: 'lightbox-example',
  templateUrl: './lightbox-example.component.html',
  styleUrls: ['./lightbox-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxExampleComponent implements OnInit, OnDestroy {

  code: any;
  space$: Observable<GalleryItem[]>;
  images: string[] = [];

  constructor(public gallery: Gallery, public lightbox: Lightbox, public _pixabay: Pixabay, private _title: Title) {
    this.code = code;
  }

  ngOnInit() {
    this._title.setTitle('Lightbox | ngx-gallery');
    this.space$ = this._pixabay.getHDImages('sea').pipe(
      map((items: GalleryItem[]) => {
        // Load items manually into the lightbox gallery ref
        this.gallery.ref('lightbox', {
          thumbPosition: 'top'
        }).load(items);

        return items;
      })
    );
  }

  ngOnDestroy() {
    this.gallery.ref('lightbox').destroy();
  }

}

const code = {
  loadItems: `items: GalleryItem[] = [...];
const galleryRef = this.gallery.ref();
galleryRef.load(items)`,
  template: `<div class="grid-item"
  *ngFor="let item of items; let i = index"
  [lightbox]="i">
  <img [src]="item.data.thumbnail">
</div>`,
  ex: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from '@ngx-gallery/core';

@Component({
  template: \`
    <div class="grid">
      <div class="grid-item"
        *ngFor="let item of space$ | async; let i = index"
        [lightbox]="i"
        [gallery]="galleryId">
        <img [src]="item.data.thumbnail">
      </div>
    </div>
  \`
})
export class AppComponent implements OnInit {

  galleryId = 'myLightbox';
  items: GalleryItem[];

  constructor(public gallery: Gallery) { }

  ngOnInit() {
    // Load items into gallery
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }
}`,
  alt: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

export class AppComponent implements OnInit {

  galleryId = 'myLightbox';
  items: GalleryItem[];

  constructor(public gallery: Gallery, private lightbox: Lightbox) { }

  ngOnInit() {
    // Load items into gallery
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }

  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });
  }
}`
};
