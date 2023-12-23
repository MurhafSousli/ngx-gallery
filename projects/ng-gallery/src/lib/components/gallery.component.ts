import {
  Component,
  Input,
  Output,
  ContentChild,
  booleanAttribute,
  numberAttribute,
  EventEmitter,
  OnInit,
  AfterContentInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GalleryCoreComponent } from './gallery-core.component';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryError, GalleryItem, GalleryState } from '../models/gallery.model';
import { IframeItemData, ImageItemData, VideoItemData, YoutubeItemData } from './templates/items.model';
import { GalleryConfig } from '../models/config.model';
import { BezierEasingOptions } from '../smooth-scroll';
import { GalleryImageDef } from '../directives/gallery-image-def.directive';
import { GalleryThumbDef } from '../directives/gallery-thumb-def.directive';
import { GalleryItemDef } from '../directives/gallery-item-def.directive';
import { GalleryBoxDef } from '../directives/gallery-box-def.directive';
import { ImgManager } from '../utils/img-manager';
import { AutoplayDirective } from '../autoplay/autoplay.directive';

/**
 * Gallery component
 */
@Component({
  selector: 'gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gallery.scss'],
  template: `
    <gallery-core autoplay
                  [galleryId]="id"
                  [state]="galleryRef.state | async"
                  [config]="galleryRef.config | async"
                  (itemClick)="onItemClick($event)"
                  (thumbClick)="onThumbClick($event)"
                  (error)="onError($event)"/>
  `,
  standalone: true,
  imports: [CommonModule, GalleryCoreComponent, AutoplayDirective],
  providers: [ImgManager]
})
export class GalleryComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {

  /**
   * The gallery reference instance
   */
  galleryRef: GalleryRef;

  /**
   * The gallery instance unique id, required if more multiple gallery instances
   */
  @Input() id: string = 'root';

  /**
   * Loads the items array into the gallery
   */
  @Input() items: GalleryItem [];

  /**
   * Displays the navigation buttons
   */
  @Input({ transform: booleanAttribute }) nav: boolean = this._gallery.config.nav;

  /**
   * Displays the navigation bullets
   */
  @Input({ transform: booleanAttribute }) bullets: boolean = this._gallery.config.bullets;

  /**
   * Enables loop cycling
   */
  @Input({ transform: booleanAttribute }) loop: boolean = this._gallery.config.loop;

  /**
   * Show visuals that helps debugging the component
   */
  @Input({ transform: booleanAttribute }) debug: boolean = this._gallery.config.debug;

  /**
   * Displays the thumbnails
   */
  @Input({ transform: booleanAttribute }) thumbs: boolean = this._gallery.config.thumbs;

  /**
   * Displays the counter or pagination
   */
  @Input({ transform: booleanAttribute }) counter: boolean = this._gallery.config.counter;

  /**
   * De-attaching the thumbnails from the main slider
   * If enabled - thumbnails won't automatically scroll to the active thumbnails
   */
  @Input({ transform: booleanAttribute }) detachThumbs: boolean = this._gallery.config.detachThumbs;

  /**
   * Fits each thumbnail size to its content
   */
  @Input({ transform: booleanAttribute }) thumbAutosize: boolean = this._gallery.config.thumbAutosize;

  /**
   * Fits each item size to its content, This option should be used with:
   * - Does not work if `autoHeight` is turned on
   * - Does not work properly unless `loadingAttr="eager"`
   * - Does not work properly unless `loadingStrategy="preload"`
   */
  @Input({ transform: booleanAttribute }) itemAutosize: boolean = this._gallery.config.itemAutosize;

  /**
   * Automatically adjusts the gallery's height to fit the content
   */
  @Input({ transform: booleanAttribute }) autoHeight: boolean = this._gallery.config.autoHeight;

  /**
   * Automatically cycle through items at time interval
   */
  @Input({ transform: booleanAttribute }) autoplay: boolean = this._gallery.config.autoplay;

