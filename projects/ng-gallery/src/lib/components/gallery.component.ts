import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  EventEmitter,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryError, GalleryItem, GalleryState } from '../models/gallery.model';
import {
  IframeItem,
  IframeItemData,
  ImageItem,
  ImageItemData,
  VideoItem,
  VideoItemData,
  YoutubeItem,
  YoutubeItemData
} from './templates/items.model';

@Component({
  selector: 'gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../styles/gallery.scss'],
  template: `
    <gallery-core [state]="galleryRef.state | voAsync"
                  [config]="galleryRef.config | voAsync"
                  (action)="onAction($event)"
                  (itemClick)="onItemClick($event)"
                  (thumbClick)="onThumbClick($event)"
                  (error)="onError($event)"></gallery-core>
    <ng-content></ng-content>
  `
})
export class GalleryComponent implements OnInit, OnChanges, OnDestroy {

  galleryRef: GalleryRef;
  @Input() id: string;
  @Input() items: GalleryItem[];
  @Input() nav: boolean = this._gallery.config.nav;
  @Input() dots: boolean = this._gallery.config.dots;
  @Input() loop: boolean = this._gallery.config.loop;
  @Input() thumb: boolean = this._gallery.config.thumb;
  @Input() zoomOut: number = this._gallery.config.zoomOut;
  @Input() counter: boolean = this._gallery.config.counter;
  @Input() dotsSize: number = this._gallery.config.dotsSize;
  @Input() autoPlay: boolean = this._gallery.config.autoPlay;
  @Input() gestures: boolean = this._gallery.config.gestures;
  @Input() thumbWidth: number = this._gallery.config.thumbWidth;
  @Input() thumbHeight: number = this._gallery.config.thumbHeight;
  @Input() disableThumb: boolean = this._gallery.config.disableThumb;
  @Input() panSensitivity: number = this._gallery.config.panSensitivity;
  @Input() playerInterval: number = this._gallery.config.playerInterval;
  @Input() itemTemplate: TemplateRef<any> = this._gallery.config.itemTemplate;
  @Input() thumbTemplate: TemplateRef<any> = this._gallery.config.thumbTemplate;
  @Input() thumbMode: 'strict' | 'free' = this._gallery.config.thumbMode;
  @Input() imageSize: 'cover' | 'contain' = this._gallery.config.imageSize;
  @Input() dotsPosition: 'top' | 'bottom' = this._gallery.config.dotsPosition;
  @Input() counterPosition: 'top' | 'bottom' = this._gallery.config.counterPosition;
  @Input() slidingDirection: 'horizontal' | 'vertical' = this._gallery.config.slidingDirection;
  @Input() loadingStrategy: 'preload' | 'lazy' | 'default' = this._gallery.config.loadingStrategy;
  @Input() thumbPosition: 'top' | 'left' | 'right' | 'bottom' = this._gallery.config.thumbPosition;
  @Input() thumbView: 'default' | 'contain' = this._gallery.config.thumbView;

  // Inputs used by the lightbox

  /** Destroy gallery ref on component destroy event */
  @Input() destroyRef = true;

  /** Skip initializing the config with components inputs (Lightbox mode) */
  @Input() skipInitConfig = false;

  @Output() itemClick = new EventEmitter<number>();
  @Output() thumbClick = new EventEmitter<number>();
  @Output() playingChange = new EventEmitter<GalleryState>();
  @Output() indexChange = new EventEmitter<GalleryState>();
  @Output() itemsChange = new EventEmitter<GalleryState>();
  @Output() error = new EventEmitter<GalleryError>();

  private _itemClick$: SubscriptionLike = Subscription.EMPTY;
  private _thumbClick$: SubscriptionLike = Subscription.EMPTY;
  private _itemChange$: SubscriptionLike = Subscription.EMPTY;
  private _indexChange$: SubscriptionLike = Subscription.EMPTY;
  private _playingChange$: SubscriptionLike = Subscription.EMPTY;
  private _playerListener$: SubscriptionLike = Subscription.EMPTY;

  constructor(
    private readonly _gallery: Gallery,
    private readonly _zone: NgZone) {
  }

