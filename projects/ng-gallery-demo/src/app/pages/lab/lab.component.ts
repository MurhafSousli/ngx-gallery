import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  GalleryItem,
  GalleryConfig,
  LoadingStrategy,
  Orientation,
  ThumbnailsPosition,
  GalleryComponent,
  GalleryThumbsComponent,
  GalleryNavComponent,
  GalleryBulletsComponent,
  GalleryCounterComponent,
  GalleryItemDef,
  ImgRecognizer
} from 'ng-gallery';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BasicExampleComponent } from '../examples/basic-example/basic-example';
import { Dir, Direction } from '@angular/cdk/bidi';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'lab',
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    // AutoHeight,
    MatIconModule,
    GalleryComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    MatCheckboxModule,
    MatInputModule,
    FooterComponent,
    GalleryThumbsComponent,
    GalleryNavComponent,
    GalleryBulletsComponent,
    GalleryCounterComponent,
    GalleryItemDef,
    ImgRecognizer,
    Dir
    // NgOptimizedImage,
    // BasicExampleComponent
  ]
})
export class LabComponent implements OnInit {

  private pixabay: Pixabay = inject(Pixabay);

  private _title: Title = inject(Title);

  show: WritableSignal<boolean> = signal(true);

  photos: Signal<GalleryItem[]> = toSignal(this.pixabay.getHDImages('tropical'));

  config: GalleryConfig = {
    loop: true,
    resizeDebounceTime: 0,
    scrollDuration: 468,
    autoplay: false,
    disableScroll: false,
    disableMouseScroll: false,
    centralized: false,
    imageSize: 'contain',
    autoplayInterval: 3000,
    loadingStrategy: LoadingStrategy.Preload,
    orientation: Orientation.Horizontal,
    itemAutosize: false,
    scrollBehavior: 'smooth',
    loadingAttr: 'lazy',
    debug: true
  };

  thumbConfig = {
    thumbs: true,
    disableScroll: false,
    disableMouseScroll: false,
    thumbWidth: 120,
    thumbHeight: 90,
    imageSize: 'cover',
    disabled: false,
    centralized: false,
    position: ThumbnailsPosition.Bottom,
    autosize: false,
    detach: false
  }

  navConfig = {
    nav: true
  };

  bulletConfig = {
    bullet: true,
    align: 'bottom',
    scrollBehavior: 'smooth',
    disabled: false
  }

  counterConfig = {
    counter: true,
    align: 'top'
  }

  dir: Direction = 'ltr';

  directions: Direction[] = ['ltr', 'rtl']
  imageSizes = ['cover', 'contain'];
  thumbPositions = ['top', 'left', 'right', 'bottom'];
  loadingStrategies = ['default', 'lazy', 'preload'];
  orientations = ['vertical', 'horizontal'];
  dotsCounterPositions = ['top', 'bottom'];
  scrollBehaviors = ['auto', 'smooth'];
  loadingAttrs = ['eager', 'lazy'];

  player: WritableSignal<any> = signal<any>({ active: false });
  itemClick: WritableSignal<any> = signal<any>({ active: false });
  thumbClick: WritableSignal<any> = signal<any>({ active: false });
  indexChange: WritableSignal<any> = signal<any>({ active: false });

  ngOnInit(): void {
    this._title.setTitle('Lab | ng-gallery');
  }

  restart(): void {
    this.show.set(false);
    setTimeout(() => this.show.set(true), 300);
  }

  onPlayer(e): void {
    this.updateEvent(this.player, e);
  }

  onItemClick(e): void {
    this.updateEvent(this.itemClick, e);
  }

  onThumbClick(e): void {
    this.updateEvent(this.thumbClick, e);
  }

  onIndexChange(e): void {
    this.updateEvent(this.indexChange, e);
  }

  private updateEvent(eventState: WritableSignal<any>, e?: any): void {
    eventState.update(value => ({ ...value, ...{ active: true, e } }));
    setTimeout(() => {
      eventState.update(value => ({ ...value, ...{ active: false } }));
    }, 800);
  }
}