  /**
   * Disables thumbnails' clicks
   */
  @Input({ transform: booleanAttribute }) disableThumbs: boolean = this._gallery.config.disableThumbs;

  /**
   * Disables bullets' clicks
   */
  @Input({ transform: booleanAttribute }) disableBullets: boolean = this._gallery.config.disableBullets;

  /**
   * Disables sliding using mousewheel, touchpad, scroll and gestures on touch devices
   */
  @Input({ transform: booleanAttribute }) disableScroll: boolean = this._gallery.config.disableScroll;

  /**
   * Disables sliding of thumbnails using touchpad, scroll and gestures on touch devices
   */
  @Input({ transform: booleanAttribute }) disableThumbScroll: boolean = this._gallery.config.disableThumbScroll;

  /**
   * Force centralizing the active thumbnail
   */
  @Input({ transform: booleanAttribute }) thumbCentralized: boolean = this._gallery.config.thumbCentralized;

  /**
   * Disables sliding using the mouse
   */
  @Input({ transform: booleanAttribute }) disableMouseScroll: boolean = this._gallery.config.disableMouseScroll;

  /**
   * Disables sliding of thumbnails using the mouse
   */
  @Input({ transform: booleanAttribute }) disableThumbMouseScroll: boolean = this._gallery.config.disableThumbMouseScroll;

  /**
   * Sets the size of the bullets navigation
   */
  @Input({ transform: numberAttribute }) bulletSize: number = this._gallery.config.bulletSize;

  /**
   * Sets the thumbnail's width
   */
  @Input({ transform: numberAttribute }) thumbWidth: number = this._gallery.config.thumbWidth;

  /**
   * Sets the thumbnail's height
   */
  @Input({ transform: numberAttribute }) thumbHeight: number = this._gallery.config.thumbHeight;

  /**
   * Sets the interval used for the autoplay feature
   */
  @Input({ transform: numberAttribute }) autoplayInterval: number = this._gallery.config.autoplayInterval;

  /**
   * Sets the duration used for smooth navigation between the items
   */
  @Input({ transform: numberAttribute }) scrollDuration: number = this._gallery.config.scrollDuration;

  /**
   * Sets the debounce time used to throttle the gallery update after it is resized
   */
  @Input({ transform: numberAttribute }) resizeDebounceTime: number = this._gallery.config.resizeDebounceTime;

  /**
   * Sets the scroll behavior when the active item is changed
   */
  @Input() scrollBehavior: ScrollBehavior = this._gallery.config.scrollBehavior;

  /**
   * Sets the ease function used for smooth navigation between the items
   */
  @Input() scrollEase: BezierEasingOptions = this._gallery.config.scrollEase;

  /**
   * Sets the object-fit style applied on items' images
   */
  @Input() imageSize: 'cover' | 'contain' = this._gallery.config.imageSize;

  /**
   * Sets the object-fit style applied on thumbnails' images
   */
  @Input() thumbImageSize: 'cover' | 'contain' = this._gallery.config.thumbImageSize;

  /**
   * Sets the bullets navigation position
   */
  @Input() bulletPosition: 'top' | 'bottom' = this._gallery.config.bulletPosition;

  /**
   * Sets the counter navigation position
   */
  @Input() counterPosition: 'top' | 'bottom' = this._gallery.config.counterPosition;

  /**
   * Sets the sliding direction
   */
  @Input() orientation: 'horizontal' | 'vertical' = this._gallery.config.orientation;

  /**
   * Sets the loading attribute applied on the items' images
   */
  @Input() loadingAttr: 'eager' | 'lazy' = this._gallery.config.loadingAttr;

  /**
   * Sets the loading strategy used for displaying the items
   * - `lazy` renders only the active item
   * - `default` renders only the active item, the previous item and the next item
   * - `preload` renders all the items, this option is required for `thumbAutoSize` is enabled
   */
  @Input() loadingStrategy: 'preload' | 'lazy' | 'default' = this._gallery.config.loadingStrategy;

