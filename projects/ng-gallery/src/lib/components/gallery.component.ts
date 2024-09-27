import {
  Component,
  inject,
  output,
  booleanAttribute,
  numberAttribute,
  computed,
  effect,
  untracked,
  input,
  contentChild,
  Signal,
  InputSignal,
  OutputEmitterRef,
  ChangeDetectionStrategy,
  InputSignalWithTransform, TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryError, GalleryItem, GalleryState } from '../models/gallery.model';
import { IframeItemData, ImageItemData, VideoItemData, VimeoItemData, YoutubeItemData } from './templates/items.model';
import { GALLERY_CONFIG, GalleryConfig } from '../models/config.model';
import { BezierEasingOptions } from '../smooth-scroll';
import { GalleryImageDef } from '../directives/gallery-image-def.directive';
import { GalleryThumbDef } from '../directives/gallery-thumb-def.directive';
import { GalleryItemDef } from '../directives/gallery-item-def.directive';
import { GalleryBoxDef, GalleryStateContext } from '../directives/gallery-box-def.directive';
import { ImgManager } from '../utils/img-manager';
import { AutoplayDirective } from '../autoplay/autoplay.directive';
import { GalleryBulletsComponent } from './gallery-bullets.component';
import { GalleryCounterComponent } from './gallery-counter.component';
import { GalleryNavComponent } from './gallery-nav.component';
import { GallerySliderComponent } from './gallery-slider.component';
import { GalleryThumbsComponent } from './gallery-thumbs.component';

/**
 * Gallery component
 */
