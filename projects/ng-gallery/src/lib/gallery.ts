import {
  Component,
  input,
  inject,
  signal,
  computed,
  untracked,
  linkedSignal,
  numberAttribute,
  Signal,
  InputSignal,
  WritableSignal,
  InputSignalWithTransform
} from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { GalleryLayoutDirective } from './gallery-layout';
import { Slider } from './slider/slider';
import { SliderItem } from './slider-item/slider-item';
import { NavigationTarget } from './models/slider.model';
import { GalleryItemData } from './models/item.model';
import { GalleryOptions, GalleryOrientation } from './models/config.model';
import { BezierEasingOptions } from './smooth-scroll/smooth-scroll.model';
import { GALLERY_OPTIONS } from './models/gallery.token';
import { GALLERY_A11Y_OPTIONS } from './a11y/a11y.token';
import { GalleryA11yOptions } from './a11y/a11y.model';
import { BASE_SLIDER_OPTIONS, BaseSliderOptions, GalleryRef } from './gallery-ref';

function baseSliderOptionsFactory(): BaseSliderOptions {
  const globalConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  return {
    gap: globalConfig.gap,
    loop: globalConfig.loop,
    steps: globalConfig.steps,
    itemSize: globalConfig.itemSize,
    forceSnap: globalConfig.forceSnap,
    snapAlign: globalConfig.snapAlign,
    itemsPerView: globalConfig.itemsPerView,
    disableScroll: globalConfig.disableScroll,
    scrollBehavior: globalConfig.scrollBehavior,
    scrollDuration: globalConfig.scrollDuration,
    disableMouseScroll: globalConfig.disableMouseScroll
  };
}

@Component({
  selector: 'gallery',
  exportAs: 'gallery',
  host: {
    '[attr.dir]': 'dir.valueSignal()',
    '[attr.scrollDisabled]': 'disableScroll() ? "" : null',
    '[attr.role]': 'a11y?.containerRole ?? null',
    '[attr.aria-label]': 'a11y?.containerLabel ?? null',
    '[attr.aria-roledescription]': 'a11y?.containerRoleDescription ?? null'
  },
  hostDirectives: [GalleryLayoutDirective],
  template: `
    <g-slider #sensor="intersectionSensor">
      @let template = itemDef().templateRef;
      @let loaderTemplate = $safeNavigationMigration(itemLoaderDef()?.templateRef);
      @let errorTemplate = $safeNavigationMigration(itemErrorDef()?.templateRef);
      @let visibleEntries = sensor.visibleEntries();
      @let active = activeIndex();
      @let anchor = anchorIndex();
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
            [errorTemplate]="errorTemplate">
        </li>
      }
    </g-slider>

    <ng-content select="gallery-thumbs, gallery-nav, gallery-counter, gallery-debug, [gallerySlot]"/>

    @if (a11y?.liveRegion && hasVisibleItems()) {
      <div role="status"
           [attr.aria-live]="suppressLiveRegion() ? 'off' : 'polite'"
           aria-atomic="true"
           class="sr-only">
        {{ liveRegion() }}
      </div>
    }
  `,
  styleUrls: ['../../variables.scss', 'gallery.scss'],
  providers: [
    {
      provide: BASE_SLIDER_OPTIONS,
      useFactory: baseSliderOptionsFactory
    },
    { provide: GalleryRef, useExisting: Gallery }
  ],
  imports: [Slider, SliderItem]
})
export class Gallery extends GalleryRef {

  /** Default options */
  private readonly defaultConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  /** A11y options */
  protected readonly a11y: GalleryA11yOptions = inject(GALLERY_A11Y_OPTIONS);

  /** @ignore **/
  readonly dir: Directionality = inject(Directionality);

  /** @ignore **/
  readonly suppressLiveRegion: WritableSignal<boolean> = signal(false);

  /**
   * Navigation intent (WRITE-ONLY)
   * Automatically sync with native scroll (touch)
   */
  protected readonly navigationSource: WritableSignal<NavigationTarget> = linkedSignal({
    // We track both the starting point and the 'live' truth from the observer
    source: () => ({
      initial: this.resolvedInitialIndex(),
      current: this.activeIndex()
    }),
    computation: (src, previous): NavigationTarget => {
      // 1. If we have no previous state, we are at 'init'
      if (!previous) {
        return { source: 'init', behavior: 'auto', index: src.initial };
      }
      // 2. If activeIndex changed (e.g., via touchpad), sync the state
      // scroll directive will ignore source 'sync' in the main slider, but will update thumbnails navigation source
      if (src.current !== previous.value.index) {
        return { source: 'sync', index: src.current };
      }
      // 3. Otherwise, keep the previous intent (prevents unnecessary emissions)
      return previous.value;
    }
  });

  /**
   * Loads the items array into the gallery
   */
  override items: InputSignal<GalleryItemData<any>[]> = input<GalleryItemData<any>[]>([]);

  /**
   * Sets the resize debounce time used in the resize observer
   */
  override resizeDebounceTime: InputSignalWithTransform<number, string | number> = input<number, string | number>(this.defaultConfig.resizeDebounceTime, {
    transform: numberAttribute
  });

  /**
   * Sets the ease function used for smooth navigation between the items
   */
  override scrollEase: InputSignal<BezierEasingOptions> = input<BezierEasingOptions>(this.defaultConfig.scrollEase);

  /**
   * Sets the sliding direction
   */
  override orientation: InputSignal<GalleryOrientation> = input<GalleryOrientation>(this.defaultConfig.orientation);

  protected readonly liveRegion: Signal<string> = computed(() => {
    // Trigger only on active index changes
    this.activeIndex();
    const first: number = (untracked(this.firstVisibleIndex) ?? 0) + 1;
    const last: number = (untracked(this.lastVisibleIndex) ?? 0) + 1;
    return this.a11y.rangeLabel(first, last, this.itemsCount());
  });
}
