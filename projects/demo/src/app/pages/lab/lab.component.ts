import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GalleryItem, GalleryConfig, LoadingStrategy, SlidingDirection, ThumbnailsMode, ThumbnailsPosition } from '@ngx-gallery/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pixabay } from '../../service/pixabay.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabComponent implements OnInit {

  show$ = new BehaviorSubject<boolean>(true);
  photos$: Observable<GalleryItem[]>;
  config: GalleryConfig | any;

  imageSizes = ['cover', 'contain'];
  thumbPositions = ['top', 'left', 'right', 'bottom'];
  loadingStrategies = ['default', 'lazy', 'preload'];
  thumbModes = ['strict', 'free'];
  slidingDirections = ['vertical', 'horizontal'];
  dotsCounterPositions = ['top', 'bottom'];
  loadingModes = ['determinate', 'indeterminate'];

  player$ = new BehaviorSubject<any>({active: false});
  itemClick$ = new BehaviorSubject<any>({active: false});
  thumbClick$ = new BehaviorSubject<any>({active: false});
  indexChange$ = new BehaviorSubject<any>({active: false});

  constructor(pixabay: Pixabay, private _title: Title) {
    this.photos$ = pixabay.getImages('cars');
  }

  ngOnInit() {
    this._title.setTitle('Lab | ngx-gallery');
    this.config = {
      nav: true,
      loop: true,
      zoomOut: 0,
      dots: false,
      dotsPosition: 'bottom',
      counterPosition: 'top',
      loadingMode: 'determinate',
      thumb: true,
      counter: true,
      gestures: true,
      autoPlay: false,
      thumbWidth: 120,
      thumbHeight: 90,
      imageSize: 'contain',
      panSensitivity: 25,
      disableThumb: false,
      playerInterval: 3000,
      thumbMode: ThumbnailsMode.Free,
      thumbPosition: ThumbnailsPosition.Bottom,
      loadingStrategy: LoadingStrategy.Default,
      slidingDirection: SlidingDirection.Horizontal,
    };
  }

  restart() {
    this.show$.next(false);
    setTimeout(() => this.show$.next(true), 300);
  }

  onPlayer(e) {
    this.updateEvent(this.player$, {active: true, e});
    setTimeout(() => {
      this.updateEvent(this.player$, {active: false});
    }, 800);
  }

  onItemClick(e) {
    this.updateEvent(this.itemClick$, {active: true, e});
    setTimeout(() => {
      this.updateEvent(this.itemClick$, {active: false});
    }, 800);
  }

  onThumbClick(e) {
    this.updateEvent(this.thumbClick$, {active: true, e});
    setTimeout(() => {
      this.updateEvent(this.thumbClick$, {active: false});
    }, 800);
  }

  onIndexChange(e) {
    this.updateEvent(this.indexChange$, {active: true, e});
    setTimeout(() => {
      this.updateEvent(this.indexChange$, {active: false});
    }, 800);
  }

  private updateEvent(eventState: BehaviorSubject<any>, args) {
    eventState.next({...eventState.value, ...args});
  }
}
