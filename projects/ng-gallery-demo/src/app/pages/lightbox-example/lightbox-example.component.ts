import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  GalleryBulletsComponent,
  GalleryCounterComponent,
  GalleryItemData,
  GalleryNavComponent,
  GalleryThumbsComponent, ImgRecognizer
} from 'ng-gallery';
import { LightboxComponent, LightboxModule, provideLightboxOptions } from 'ng-gallery/lightbox';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HlCodeComponent } from '../../shared/hl-code/hl-code.component';
import { NoteComponent } from '../../shared/note/note.component';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'lightbox-example',
  templateUrl: './lightbox-example.component.html',
  styleUrl: './lightbox-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideLightboxOptions({
      keyboardShortcuts: false
    })
  ],
  imports: [
    CommonModule,
    LightboxModule,
    SectionTitleComponent,
    NoteComponent,
    MatButtonModule,
    RouterLink,
    HlCodeComponent,
    FontAwesomeModule,
    FooterComponent,
    GalleryBulletsComponent,
    GalleryCounterComponent,
    GalleryNavComponent,
    GalleryThumbsComponent,
    ImgRecognizer,
    LightboxComponent,
  ]
})
export class LightboxExampleComponent implements OnInit {

  private pixabay: Pixabay = inject(Pixabay);

  private _title: Title = inject(Title);

  code: any = code;
  photos: Signal<GalleryItemData[]> = toSignal(this.pixabay.getHDImages('sea'));

  ngOnInit(): void {
    this._title.setTitle('Lightbox | ng-gallery');
  }
}

const code = {
  loadItems: `items: GalleryItemData[] = [...];
const galleryRef = this.gallery.ref();
galleryRef.load(items)`,
  template: `<div class="grid-item"
     *ngFor="let item of items; let i = index"
     [lightbox]="i">
  <img [src]="item.data.thumbnail"/>
</div>`,
  ex: `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule, Gallery, GalleryItemData } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

@Component({
  template: \`
    <div class="grid">
      <div class="grid-item"
           *ngFor="let item of space$ | async; let i = index"
           [lightbox]="i"
           [gallery]="galleryId">
        <img [src]="item.data.thumbnail"/>
      </div>
    </div>
  \`,
  imports: [CommonModule, LightboxModule]
})
export class AppComponent implements OnInit {

  galleryId = 'myLightbox';
  items: GalleryItemData[];

  constructor(public gallery: Gallery) { }

  ngOnInit() {
    // Load items into gallery
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }
}`,
  alt: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItemData } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  template: \`
    <button (click)="openInFullScreen(4)">Open image 5</button>
  \`,
  standalone: true
})
export class AppComponent implements OnInit {

  galleryId = 'myLightbox';
  items: GalleryItemData[];

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