  private getConfig() {
    return {
      nav: this.nav,
      dots: this.dots,
      loop: this.loop,
      thumb: this.thumb,
      zoomOut: this.zoomOut,
      counter: this.counter,
      autoPlay: this.autoPlay,
      gestures: this.gestures,
      dotsSize: this.dotsSize,
      imageSize: this.imageSize,
      thumbMode: this.thumbMode,
      thumbView: this.thumbView,
      thumbWidth: this.thumbWidth,
      thumbHeight: this.thumbHeight,
      disableThumb: this.disableThumb,
      dotsPosition: this.dotsPosition,
      itemTemplate: this.itemTemplate,
      thumbTemplate: this.thumbTemplate,
      thumbPosition: this.thumbPosition,
      panSensitivity: this.panSensitivity,
      playerInterval: this.playerInterval,
      counterPosition: this.counterPosition,
      loadingStrategy: this.loadingStrategy,
      slidingDirection: this.slidingDirection
    };
  }

  onAction(i: 'next' | 'prev' | number) {
    switch (i) {
      case 'next':
        this.galleryRef.next();
        break;
      case 'prev':
        this.galleryRef.prev();
        break;
      default:
        this.galleryRef.set(i as number);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.galleryRef) {
      this.galleryRef.setConfig(this.getConfig());

      if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
        this.load(this.items);
      }
    }
  }

  ngOnInit() {
    // Get gallery instance by id
    if (this.skipInitConfig) {
      this.galleryRef = this._gallery.ref(this.id);
    } else {
      this.galleryRef = this._gallery.ref(this.id, this.getConfig());
    }

    // Load gallery items
    this.load(this.items);

    // Subscribes to events on demand
    if (this.indexChange.observers.length) {
      this._indexChange$ = this.galleryRef.indexChanged.subscribe((state: GalleryState) => this.indexChange.emit(state));
    }
    if (this.itemsChange.observers.length) {
      this._itemChange$ = this.galleryRef.itemsChanged.subscribe((state: GalleryState) => this.itemsChange.emit(state));
    }
    if (this.playingChange.observers.length) {
      this._playingChange$ = this.galleryRef.playingChanged.subscribe((state: GalleryState) => this.playingChange.emit(state));
    }
  
    // Activate player listener
    this._zone.runOutsideAngular(() => {
      this._playerListener$ = this.galleryRef.activatePlayer().subscribe();
      // Start playing if auto-play is set to true
      if (this.autoPlay) {
        this.play();
      }
    });

  }

  ngOnDestroy() {
    this._itemClick$.unsubscribe();
    this._thumbClick$.unsubscribe();
    this._itemChange$.unsubscribe();
    this._indexChange$.unsubscribe();
    this._playingChange$.unsubscribe();
    this._playerListener$.unsubscribe();
    if (this.destroyRef) {
      this.galleryRef.destroy();
    }
  }

  onItemClick(i: number) {
    this.itemClick.emit(i);
    this.galleryRef.itemClick.next(i);
  }

  onThumbClick(i: number) {
    this.galleryRef.set(i);
    this.thumbClick.emit(i);
    this.galleryRef.thumbClick.next(i);
  }

  onError(err: GalleryError) {
    this.error.emit(err);
    this.galleryRef.error.next(err);
  }

  load(items: GalleryItem[]) {
    this.galleryRef.load(items);
  }

  add(item: GalleryItem, active?: boolean) {
    this.galleryRef.add(item, active);
  }

  addImage(data: ImageItemData, active?: boolean) {
    this.add(new ImageItem(data), active);
  }

  addVideo(data: VideoItemData, active?: boolean) {
    this.add(new VideoItem(data), active);
  }

  addIframe(data: IframeItemData, active?: boolean) {
    this.add(new IframeItem(data), active);
  }

  addYoutube(data: YoutubeItemData, active?: boolean) {
    this.add(new YoutubeItem(data), active);
  }

  remove(i: number) {
    this.galleryRef.remove(i);
  }

  next() {
    this.galleryRef.next();
  }

  prev() {
    this.galleryRef.prev();
  }

  set(i: number) {
    this.galleryRef.set(i);
  }

  reset() {
    this.galleryRef.reset();
  }

  play(interval?: number) {
    this.galleryRef.play(interval);
  }

  stop() {
    this.galleryRef.stop();
  }
}