  /**
   * Sets the thumbnails position, it also sets the sliding direction of the thumbnails accordingly
   */
  @Input() thumbPosition: 'top' | 'left' | 'right' | 'bottom' = this._gallery.config.thumbPosition;

  /**
   * Destroy gallery ref on component destroy event
   * This intended to be used and disabled from the lightbox component
   * @ignore
   * */
  @Input() destroyRef: boolean = true;

  /**
   * Skip initializing the config with components inputs (Lightbox mode)
   * This intended to be used and enabled from the lightbox component
   * @ignore
   */
  @Input() skipInitConfig: boolean = false;

  /**
   * Stream that emits when an item is clicked
   */
  @Output() itemClick: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Stream that emits when a thumbnail is clicked
   */
  @Output() thumbClick: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Stream that emits when player state is changed
   */
  @Output() playingChange: EventEmitter<GalleryState> = new EventEmitter<GalleryState>();

  /**
   * Stream that emits when index is changed
   */
  @Output() indexChange: EventEmitter<GalleryState> = new EventEmitter<GalleryState>();

  /**
   * Stream that emits when items array is changed
   */
  @Output() itemsChange: EventEmitter<GalleryState> = new EventEmitter<GalleryState>();

  /**
   * Stream that emits when an error occurs, this would emit for loading errors of image and video items only
   */
  @Output() error: EventEmitter<GalleryError> = new EventEmitter<GalleryError>();

  /** @ignore */
  @ContentChild(GalleryItemDef) private _galleryItemDef: GalleryItemDef;
  /** @ignore */
  @ContentChild(GalleryImageDef) private _galleryImageDef: GalleryImageDef;
  /** @ignore */
  @ContentChild(GalleryThumbDef) private _galleryThumbDef: GalleryThumbDef;
  /** @ignore */
  @ContentChild(GalleryBoxDef) private _galleryBoxDef: GalleryBoxDef;

  /** @ignore */
  private _itemClick$: Subscription;
  /** @ignore */
  private _thumbClick$: Subscription;
  /** @ignore */
  private _itemChange$: Subscription;
  /** @ignore */
  private _indexChange$: Subscription;
  /** @ignore */
  private _playingChange$: Subscription;

  constructor(private _gallery: Gallery) {
  }

  /** @ignore */
  private getConfig(): GalleryConfig {
    return {
      nav: this.nav,
      bullets: this.bullets,
      loop: this.loop,
      debug: this.debug,
      thumbs: this.thumbs,
      counter: this.counter,
      autoplay: this.autoplay,
      bulletSize: this.bulletSize,
      imageSize: this.imageSize,
      thumbImageSize: this.thumbImageSize,
      scrollBehavior: this.scrollBehavior,
      thumbCentralized: this.thumbCentralized,
      thumbWidth: this.thumbWidth,
      thumbHeight: this.thumbHeight,
      scrollEase: this.scrollEase,
      bulletPosition: this.bulletPosition,
      loadingAttr: this.loadingAttr,
      detachThumbs: this.detachThumbs,
      thumbPosition: this.thumbPosition,
      autoplayInterval: this.autoplayInterval,
      counterPosition: this.counterPosition,
      loadingStrategy: this.loadingStrategy,
      scrollDuration: this.scrollDuration,
      orientation: this.orientation,
      resizeDebounceTime: this.resizeDebounceTime,
      disableBullets: this.disableBullets,
      disableThumbs: this.disableThumbs,
      disableScroll: this.disableScroll,
      disableThumbScroll: this.disableThumbScroll,
      disableMouseScroll: this.disableMouseScroll,
      disableThumbMouseScroll: this.disableThumbMouseScroll,
      thumbAutosize: this.thumbAutosize,
      itemAutosize: this.itemAutosize,
      autoHeight: this.autoHeight
    };
  }


