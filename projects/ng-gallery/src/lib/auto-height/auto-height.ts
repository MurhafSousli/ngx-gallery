import { Directive, inject, computed, Signal, ResourceRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedResizeObserver } from '@angular/cdk/observers/private';
import { rxResource } from '@angular/core/rxjs-interop';
import { map, filter } from 'rxjs';
import { Gallery } from '../gallery';
import { SliderItem } from '../slider-item/slider-item';


@Directive({
  selector: 'gallery[autoHeight]',
  host: {
    '[style.height]': '"auto"',
    '[style.--_slider-will-change]': '"scroll-position, inline-size, block-size"',
    '[style.--_override-slider-item-height]': '"auto"',
    '[style.--_override-slider-align-items]': '"start"',
    '[style.--_override-slider-height.px]': 'activeItemHeight()'
  }
})
export class GalleryAutoHeight {

  private readonly isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID))

  private readonly gallery: Gallery = inject(Gallery);

  private readonly sharedResizeObserver: SharedResizeObserver = inject(SharedResizeObserver);

  private readonly activeItemResizeResource: ResourceRef<ResizeObserverEntry> = rxResource({
    params: () => {
      const active: SliderItem = this.gallery.activeItem();
      if (!this.isBrowser || active?.state() !== 'ready') return undefined;
      return {
        activeEl: active.nativeElement
      }
    },
    stream: ({ params }) => {
      return this.sharedResizeObserver.observe(params.activeEl).pipe(
        map((entries: ResizeObserverEntry[]) =>
          entries.find((entry: ResizeObserverEntry) => entry.target === params.activeEl)
        ),
        filter((entry: ResizeObserverEntry) => !!entry)
      )
    }
  });

  // Expose the measured height as a computed signal for clean binding
  readonly activeItemHeight: Signal<number> = computed(() => {
    return this.activeItemResizeResource.value()?.contentRect.height ?? 0;
  });
}
