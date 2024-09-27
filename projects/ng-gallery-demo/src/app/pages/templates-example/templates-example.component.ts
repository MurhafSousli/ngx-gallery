import { Component, effect, OnInit, Signal, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  GalleryConfig,
  GalleryItemData,
  GalleryItemTypes,
  IframeItemData,
  ImageItemData,
  VideoItemData,
  YoutubeItemData,
  GalleryModule,
  GalleryComponent
  VimeoItemData
} from 'ng-gallery';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faVimeo } from '@fortawesome/free-brands-svg-icons/faVimeo';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

import { slideInAnimation } from './slide-text.animation';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HlCodeComponent } from '../../shared/hl-code/hl-code.component';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';
import { MatButtonModule } from '@angular/material/button';
import { NoteComponent } from '../../shared/note/note.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'templates-example',
  templateUrl: './templates-example.component.html',
  styleUrls: ['./templates-example.component.scss'],
  animations: [slideInAnimation],
  standalone: true,
  imports: [CommonModule, SectionTitleComponent, GalleryModule, HlCodeComponent, FooterComponent, FontAwesomeModule, MatButtonModule, NoteComponent]
})
export class TemplatesExampleComponent {

  readonly arr = data;
  readonly code = code;
  readonly media$: Observable<GalleryConfig>;
  readonly youtubeIcon = faYoutube;
  readonly vimeoIcon = faVimeo;
  readonly videoIcon = faVideo;

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);

  constructor(mediaObserver: MediaObserver, private _title: Title) {
    this._title.setTitle('Custom Templates | ng-gallery');

    this.media$ = mediaObserver.asObservable().pipe(
      map((res: MediaChange[]) => {
        if (res.some((x => x.mqAlias === 'sm' || x.mqAlias === 'xs'))) {
          return {
            thumbWidth: 80,
            thumbHeight: 80
          };
        }
        return {
          thumbWidth: 120,
          thumbHeight: 90
        };
      })
    );

    effect(() => {
      const gallery: GalleryComponent = this.gallery();
      if (gallery) {
        this.arr.map((item: GalleryItemData) => {
          switch (item.type) {
            case GalleryItemTypes.Image:
              gallery.addImage(item);
              break;
            case GalleryItemTypes.Video:
              gallery.addVideo(item);
              break;
            case GalleryItemTypes.Youtube:
              gallery.addYoutube(item);
              break;
            default:
              gallery.addIframe(item);
          }
        });
        case GalleryItemTypes.Vimeo:
          galleryRef.addVimeo(item);
          break;
      }
    }, { allowSignalWrites: true });
  }
}

const data: GalleryItemData[] = [
  {
    type: 'image',
    src: 'assets/img/img13.jpg',
    thumb: 'assets/img/thumb/img13.jpg',
    alt: '🐓Scelerisque dapibus fringilla consequat scelerisque torquent senectus porttitor, placerat fames convallis molestie lobortis diam aliquam'
  } as ImageItemData,
  {
    type: 'image',
    src: 'assets/img/img11.jpg',
    thumb: 'assets/img/thumb/img11.jpg',
    alt: '🐦Lorem ipsum curabitur auctor netus facilisis inceptos vivamus fusce inceptos, ullamcorper ipsum id pharetra curabitur leo curabitur.'
  } as ImageItemData,
  {
    type: 'image',
    src: 'assets/img/img3.jpg',
    thumb: 'assets/img/thumb/img3.jpg',
    alt: '🐯Iaculis eros leo interdum erat tellus primis pharetra pulvinar, elit risus blandit tempus praesent himenaeos porta, neque elit neque ullamcorper ipsum curabitur at tempus aliquet quam fringilla.'
  } as ImageItemData,
  {
    type: 'image',
    src: 'assets/img/img4.jpg',
    thumb: 'assets/img/thumb/img4.jpg',
    alt: '🐅Morbi etiam interdum velit lacinia platea magna libero curae auctor'
  } as ImageItemData,
  {
    type: 'video',
    autoplay: false,
    controls: true,
    mute: null,
    loop: true,
    thumb: 'https://images.pond5.com/orangutan-sitting-tree-and-attentively-footage-074672817_iconl.jpeg',
    poster: 'https://images.pond5.com/orangutan-sitting-tree-and-attentively-footage-074672817_iconl.jpeg',
    src: [
      {
        url: 'https://videos.pond5.com/orangutan-sitting-tree-and-attentively-footage-074672817_main_xxl.mp4',
        type: 'video/mp4'
      }
    ]
  } as VideoItemData,
  {
    type: 'youtube',
    autoplay: false,
    src: 'b7Cl7S0pLRw'
  } as YoutubeItemData,
  {
    type: 'vimeo',
    autoplay: false,
    src: '124139626'
  } as VimeoItemData,
  {
    type: 'iframe',
    src: 'https://ngx-scrollbar.netlify.app/',
    thumb: 'https://user-images.githubusercontent.com/8130692/64606830-d4006f00-d3cf-11e9-9874-c75269fa3a9c.png'
  } as IframeItemData
];

