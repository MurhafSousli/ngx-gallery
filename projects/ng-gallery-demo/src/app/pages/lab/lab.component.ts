import { Component, inject, signal, OnInit, WritableSignal, effect } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpResourceRef } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  GalleryItemData,
  GalleryModule,
  GalleryOrientation,
  GalleryDock,
  GallerySnapAlign,
  GalleryCounterPosition
} from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'lab',
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.scss',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatInputModule,
    FooterComponent,
    GalleryModule,
    LightboxModule
  ]
})
export class LabComponent implements OnInit {

  private _title: Title = inject(Title);

  private pixabay: Pixabay = inject(Pixabay);

  mixedData = mixedData;

  readonly images: HttpResourceRef<GalleryItemData[]> = this.pixabay.getImages('Fruits');

  loop: WritableSignal<boolean> = signal(true);
  itemSize: WritableSignal<number | 'auto'> = signal(null);
  snapAlign: WritableSignal<GallerySnapAlign> = signal('center');
  itemsPerView: WritableSignal<number> = signal(1);
  resizeDebounceTime: WritableSignal<number> = signal(0);
  scrollDuration: WritableSignal<number> = signal(468);
  autoplay: WritableSignal<boolean> = signal(false);
  disableScroll: WritableSignal<boolean> = signal(false);
  disableMouseScroll: WritableSignal<boolean> = signal(false);
  forceAlign: WritableSignal<boolean> = signal(true);
  imageSize: WritableSignal<'cover' | 'contain'> = signal('cover');
  autoplayInterval: WritableSignal<number> = signal(3000);
  orientation: WritableSignal<GalleryOrientation> = signal('horizontal');
  scrollBehavior: WritableSignal<ScrollBehavior> = signal('smooth');
  thumbScrollBehavior: WritableSignal<ScrollBehavior> = signal('smooth');
  debug: WritableSignal<boolean> = signal(true);

  thumbs: WritableSignal<boolean> = signal(false);
  thumbDisableScroll: WritableSignal<boolean> = signal(false);
  thumbDisableMouseScroll: WritableSignal<boolean> = signal(false);
  thumbSize: WritableSignal<number | 'autosize'> = signal(120);
  thumbsPerView: WritableSignal<number> = signal(5);
  thickness: WritableSignal<number> = signal(90);
  thumbImageSize: WritableSignal<'cover' | 'contain'> = signal('cover');
  thumbDisabled: WritableSignal<boolean> = signal(false);
  thumbForceAlign: WritableSignal<boolean> = signal(false);
  thumbPosition: WritableSignal<GalleryDock> = signal('start');
  thumbFloating: WritableSignal<boolean> = signal(false);
  thumbDetach: WritableSignal<boolean> = signal(false);

  nav: WritableSignal<boolean> = signal(true);

  counter: WritableSignal<boolean> = signal(true);
  counterAlign: WritableSignal<GalleryCounterPosition> = signal('top');

  imageSizes: string[] = ['cover', 'contain'];
  thumbPositions: string[] = ['start', 'end', 'top', 'bottom'];
  orientations: string[] = ['vertical', 'horizontal'];
  dotsCounterPositions: string[] = ['top', 'bottom'];
  scrollBehaviors: string[] = ['auto', 'smooth'];
  scrollSnapAlign: GallerySnapAlign[] = ['center', 'start', 'end'];

  player: WritableSignal<any> = signal<any>({ active: false });
  itemClick: WritableSignal<any> = signal<any>({ active: false });
  thumbClick: WritableSignal<any> = signal<any>({ active: false });
  indexChange: WritableSignal<any> = signal<any>({ active: false });

  ngOnInit(): void {
    this._title.setTitle('Lab | ng-gallery');
  }

  onPlayer(e) {
    this.updateEvent(this.player(), { active: true, e });
    setTimeout(() => {
      this.updateEvent(this.player(), { active: false });
    }, 800);
  }

  onItemClick(e) {
    // console.log(e)
    // this.updateEvent(this.itemClick(), { active: true, e });
    // setTimeout(() => {
    //   this.updateEvent(this.itemClick(), { active: false });
    // }, 800);
  }

  onThumbClick(e) {
    this.updateEvent(this.thumbClick(), { active: true, e });
    setTimeout(() => {
      this.updateEvent(this.thumbClick(), { active: false });
    }, 800);
  }

  onIndexChange(e) {
    this.updateEvent(this.indexChange(), { active: true, e });
    setTimeout(() => {
      this.updateEvent(this.indexChange(), { active: false });
    }, 800);
  }

  private updateEvent(eventState: WritableSignal<any>, args) {
    eventState.set({ ...eventState(), ...args });
  }

}

const mixedData = [
  {
    type: 'image',
    src: 'img/img13.jpg',
    thumb: 'img/thumb/img13.jpg',
    alt: '🐓Scelerisque dapibus fringilla consequat scelerisque torquent senectus porttitor, placerat fames convallis molestie lobortis diam aliquam'
  },
  {
    type: 'image',
    src: 'img/img11.jpg',
    thumb: 'img/thumb/img11.jpg',
    alt: '🐦Lorem ipsum curabitur auctor netus facilisis inceptos vivamus fusce inceptos, ullamcorper ipsum id pharetra curabitur leo curabitur.'
  },
  {
    type: 'image',
    src: 'img/img3.jpg',
    thumb: 'img/thumb/img3.jpg',
    alt: '🐯Iaculis eros leo interdum erat tellus primis pharetra pulvinar, elit risus blandit tempus praesent himenaeos porta, neque elit neque ullamcorper ipsum curabitur at tempus aliquet quam fringilla.'
  },
  {
    type: 'image',
    src: 'img/img4.jpg',
    thumb: 'img/thumb/img4.jpg',
    alt: '🐅Morbi etiam interdum velit lacinia platea magna libero curae auctor'
  },
  {
    type: 'video',
    thumb: 'https://images.pond5.com/orangutan-sitting-tree-and-attentively-footage-074672817_iconl.jpeg',
    poster: 'https://images.pond5.com/orangutan-sitting-tree-and-attentively-footage-074672817_iconl.jpeg',
    src: 'https://videos.pond5.com/orangutan-sitting-tree-and-attentively-footage-074672817_main_xxl.mp4',
  }
];
