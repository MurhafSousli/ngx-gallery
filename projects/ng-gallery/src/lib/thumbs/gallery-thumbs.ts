import {
  Component,
  input,
  inject,
  computed,
  linkedSignal,
  numberAttribute,
  booleanAttribute,
  Signal,
  InputSignal,
  InputSignalWithTransform
} from '@angular/core';
import { Gallery } from '../gallery';
import { Slider } from '../slider/slider';
import { GalleryLayoutDirective } from '../gallery-layout';
import { SliderItem } from '../slider-item/slider-item';
import { GalleryOptions, GalleryOrientation } from '../models/config.model';
import { GalleryDock } from '../models/config.model';
import { NavigationTarget } from '../models/slider.model';
import { GalleryThumbContext } from './gallery-thumb.token';
import { BezierEasingOptions } from '../smooth-scroll/smooth-scroll.model';
import { GALLERY_OPTIONS } from '../models/gallery.token';
import { GALLERY_A11Y_OPTIONS } from '../a11y/a11y.token';
import { GalleryA11yOptions } from '../a11y/a11y.model';
import { BASE_SLIDER_OPTIONS, BaseSliderOptions, GalleryRef } from '../gallery-ref';

function baseSliderOptionsFactory(): BaseSliderOptions {
  const globalConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  return {
    gap: globalConfig.thumbGap,
    loop: globalConfig.thumbLoop,
    steps: globalConfig.thumbSteps,
    itemSize: globalConfig.thumbSize,
    forceSnap: globalConfig.thumbForceSnap,
    snapAlign: globalConfig.thumbSnapAlign,
    itemsPerView: globalConfig.thumbPerView,
    scrollDuration: globalConfig.scrollDuration,
    disableScroll: globalConfig.disableThumbScroll,
    scrollBehavior: globalConfig.thumbScrollBehavior,
    disableMouseScroll: globalConfig.disableThumbMouseScroll
  };
}

@Component({
  host: {
    '[attr.role]': 'a11y?.thumbContainerRole ?? null',
    '[attr.aria-label]': 'a11y?.thumbContainerLabel ?? null',
    '[attr.aria-roledescription]': 'a11y?.thumbContainerRoleDescription ?? null',
    '[attr.position]': 'position()',
    '[attr.floating]': 'floating() ? "" : null',
    '[attr.scrollDisabled]': 'disableScroll() ? "" : null',
    '[style.--g-slider-thickness.px]': 'thickness()'
  },
  selector: 'gallery-thumbs',
  template: `
    <g-slider #sensor="intersectionSensor">
      @let template = itemDef().templateRef;
      @let loaderTemplate = itemLoaderDef()?.templateRef;
      @let errorTemplate = itemErrorDef()?.templateRef;
      @let visibleEntries = sensor.visibleEntries();
      @let active = gallery.activeIndex();
      @let anchor = gallery.anchorIndex();
      @for (item of items(); track i; let i = $index; let count = $count) {
        <li sliderItem
            [data]="item"
            [index]="i"
            [count]="count"
            [active]="active === i"
            [anchor]="anchor === i"
            [visible]="!!visibleEntries[i]"
            [template]="template"
            [loaderTemplate]="loaderTemplate"
            [errorTemplate]="errorTemplate"
            [isThumb]="true">
        </li>
      }
    </g-slider>

    <ng-content select="gallery-nav, [gallerySlot]"/>
  `,
  styleUrl: 'gallery-thumbs.scss',
  imports: [Slider, SliderItem],
  hostDirectives: [GalleryLayoutDirective],
  providers: [
    {
      provide: BASE_SLIDER_OPTIONS,
      useFactory: baseSliderOptionsFactory
    },
    {
      provide: GalleryRef,
      useExisting: GalleryThumbs
    },
    {
      provide: GalleryThumbContext,
      useExisting: GalleryThumbs
    }
  ]
})
export class GalleryThumbs extends GalleryRef {

  private readonly defaultConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  protected readonly a11y: GalleryA11yOptions = inject(GALLERY_A11Y_OPTIONS);

  /** @ignore */
  readonly gallery: Gallery = inject(Gallery);

  /** @ignore */
  override items: Signal<any[]> = this.gallery.items;

  /** @ignore */
  override scrollEase: Signal<BezierEasingOptions> = this.gallery.scrollEase;

  /** @ignore */
  override resizeDebounceTime: Signal<number> = this.gallery.resizeDebounceTime;

  readonly floating: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultConfig.thumbFloating, {
    transform: booleanAttribute
  });

  /**
   * De-attaching the thumbnails from the main slider
   * If enabled - thumbnails won't automatically scroll to the active thumbnails
   */
  readonly detach: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultConfig.detachThumbs, {
    transform: booleanAttribute
  });

  /**
   * Sets the thumbnails position, it also sets the sliding direction of the thumbnails accordingly
   */
  readonly position: InputSignal<GalleryDock> = input<GalleryDock>(this.defaultConfig.thumbPosition);

  /**
   * Thumbnails slider thickness in px.
   */
  readonly thickness: InputSignalWithTransform<number, string | number> = input<number, string | number>(this.defaultConfig.thumbThickness, {
    transform: numberAttribute
  });

  /**
   * Thumbnails slider orientation derived from the position.
   */
  readonly orientation: Signal<GalleryOrientation> = computed(() => {
    return (this.position() === 'top' || this.position() === 'bottom') ? 'horizontal' : 'vertical';
  });

  protected readonly navigationSource = linkedSignal<NavigationTarget, NavigationTarget>({
    source: () => {
      if (this.detach()) {
        return {
          source: 'init',
          behavior: 'auto',
          index: this.resolvedInitialIndex()
        };
      }
      return this.gallery.navigationState();
    },
    computation: (value: NavigationTarget) => {
      // The main scroll directive ignores the sync source for the main slider when it syncs with the activeIndex,
      // But thumbs scroll directive should react. therefore, the source parameter is converted to 'api' instead.
      if (value.source === 'sync') {
        return { index: value.index, source: 'api' };
      }
      return value;
    }
  });
}