  /** @ignore */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.galleryRef) {
      this.galleryRef.setConfig(this.getConfig());

      if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
        this.load(this.items);
      }
    }
  }


  /** @ignore */
  ngOnInit(): void {
    // Get gallery instance by id
    if (this.skipInitConfig) {
      this.galleryRef = this._gallery.ref(this.id);
    } else {
      this.galleryRef = this._gallery.ref(this.id, this.getConfig());
    }

    // Load gallery items
    this.load(this.items);

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
  }

  /** @ignore */
  ngAfterContentInit(): void {
    const templateConfig: GalleryConfig = {};
    if (this._galleryItemDef) {
      templateConfig.itemTemplate = this._galleryItemDef.templateRef;
    }
    if (this._galleryImageDef) {
      templateConfig.imageTemplate = this._galleryImageDef.templateRef;
    }
    if (this._galleryThumbDef) {
      templateConfig.thumbTemplate = this._galleryThumbDef.templateRef;
    }
    if (this._galleryBoxDef) {
      templateConfig.boxTemplate = this._galleryBoxDef.templateRef;
    }
    if (Object.keys(templateConfig).length) {
      this.galleryRef.setConfig(templateConfig);
    }
  }

  /** @ignore */
  ngOnDestroy(): void {
    this._itemClick$?.unsubscribe();
    this._thumbClick$?.unsubscribe();
    this._itemChange$?.unsubscribe();
    this._indexChange$?.unsubscribe();
    this._playingChange$?.unsubscribe();
    if (this.destroyRef) {
      this.galleryRef?.destroy();
    }
  }

  /** @ignore */
  onItemClick(i: number): void {
    this.itemClick.emit(i);
    this.galleryRef.itemClick.next(i);
  }

  /** @ignore */
  onThumbClick(i: number): void {
    this.galleryRef.set(i);
    this.thumbClick.emit(i);
    this.galleryRef.thumbClick.next(i);
  }

  /** @ignore */
  onError(err: GalleryError): void {
    this.error.emit(err);
    this.galleryRef.error.next(err);
  }

  /**
   * Load items and reset the state
   */
  load(items: GalleryItem[]): void {
    this.galleryRef.load(items);
  }

  /**
   * Add gallery item, it can be any item, suitable to add item with a custom template
   */
  add(item: GalleryItem, active?: boolean): void {
    this.galleryRef.add(item, active);
  }

  /**
   * Add image item
   */
  addImage(data: ImageItemData, active?: boolean): void {
    this.galleryRef.addImage(data, active);
  }

  /**
   * Add video item
   */
  addVideo(data: VideoItemData, active?: boolean): void {
    this.galleryRef.addVideo(data, active);
  }

  /**
   * Add iframe item
   */
  addIframe(data: IframeItemData, active?: boolean): void {
    this.galleryRef.addIframe(data, active);
  }

  /**
   * Add Youtube item
   */
  addYoutube(data: YoutubeItemData, active?: boolean): void {
    this.galleryRef.addYoutube(data, active);
  }

  /**
   * Remove gallery item by index
   */
  remove(i: number): void {
    this.galleryRef.remove(i);
  }

  /**
   * Go to next item
   */
  next(behavior?: ScrollBehavior, loop?: boolean): void {
    this.galleryRef.next(behavior, loop);
  }

  /**
   * Go to prev item
   */
  prev(behavior?: ScrollBehavior, loop?: boolean): void {
    this.galleryRef.prev(behavior, loop);
  }

  /**
   * Set active item
   */
  set(i: number, behavior?: ScrollBehavior): void {
    this.galleryRef.set(i, behavior);
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    this.galleryRef.reset();
  }

  /**
   * Start the player
   */
  play(interval?: number): void {
    this.galleryRef.play(interval);
  }

  /**
   * Stop the player
   */
  stop(): void {
    this.galleryRef.stop();
  }
}