const code = {
  customItemTemplate: `<gallery>
  <div *galleryItemDef="let item; let type = type">
    <div *ngIf="type === 'image'">
      <img [src]="item.src">
    </div>
    <div *ngIf="type === 'video'">
      <video>
        <source src="item.src">
      </video>
    </div>
  </div>
</gallery>`,
  customImageTemplate: `<gallery>
  <ng-container *galleryImageDef="let item; let active = active">
    <div *ngIf="active" class="item-text">
      {{ item?.alt }}
    </div>
  </ng-container>
</gallery>`,
  customThumbTemplate: `<gallery>
  <ng-container *galleryThumbDef="let item; let type = type">
    <span *ngIf="type === 'youtube'" class="item-type">
      <fa-icon [icon]="youtubeIcon" size="lg"></fa-icon>
    </span>
    <span *ngIf="type === 'vimeo'" class="item-type">
      <fa-icon [icon]="vimeoIcon" size="lg"></fa-icon>
    </span>
    <span *ngIf="type === 'video'" class="item-type">
      <fa-icon [icon]="videoIcon" size="lg"></fa-icon>
    </span>
  </ng-container>
</gallery>`,
  customBoxTemplate: `<gallery>
  <div *galleryBoxDef="let state = state; let config = config">
    {{ state.currIndex + 1 }} / {{ state.items.length }}
  </div>
</gallery>`,
  component: `import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryModule, Gallery, GalleryRef } from 'ng-gallery';

@Component({
  selector: 'example-component',
  templateUrl: './example-templates.html',
  standalone: true,
  imports: [CommonModule, GalleryModule]
})
export class ExampleComponent implements OnInit {

  galleryId = 'mixedExample';

  constructor(private gallery: Gallery) { }

  ngOnInit() {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

    galleryRef.addImage({
      src: 'IMAGE_URL',
      thumb: '(OPTIONAL)IMAGE_THUMBNAIL_URL',
      alt: 'Some title'
    });

    galleryRef.addVideo({
      src: 'VIDEO_URL',
      thumb: '(OPTIONAL)VIDEO_THUMBNAIL_URL',
      poster: '(OPTIONAL)VIDEO_POSTER_URL'
    });

    // Add a video item with multiple url sources
    galleryRef.addVideo({
      src: [
        { url: 'MP4_URL', type: 'video/mp4' },
        { url: 'OGG_URL', type: 'video/ogg' }
      ],
      thumb: '(OPTIONAL)VIDEO_THUMBNAIL_URL',
      poster: '(OPTIONAL)VIDEO_POSTER_URL'
    });

    galleryRef.addYoutube({
      src: 'VIDEO_ID'
    });

    galleryRef.addVimeo({
      src: 'VIDEO_ID'
    });

    galleryRef.addIframe({
      src: 'IFRAME_URL',
      thumb: '(OPTIONAL)IMAGE_THUMBNAIL_URL'
    });
  }
}`
};