@Component({
  standalone: true,
  host: {
    '[attr.dir]': 'dir.value',
    '[attr.debug]': 'debug()',
    '[attr.imageSize]': 'imageSize()',
    '[attr.autoHeight]': 'autoHeight()',
    '[attr.orientation]': 'orientation()',
    '[attr.itemAutosize]': 'itemAutosize()',
    '[attr.thumbAutosize]': 'thumbAutosize()',
    '[attr.thumbPosition]': 'thumbPosition()',
    '[attr.thumbDisabled]': 'disableThumbs()',
    '[attr.scrollDisabled]': 'disableScroll()',
    '[attr.bulletDisabled]': 'disableBullets()',
    '[attr.bulletPosition]': 'bulletPosition()',
    '[attr.thumbImageSize]': 'thumbImageSize()',
    '[attr.counterPosition]': 'counterPosition()',
    '[attr.thumbScrollDisabled]': 'disableThumbScroll()',
    '[style.--g-thumb-width.px]': 'thumbWidth()',
    '[style.--g-thumb-height.px]': 'thumbHeight()'
  },
  selector: 'gallery',
  template: `
    @if (thumbs()) {
      <gallery-thumbs [galleryId]="id()"
                      (thumbClick)="thumbClick.emit($event)"
                      (error)="error.emit($event)"/>
    }

    <div class="g-box">
      <gallery-slider [class.g-debug]="debug()"
                      [galleryId]="id()"
                      (itemClick)="itemClick.emit($event)"
                      (error)="error.emit($event)">

        @if (nav() && galleryRef.items().length > 1) {
          <gallery-nav/>
        }
      </gallery-slider>

      @if (bullets()) {
        <gallery-bullets/>
      }

      @if (counter()) {
        <gallery-counter/>
      }

      <div class="g-box-template">
<!--        <ng-container *ngTemplateOutlet="boxTemplate(); context: { state: state(), config: config() }"/>-->
        <ng-container *ngTemplateOutlet="boxTemplate(); context: {config: config() }"/>
      </div>
    </div>
  `,
  styleUrls: ['./gallery.scss', '../styles/debug.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [AutoplayDirective],
  imports: [
    AutoplayDirective,
    GalleryBulletsComponent,
    GalleryCounterComponent,
    GalleryNavComponent,
    GallerySliderComponent,
    GalleryThumbsComponent,
    NgTemplateOutlet
  ],
  providers: [ImgManager, GalleryRef]
})
export class GalleryComponent {

  /**
   * The gallery reference instance
   */
  readonly galleryRef: GalleryRef = inject(GalleryRef);


  readonly dir: Directionality = inject(Directionality);

  /**
   * @ignore
   */
  private _config: GalleryConfig = inject(GALLERY_CONFIG);

  /**
   * The gallery instance unique id, required if more multiple gallery instances
   */
  id: InputSignal<string> = input<string>('root');

  /**
   * Loads the items array into the gallery
   */
  items: InputSignal<GalleryItem[]> = input<GalleryItem[]>();

  /**
   * Displays the navigation buttons
   */
  nav: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.nav, {
    transform: booleanAttribute
  });

  /**
   * Displays the navigation bullets
   */
  bullets: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.bullets, {
    transform: booleanAttribute
  });

  /**
   * Enables loop cycling
   */
  loop: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.loop, {
    transform: booleanAttribute
  });

  /**
   * Show visuals that helps debugging the component
   */
  debug: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.debug, {
    transform: booleanAttribute
  });

  /**
   * Displays the thumbnails
   */
  thumbs: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.thumbs, {
    transform: booleanAttribute
  });

  /**
   * Displays the counter or pagination
   */
  counter: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.counter, {
    transform: booleanAttribute
  });

  /**
   * De-attaching the thumbnails from the main slider
   * If enabled - thumbnails won't automatically scroll to the active thumbnails
   */
  detachThumbs: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.detachThumbs, {
    transform: booleanAttribute
  });

  /**
   * Fits each thumbnail size to its content
   */
  thumbAutosize: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.thumbAutosize, {
    transform: booleanAttribute
  });

  /**
   * Fits each item size to its content, This option should be used with:
   * - Does not work if `autoHeight` is turned on
   * - Does not work properly unless `loadingAttr="eager"`
   * - Does not work properly unless `loadingStrategy="preload"`
   */
  itemAutosize: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.itemAutosize, {
    transform: booleanAttribute
  });

  /**
   * Automatically adjusts the gallery's height to fit the content
   */
  autoHeight: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.autoHeight, {
    transform: booleanAttribute
  });

  /**
   * Automatically cycle through items at time interval
   */
  autoplay: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.autoplay, {
    transform: booleanAttribute
  });

  /**
   * Disables thumbnails' clicks
   */
  disableThumbs: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableThumbs, {
    transform: booleanAttribute
  });

  /**
   * Disables bullets' clicks
   */
  disableBullets: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableBullets, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding using mousewheel, touchpad, scroll and gestures on touch devices
   */
  disableScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableScroll, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding of thumbnails using touchpad, scroll and gestures on touch devices
   */
  disableThumbScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableThumbScroll, {
    transform: booleanAttribute
  });

  /**
   * Force centralizing the active thumbnail
   */
  thumbCentralized: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.thumbCentralized, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding using the mouse
   */
  disableMouseScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableMouseScroll, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding of thumbnails using the mouse
   */
  disableThumbMouseScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableThumbMouseScroll, {
    transform: booleanAttribute
  });

  /**
   * Sets the size of the bullets navigation
   */
  bulletSize: InputSignalWithTransform<number, string | number> = input<number, string | number>(this._config.bulletSize, {
    transform: numberAttribute
  });

  /**
   * Sets the thumbnail's width
   */
  thumbWidth: InputSignalWithTransform<number, string | number> = input<number, string | number>(this._config.thumbWidth, {
    transform: numberAttribute
  });

  /**
   * Sets the thumbnail's height
   */
  thumbHeight: InputSignalWithTransform<number, string | number> = input<number, string | number>(this._config.thumbHeight, {
    transform: numberAttribute
  });

  /**
   * Sets the interval used for the autoplay feature
   */
  autoplayInterval: InputSignalWithTransform<number, string | number> = input<number, string | number>(this._config.autoplayInterval, {
    transform: numberAttribute
  });

  /**
   * Sets the duration used for smooth navigation between the items
   */
  scrollDuration: InputSignalWithTransform<number, string | number> = input<number, string | number>(this._config.scrollDuration, {
    transform: numberAttribute
  });

  /**
   * Sets the debounce time used to throttle the gallery update after it is resized
   */
  resizeDebounceTime: InputSignalWithTransform<number, string | number> = input<number, string | number>(this._config.resizeDebounceTime, {
    transform: numberAttribute
  });

  /**
   * Sets the scroll behavior when the active item is changed
   */
  scrollBehavior: InputSignal<ScrollBehavior> = input<ScrollBehavior>(this._config.scrollBehavior);

  /**
   * Sets the ease function used for smooth navigation between the items
   */
  scrollEase: InputSignal<BezierEasingOptions> = input<BezierEasingOptions>(this._config.scrollEase);

  /**
   * Sets the object-fit style applied on items' images
   */
  imageSize: InputSignal<'cover' | 'contain'> = input<'cover' | 'contain'>(this._config.imageSize);

  /**
   * Sets the object-fit style applied on thumbnails' images
   */
  thumbImageSize: InputSignal<'cover' | 'contain'> = input<'cover' | 'contain'>(this._config.thumbImageSize);

  /**
   * Sets the bullets navigation position
   */
  bulletPosition: InputSignal<'top' | 'bottom'> = input<'top' | 'bottom'>(this._config.bulletPosition);

  /**
   * Sets the counter navigation position
   */
  counterPosition: InputSignal<'top' | 'bottom'> = input<'top' | 'bottom'>(this._config.counterPosition);

  /**
   * Sets the sliding direction
   */
  orientation: InputSignal<'horizontal' | 'vertical'> = input<'horizontal' | 'vertical'>(this._config.orientation);

  /**
   * Sets the loading attribute applied on the items' images
   */
  loadingAttr: InputSignal<'eager' | 'lazy'> = input<'eager' | 'lazy'>(this._config.loadingAttr);

  /**
   * Sets the loading strategy used for displaying the items
   * - `lazy` renders only the active item
   * - `default` renders only the active item, the previous item and the next item
   * - `preload` renders all the items, this option is required for `thumbAutoSize` is enabled
   */
  loadingStrategy: InputSignal<'preload' | 'lazy' | 'default'> = input<'preload' | 'lazy' | 'default'>(this._config.loadingStrategy);

  /**
   * Sets the thumbnails position, it also sets the sliding direction of the thumbnails accordingly
   */
  thumbPosition: InputSignal<'top' | 'left' | 'right' | 'bottom'> = input<'top' | 'left' | 'right' | 'bottom'>(this._config.thumbPosition);

  /**
   * Skip initializing the config with components inputs (Lightbox mode)
   * This intended to be used and enabled from the lightbox component
   * @ignore
   */
  skipInitConfig: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  /**
   * Stream that emits when an item is clicked
   */
  itemClick: OutputEmitterRef<number> = output<number>();

  /**
   * Stream that emits when a thumbnail is clicked
   */
  thumbClick: OutputEmitterRef<number> = output<number>();

  /**
   * Stream that emits when player state is changed
   */
  playingChange: OutputEmitterRef<GalleryState> = output<GalleryState>();

  /**
   * Stream that emits when index is changed
   */
  indexChange: OutputEmitterRef<GalleryState> = output<GalleryState>();

  /**
   * Stream that emits when items array is changed
   */
  itemsChange: OutputEmitterRef<GalleryState> = output<GalleryState>();

  /**
   * Stream that emits when an error occurs, this would emit for loading errors of image and video items only
   */
  error: OutputEmitterRef<GalleryError> = output<GalleryError>();

  /** @ignore */
  private _galleryItemDef: Signal<GalleryItemDef> = contentChild(GalleryItemDef);
  /** @ignore */
  private _galleryImageDef: Signal<GalleryImageDef> = contentChild(GalleryImageDef);
  /** @ignore */
  private _galleryThumbDef: Signal<GalleryThumbDef> = contentChild(GalleryThumbDef);
  /** @ignore */
  private _galleryBoxDef: Signal<GalleryBoxDef> = contentChild(GalleryBoxDef);

  itemTemplate: Signal<TemplateRef<GalleryStateContext>> = computed(() => this._galleryItemDef()?.templateRef)
  thumbTemplate: Signal<TemplateRef<GalleryStateContext>> = computed(() => this._galleryImageDef()?.templateRef)
  imageTemplate: Signal<TemplateRef<GalleryStateContext>> = computed(() => this._galleryThumbDef()?.templateRef)
  boxTemplate: Signal<TemplateRef<GalleryStateContext>> = computed(() => this._galleryBoxDef()?.templateRef)

  /** @ignore */
  config: Signal<GalleryConfig> = computed(() => {
    return {
      itemTemplate: this.itemTemplate(),
      imageTemplate: this.thumbTemplate(),
      thumbTemplate: this.imageTemplate(),
      boxTemplate: this.boxTemplate(),
      nav: this.nav(),
      bullets: this.bullets(),
      loop: this.loop(),
      debug: this.debug(),
      thumbs: this.thumbs(),
      counter: this.counter(),
      autoplay: this.autoplay(),
      bulletSize: this.bulletSize(),
      imageSize: this.imageSize(),
      thumbImageSize: this.thumbImageSize(),
      scrollBehavior: this.scrollBehavior(),
      thumbCentralized: this.thumbCentralized(),
      thumbWidth: this.thumbWidth(),
      thumbHeight: this.thumbHeight(),
      scrollEase: this.scrollEase(),
      bulletPosition: this.bulletPosition(),
      loadingAttr: this.loadingAttr(),
      detachThumbs: this.detachThumbs(),
      thumbPosition: this.thumbPosition(),
      autoplayInterval: this.autoplayInterval(),
      counterPosition: this.counterPosition(),
      loadingStrategy: this.loadingStrategy(),
      scrollDuration: this.scrollDuration(),
      orientation: this.orientation(),
      resizeDebounceTime: this.resizeDebounceTime(),
      disableBullets: this.disableBullets(),
      disableThumbs: this.disableThumbs(),
      disableScroll: this.disableScroll(),
      disableThumbScroll: this.disableThumbScroll(),
      disableMouseScroll: this.disableMouseScroll(),
      disableThumbMouseScroll: this.disableThumbMouseScroll(),
      thumbAutosize: this.thumbAutosize(),
      itemAutosize: this.itemAutosize(),
      autoHeight: this.autoHeight()
    };
  });

  constructor() {
    effect(() => {
      const config = this.config();
      untracked(() => {
        this.galleryRef.setConfig(config);
      });
    });

    effect(() => {
      const items = this.items();
      untracked(() => {
        this.load(items);
      });
    });
  }


  /** @ignore */
  // ngOnInit(): void {
  // Subscribes to events on demand
  // if (this.indexChange.observed) {
  //   this._indexChange$ = this.galleryRef.indexChanged.subscribe((i) => this.indexChange.emit(i));
  // }
  // if (this.itemsChange.observed) {
  //   this._itemChange$ = this.galleryRef.itemsChanged.subscribe((i) => this.itemsChange.emit());
  // }
  // TODO: _playingChange$ is broken
  // if (this.playingChange.observed) {
  //   this._playingChange$ = this.galleryRef.playingChanged.subscribe(() => this.playingChange.emit());
  // }
  // }

  /** @ignore */
  // ngOnDestroy(): void {
  //   this._itemClick$?.unsubscribe();
  //   this._thumbClick$?.unsubscribe();
  //   this._itemChange$?.unsubscribe();
  //   this._indexChange$?.unsubscribe();
  //   this._playingChange$?.unsubscribe();
  // }

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
   * Add Vimeo item
   */
  addVimeo(data: VimeoItemData, active?: boolean): void {
    this.galleryRef.addVimeo(data, active);
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
