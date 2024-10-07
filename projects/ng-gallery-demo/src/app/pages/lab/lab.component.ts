import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import {
  GalleryItem,
  GalleryConfig,
  LoadingStrategy,
  Orientation,
  ThumbnailsPosition,
  GalleryComponent,
  GalleryThumbsComponent, GalleryNavComponent
} from 'ng-gallery';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FlexLayoutModule,
    MatIconModule,
    NgIf,
    GalleryComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgFor,
    MatOptionModule,
    MatCheckboxModule,
    MatInputModule,
    FooterComponent,
    AsyncPipe,
    GalleryThumbsComponent,
    GalleryNavComponent,
  ]
})
export class LabComponent implements OnInit {

  show$ = new BehaviorSubject<boolean>(true);
  photos$: Observable<GalleryItem[]>;
  config: GalleryConfig;

  thumbConfig= {
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
  }

  imageSizes = ['cover', 'contain'];
  thumbPositions = ['top', 'left', 'right', 'bottom'];
  loadingStrategies = ['default', 'lazy', 'preload'];
  orientations = ['vertical', 'horizontal'];
  dotsCounterPositions = ['top', 'bottom'];
  scrollBehaviors = ['auto', 'smooth'];
  loadingAttrs = ['eager', 'lazy'];

  player$ = new BehaviorSubject<any>({ active: false });
  itemClick$ = new BehaviorSubject<any>({ active: false });
  thumbClick$ = new BehaviorSubject<any>({ active: false });
  indexChange$ = new BehaviorSubject<any>({ active: false });

  constructor(pixabay: Pixabay, private _title: Title) {
    this.photos$ = pixabay.getHDImages('jet fighter');
  }

  ngOnInit() {
    this._title.setTitle('Lab | ng-gallery');
    this.config = {
      loop: true,
      bullets: true,
      bulletPosition: 'bottom',
      counterPosition: 'top',
      resizeDebounceTime: 0,
      scrollDuration: 468,
      counter: true,
      autoplay: false,
      disableScroll: false,
      disableMouseScroll: false,
      centralized: false,
      imageSize: 'contain',
      autoplayInterval: 3000,
      loadingStrategy: LoadingStrategy.Preload,
      orientation: Orientation.Horizontal,
      autoHeight: false,
      itemAutosize: false,
      scrollBehavior: 'smooth',
      loadingAttr: 'lazy',
      debug: true
    };
  }

  restart() {
    this.show$.next(false);
    setTimeout(() => this.show$.next(true), 300);
  }

  onPlayer(e) {
    this.updateEvent(this.player$, { active: true, e });
    setTimeout(() => {
      this.updateEvent(this.player$, { active: false });
    }, 800);
  }

  onItemClick(e) {
    this.updateEvent(this.itemClick$, { active: true, e });
    setTimeout(() => {
      this.updateEvent(this.itemClick$, { active: false });
    }, 800);
  }

  onThumbClick(e) {
    this.updateEvent(this.thumbClick$, { active: true, e });
    setTimeout(() => {
      this.updateEvent(this.thumbClick$, { active: false });
    }, 800);
  }

  onIndexChange(e) {
    this.updateEvent(this.indexChange$, { active: true, e });
    setTimeout(() => {
      this.updateEvent(this.indexChange$, { active: false });
    }, 800);
  }

  private updateEvent(eventState: BehaviorSubject<any>, args) {
    eventState.next({ ...eventState.value, ...args });
  }
}
