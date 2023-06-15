import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Gallery, GalleryItem } from 'ng-gallery';
import { Lightbox, LIGHTBOX_CONFIG, LightboxDirective } from 'ng-gallery/lightbox';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HlCodeComponent } from '../../shared/hl-code/hl-code.component';
import { NoteComponent } from '../../shared/note/note.component';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'lightbox-example',
  templateUrl: './lightbox-example.component.html',
  styleUrls: ['./lightbox-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    {
      provide: LIGHTBOX_CONFIG,
      useValue: {
        keyboardShortcuts: false
      }
    }
  ],
  imports: [SectionTitleComponent, NoteComponent, MatButtonModule, RouterLink, HlCodeComponent, NgFor, LightboxDirective, FontAwesomeModule, FooterComponent, AsyncPipe]
})
export class LightboxExampleComponent implements OnInit, OnDestroy {

  code: any;
  space$: Observable<GalleryItem[]>;
  images: string[] = [];

  constructor(public gallery: Gallery, public lightbox: Lightbox, public _pixabay: Pixabay, private _title: Title) {
    this.code = code;
  }

  ngOnInit() {
    this._title.setTitle('Lightbox | ng-gallery');
    this.space$ = this._pixabay.getHDImages('sea').pipe(
      map((items: GalleryItem[]) => {
        // Load items manually into the lightbox gallery ref
        this.gallery.ref('lightbox', {
          thumbPosition: 'top',
          imageSize: 'cover',
          autoHeight: false
          // thumbView: 'contain'
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
import { Gallery, GalleryItem } from 'ng-gallery';

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
import { Gallery, GalleryItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

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
