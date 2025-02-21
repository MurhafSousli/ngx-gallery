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
  viewChild,
  contentChild,
  Signal,
  InputSignal,
  TemplateRef,
  OutputEmitterRef,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { GalleryRef } from '../services/gallery-ref';
import { GALLERY_CONFIG, GalleryConfig } from '../models/config.model';
import { BezierEasingOptions } from '../smooth-scroll';
import { GalleryImageDef } from '../directives/gallery-image-def.directive';
import { GalleryThumbDef } from '../directives/gallery-thumb-def.directive';
import { GalleryItemContext, GalleryItemDef } from '../directives/gallery-item-def.directive';
import { GalleryBoxDef, GalleryStateContext } from '../directives/gallery-box-def.directive';
import { ImgManager } from '../utils/img-manager';
import { AutoplayDirective } from '../autoplay/autoplay.directive';
import { GallerySliderComponent } from '../slider/gallery-slider.component';
import { GalleryItemData } from '../templates/items.model';

/**
 * Gallery component
 */
@Component({
  selector: 'gallery',
  host: {
    '[attr.dir]': 'dir.value',
    '[attr.debug]': 'debug()',
    '[attr.imageSize]': 'imageSize()',
    '[attr.orientation]': 'orientation()',
    '[attr.itemAutosize]': 'itemAutosize()',
    '[attr.scrollDisabled]': 'disableScroll()'
  },
  template: `
    <ng-content select="gallery-thumbs, gallery-bullets"/>

    <div class="g-box">

      <gallery-slider [class.g-debug]="debug()"
                      [template]="itemTemplate()"
                      (itemClick)="itemClick.emit($event)">
        <ng-content select="gallery-nav, gallery-counter"/>
      </gallery-slider>

      <div class="g-box-template">
        <!--        <ng-container *ngTemplateOutlet="boxTemplate(); context: { state: state(), config: config() }"/>-->
        <ng-container *ngTemplateOutlet="boxTemplate(); context: { config: config() }"/>
      </div>
    </div>
  `,
  styleUrls: ['./gallery.scss', '../debug/debug.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [AutoplayDirective],
  imports: [GallerySliderComponent, NgTemplateOutlet],
  providers: [ImgManager, GalleryRef]
})
export class GalleryComponent {

  slider: Signal<GallerySliderComponent> = viewChild(GallerySliderComponent);

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
  items: InputSignal<GalleryItemData[]> = input<GalleryItemData[]>();

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
   * Centralize slider
   */
  centralized: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.centralized, {
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
   * Automatically cycle through items at time interval
   */
  autoplay: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.autoplay, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding using mousewheel, touchpad, scroll and gestures on touch devices
   */
  disableScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableScroll, {
    transform: booleanAttribute
  });

  /**
   * Disables sliding using the mouse
   */
  disableMouseScroll: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this._config.disableMouseScroll, {
    transform: booleanAttribute
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
  // playingChange: OutputEmitterRef<GalleryState> = output<GalleryState>();

  /**
   * Stream that emits when index is changed
   */
  // indexChange: OutputEmitterRef<GalleryState> = output<GalleryState>();

  /**
   * Stream that emits when items array is changed
   */
  // itemsChange: OutputEmitterRef<GalleryState> = output<GalleryState>();

  /** @ignore */
  private _galleryItemDef: Signal<GalleryItemDef> = contentChild(GalleryItemDef);
  /** @ignore */
  private _galleryBoxDef: Signal<GalleryBoxDef> = contentChild(GalleryBoxDef);

  itemTemplate: Signal<TemplateRef<GalleryItemContext<GalleryItemData>>> = computed(() => this._galleryItemDef()?.templateRef)
  boxTemplate: Signal<TemplateRef<GalleryStateContext>> = computed(() => this._galleryBoxDef()?.templateRef)

  /** @ignore */
  config: Signal<GalleryConfig> = computed(() => {
    return {
      loop: this.loop(),
      debug: this.debug(),
      autoplay: this.autoplay(),
      imageSize: this.imageSize(),
      centralized: this.centralized(),
      scrollBehavior: this.scrollBehavior(),
      scrollEase: this.scrollEase(),
      loadingAttr: this.loadingAttr(),
      autoplayInterval: this.autoplayInterval(),
      loadingStrategy: this.loadingStrategy(),
      scrollDuration: this.scrollDuration(),
      orientation: this.orientation(),
      resizeDebounceTime: this.resizeDebounceTime(),
      disableScroll: this.disableScroll(),
      disableMouseScroll: this.disableMouseScroll(),
      itemAutosize: this.itemAutosize()
    };
  });

  constructor() {
    effect(() => {
      const config = this.config();
      untracked(() => this.galleryRef.setConfig(config));
    });

    effect(() => {
      const items = this.items();
      untracked(() => this.galleryRef.load(items));
    });
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
