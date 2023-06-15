import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import {
  GalleryItem,
  GalleryConfig,
  LoadingStrategy,
  SlidingDirection,
  ThumbnailsPosition,
  ThumbnailsView,
  GalleryComponent
} from 'ng-gallery';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from '@angular/flex-layout/flex';
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
  imports: [FlexModule, MatIconModule, NgIf, GalleryComponent, MatButtonModule, MatCardModule, MatFormFieldModule, MatSelectModule, FormsModule, NgFor, MatOptionModule, MatCheckboxModule, MatInputModule, FooterComponent, AsyncPipe]
})
export class LabComponent implements OnInit {

  show$ = new BehaviorSubject<boolean>(true);
  photos$: Observable<GalleryItem[]>;
  config: GalleryConfig;

  imageSizes = ['cover', 'contain'];
  thumbPositions = ['top', 'left', 'right', 'bottom'];
  loadingStrategies = ['default', 'lazy', 'preload'];
  thumbModes = ['strict', 'free'];
  thumbViews = ['default', 'contain'];
  slidingDirections = ['vertical', 'horizontal'];
  dotsCounterPositions = ['top', 'bottom'];
  scrollBehaviors = ['auto', 'smooth'];

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
      nav: true,
      loop: true,
      dots: true,
      dotsPosition: 'bottom',
      counterPosition: 'top',
      resizeDebounceTime: 50,
      slidingDuration: 468,
      thumb: true,
      counter: true,
      autoPlay: false,
      slidingDisabled: false,
      thumbSlidingDisabled: false,
      mouseSlidingDisabled: false,
      thumbMouseSlidingDisabled: false,
      thumbWidth: 120,
      thumbHeight: 90,
      imageSize: 'contain',
      disableThumb: false,
      playerInterval: 3000,
      thumbView: ThumbnailsView.Contain,
      thumbPosition: ThumbnailsPosition.Bottom,
      loadingStrategy: LoadingStrategy.Preload,
      slidingDirection: SlidingDirection.Horizontal,
      autoHeight: false,
      itemAutosize: false,
      thumbAutosize: false,
      scrollBehavior: 'smooth',
      navScrollBehavior: 'smooth',
      debug: false
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
