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
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryError, GalleryItem, GalleryState } from '../models/gallery.model';
import { IframeItemData, ImageItemData, VideoItemData, YoutubeItemData } from './templates/items.model';
import { GalleryConfig } from '../models/config.model';
import { BezierEasingOptions } from '../smooth-scroll';

@Component({
  selector: 'gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../styles/gallery.scss'],
  template: `
    <gallery-core [galleryId]="id"
                  [state]="galleryRef.state | async"
                  [config]="galleryRef.config | async"
                  (itemClick)="onItemClick($event)"
                  (thumbClick)="onThumbClick($event)"
                  (error)="onError($event)"></gallery-core>
  `
})
export class GalleryComponent implements OnInit, OnChanges, OnDestroy {

  galleryRef: GalleryRef;
  @Input() id: string;
  @Input() items: GalleryItem [];
  @Input() nav: boolean = this._gallery.config.nav;
  @Input() dots: boolean = this._gallery.config.dots;
  @Input() loop: boolean = this._gallery.config.loop;
  @Input() debug: boolean = this._gallery.config.debug;
  @Input() thumb: boolean = this._gallery.config.thumb;
  @Input() counter: boolean = this._gallery.config.counter;
  @Input() dotsSize: number = this._gallery.config.dotsSize;
  @Input() autoPlay: boolean = this._gallery.config.autoPlay;
  @Input() thumbWidth: number = this._gallery.config.thumbWidth;
  @Input() thumbHeight: number = this._gallery.config.thumbHeight;
  @Input() disableThumb: boolean = this._gallery.config.disableThumb;
  @Input() scrollBehavior: ScrollBehavior = this._gallery.config.scrollBehavior;
  @Input() navScrollBehavior: ScrollBehavior = this._gallery.config.navScrollBehavior;
  @Input() slidingDisabled: boolean = this._gallery.config.slidingDisabled;
  @Input() thumbSlidingDisabled: boolean = this._gallery.config.thumbSlidingDisabled;
  @Input() mouseSlidingDisabled: boolean = this._gallery.config.mouseSlidingDisabled;
  @Input() thumbMouseSlidingDisabled: boolean = this._gallery.config.thumbMouseSlidingDisabled;
  @Input() playerInterval: number = this._gallery.config.playerInterval;
  @Input() slidingDuration: number = this._gallery.config.slidingDuration;
  @Input() slidingEase: BezierEasingOptions = this._gallery.config.slidingEase;
  @Input() boxTemplate: TemplateRef<any> = this._gallery.config.boxTemplate;
  @Input() itemTemplate: TemplateRef<any> = this._gallery.config.itemTemplate;
  @Input() thumbTemplate: TemplateRef<any> = this._gallery.config.thumbTemplate;
  @Input() resizeDebounceTime: number = this._gallery.config.resizeDebounceTime;
  @Input() imageSize: 'cover' | 'contain' = this._gallery.config.imageSize;
  @Input() thumbImageSize: 'cover' | 'contain' = this._gallery.config.thumbImageSize;
  @Input() dotsPosition: 'top' | 'bottom' = this._gallery.config.dotsPosition;
  @Input() counterPosition: 'top' | 'bottom' = this._gallery.config.counterPosition;
  @Input() slidingDirection: 'horizontal' | 'vertical' = this._gallery.config.slidingDirection;
  @Input() loadingStrategy: 'preload' | 'lazy' | 'default' = this._gallery.config.loadingStrategy;
  @Input() thumbPosition: 'top' | 'left' | 'right' | 'bottom' = this._gallery.config.thumbPosition;
  @Input() thumbView: 'default' | 'contain' = this._gallery.config.thumbView;
  @Input() thumbDetached: boolean = this._gallery.config.thumbDetached;
  @Input() thumbAutosize: boolean = this._gallery.config.thumbAutosize;
  @Input() itemAutosize: boolean = this._gallery.config.itemAutosize;
  @Input() autoHeight: boolean = this._gallery.config.autoHeight;

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

  constructor(private _gallery: Gallery) {
  }

