import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgIf, AsyncPipe } from '@angular/common';
import {
  Gallery,
  GalleryConfig,
  GalleryItemData,
  GalleryItemType,
  IframeItemData,
  ImageItemData,
  VideoItemData,
  YoutubeItemData,
  GalleryComponent
} from 'ng-gallery';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, map } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo';

import { slideInAnimation } from './slide-text.animation';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HlCodeComponent } from '../../shared/hl-code/hl-code.component';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'advanced-example',
  templateUrl: './advanced-example.component.html',
  styleUrls: ['./advanced-example.component.scss'],
  animations: [slideInAnimation],
  standalone: true,
  imports: [SectionTitleComponent, NgIf, GalleryComponent, HlCodeComponent, FooterComponent, FontAwesomeModule, AsyncPipe]
})
export class AdvancedExampleComponent implements OnInit {

  readonly arr = data;
  readonly code = code;
  readonly media$: Observable<GalleryConfig>;
  readonly youtubeIcon = faYoutube;
  readonly videoIcon = faVideo;

  constructor(private _gallery: Gallery, mediaObserver: MediaObserver, private _title: Title) {
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
  }

  ngOnInit() {
    this._title.setTitle('Advanced | ng-gallery');
    const galleryRef = this._gallery.ref('mixed');

    this.arr.map((item: GalleryItemData) => {
      switch (item.type) {
        case GalleryItemType.Image:
          galleryRef.addImage(item);
          break;
        case GalleryItemType.Video:
          galleryRef.addVideo(item);
          break;
        case GalleryItemType.Youtube:
          galleryRef.addYoutube(item);
          break;
        default:
          galleryRef.addIframe(item);
      }
    });
  }
}

const data: GalleryItemData[] = [
  {
    type: 'image',
    src: 'assets/img/img13.jpg',
    thumb: 'assets/img/thumb/img13.jpg',
    title: '🐓Scelerisque dapibus fringilla consequat scelerisque torquent senectus porttitor, placerat fames convallis molestie lobortis diam aliquam'
  } as ImageItemData,
  {
    type: 'image',
    src: 'assets/img/img11.jpg',
    thumb: 'assets/img/thumb/img11.jpg',
    title: '🐦Lorem ipsum curabitur auctor netus facilisis inceptos vivamus fusce inceptos, ullamcorper ipsum id pharetra curabitur leo curabitur.'
  } as ImageItemData,
  {
    type: 'image',
    src: 'assets/img/img3.jpg',
    thumb: 'assets/img/thumb/img3.jpg',
    title: '🐯Iaculis eros leo interdum erat tellus primis pharetra pulvinar, elit risus blandit tempus praesent himenaeos porta, neque elit neque ullamcorper ipsum curabitur at tempus aliquet quam fringilla.'
  } as ImageItemData,
  {
    type: 'image',
    src: 'assets/img/img4.jpg',
    thumb: 'assets/img/thumb/img4.jpg',
    title: '🐅Morbi etiam interdum velit lacinia platea magna libero curae auctor'
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
    type: 'iframe',
    src: 'https://ngx-scrollbar.netlify.com/',
    thumb: 'https://user-images.githubusercontent.com/8130692/64606830-d4006f00-d3cf-11e9-9874-c75269fa3a9c.png'
  } as IframeItemData
];

const code = {
  template: `<gallery id="mixedExample" [thumbTemplate]="thumbTemplate" [itemTemplate]="itemTemplate"></gallery>

<!-- Add custom template to thumbnails -->
<ng-template #thumbTemplate let-type="type">
  <span *ngIf="type === 'youtube'" class="item-type">
    <fa-icon [icon]="youtubeIcon" size="lg"></fa-icon>
  </span>
  <span *ngIf="type === 'video'" class="item-type">
    <fa-icon [icon]="videoIcon" size="lg"></fa-icon>
  </span>
</ng-template>

<!-- Add custom template to image items -->
<ng-template #itemTemplate
             let-index="index"
             let-type="type"
             let-data="data"
             let-currIndex="currIndex"
             let-isActive="isActive">
  <span *ngIf="type === 'image' && isActive" [@slideAnimation] class="item-text">
    {{data?.title}}
  </span>
</ng-template>`,
  component: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef } from 'ng-gallery';

@Component({...})
export class AppComponent implements OnInit {

  galleryId = 'mixedExample';

  constructor(private gallery: Gallery) { }

  ngOnInit() {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

    galleryRef.addImage({
      src: 'IMAGE_URL',
      thumb: '(OPTIONAL)IMAGE_THUMBNAIL_URL',
      title: 'Some title'
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

    galleryRef.addIframe({
      src: 'IFRAME_URL',
      thumb: '(OPTIONAL)IMAGE_THUMBNAIL_URL'
    });
  }
}`
};