  private getConfig(): GalleryConfig {
    return {
      nav: this.nav,
      dots: this.dots,
      loop: this.loop,
      debug: this.debug,
      thumb: this.thumb,
      counter: this.counter,
      autoPlay: this.autoPlay,
      dotsSize: this.dotsSize,
      imageSize: this.imageSize,
      thumbImageSize: this.thumbImageSize,
      scrollBehavior: this.scrollBehavior,
      navScrollBehavior: this.navScrollBehavior,
      thumbView: this.thumbView,
      thumbWidth: this.thumbWidth,
      thumbHeight: this.thumbHeight,
      slidingEase: this.slidingEase,
      disableThumb: this.disableThumb,
      dotsPosition: this.dotsPosition,
      boxTemplate: this.boxTemplate,
      itemTemplate: this.itemTemplate,
      thumbTemplate: this.thumbTemplate,
      thumbDetached: this.thumbDetached,
      thumbPosition: this.thumbPosition,
      playerInterval: this.playerInterval,
      counterPosition: this.counterPosition,
      loadingStrategy: this.loadingStrategy,
      slidingDuration: this.slidingDuration,
      slidingDirection: this.slidingDirection,
      resizeDebounceTime: this.resizeDebounceTime,
      slidingDisabled: this.slidingDisabled,
      thumbSlidingDisabled: this.thumbSlidingDisabled,
      mouseSlidingDisabled: this.mouseSlidingDisabled,
      thumbMouseSlidingDisabled: this.thumbMouseSlidingDisabled,
      thumbAutosize: this.thumbAutosize,
      itemAutosize: this.itemAutosize,
      autoHeight: this.autoHeight,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.galleryRef) {
      this.galleryRef.setConfig(this.getConfig());

      if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
        this.load(this.items);
      }
    }
  }

  ngOnInit(): void {
    // Get gallery instance by id
    if (this.skipInitConfig) {
      this.galleryRef = this._gallery.ref(this.id);
    } else {
      this.galleryRef = this._gallery.ref(this.id, this.getConfig());
    }

    // Load gallery items
    this.load(this.items);

    // Activate player listener
    this._playerListener$ = this.galleryRef.activatePlayer().subscribe();

    // Subscribes to events on demand
    if (this.indexChange.observed) {
      this._indexChange$ = this.galleryRef.indexChanged.subscribe((state: GalleryState) => this.indexChange.emit(state));
    }
    if (this.itemsChange.observed) {
      this._itemChange$ = this.galleryRef.itemsChanged.subscribe((state: GalleryState) => this.itemsChange.emit(state));
    }
    if (this.playingChange.observed) {
      this._playingChange$ = this.galleryRef.playingChanged.subscribe((state: GalleryState) => this.playingChange.emit(state));
    }

    // Start playing if autoplay is set to true
    if (this.autoPlay) {
      this.play();
    }
  }

  ngOnDestroy(): void {
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

  onItemClick(i: number): void {
    this.itemClick.emit(i);
    this.galleryRef.itemClick.next(i);
  }

  onThumbClick(i: number): void {
    this.galleryRef.set(i);
    this.thumbClick.emit(i);
    this.galleryRef.thumbClick.next(i);
  }

  onError(err: GalleryError): void {
    this.error.emit(err);
    this.galleryRef.error.next(err);
  }

  load(items: GalleryItem[]): void {
    this.galleryRef.load(items);
  }

  add(item: GalleryItem, active?: boolean): void {
    this.galleryRef.add(item, active);
  }

  addImage(data: ImageItemData, active?: boolean): void {
    this.galleryRef.addImage(data, active);
  }

  addVideo(data: VideoItemData, active?: boolean): void {
    this.galleryRef.addVideo(data, active);
  }

  addIframe(data: IframeItemData, active?: boolean): void {
    this.galleryRef.addIframe(data, active);
  }

  addYoutube(data: YoutubeItemData, active?: boolean): void {
    this.galleryRef.addYoutube(data, active);
  }

  remove(i: number): void {
    this.galleryRef.remove(i);
  }

  next(behavior?: ScrollBehavior, loop?: boolean): void {
    this.galleryRef.next(behavior, loop);
  }

  prev(behavior?: ScrollBehavior, loop?: boolean): void {
    this.galleryRef.prev(behavior, loop);
  }

  set(i: number, behavior?: ScrollBehavior): void {
    this.galleryRef.set(i, behavior);
  }

  reset(): void {
    this.galleryRef.reset();
  }

  play(interval?: number): void {
    this.galleryRef.play(interval);
  }

  stop(): void {
    this.galleryRef.stop();
  }
}
