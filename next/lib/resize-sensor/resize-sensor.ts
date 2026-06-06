import {
  Directive,
  signal,
  inject,
  computed,
  Signal,
  ElementRef,
  ResourceRef,
  WritableSignal,
  ResourceLoaderParams
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SharedResizeObserver } from '@angular/cdk/observers/private';
import { animationFrameScheduler, throttleTime, map, combineLatest, distinctUntilChanged } from 'rxjs';
import { SliderAdapter } from '../adapters';
import { GalleryRef } from '../gallery-ref';
import { SliderContext } from '../slider/slider.token';
import { GallerySnapAlign } from '../models/config.model';
import { ResizeSensorContext, ResizeObserverResponse, ElementDimensions } from './resize-sensor.token';

interface ResizeSensorParams {
  viewport: HTMLElement;
  content: HTMLElement;
  resizeDebounceTime: number;
}

@Directive({
  selector: '[resizeSensor]',
  host: {
    '[style.--_slider-padding-start-size.px]': 'snapPaddingStart()',
    '[style.--_slider-padding-end-size.px]': 'snapPaddingEnd()'
  },
  providers: [{ provide: ResizeSensorContext, useExisting: ResizeSensor }]
})
export class ResizeSensor implements ResizeSensorContext {

  readonly nativeElement: HTMLElement = inject(ElementRef).nativeElement;

  private readonly sharedResizeObserver: SharedResizeObserver = inject(SharedResizeObserver);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly slider: SliderContext = inject(SliderContext, { self: true });

  readonly resizeResource: ResourceRef<ResizeObserverResponse> = rxResource({
    params: () => {
      if (!this.slider.isBrowser || !this.galleryRef.renderedItems().length) return undefined;

      return {
        viewport: this.nativeElement,
        content: this.slider.adapter().content,
        resizeDebounceTime: this.galleryRef.resizeDebounceTime()
      };
    },
    stream: ({ params }: ResourceLoaderParams<ResizeSensorParams>) => {
      return combineLatest([
        this.sharedResizeObserver.observe(params.viewport),
        this.sharedResizeObserver.observe(params.content)
      ]).pipe(
        throttleTime(params.resizeDebounceTime, animationFrameScheduler, {
          leading: true,
          trailing: true
        }),
        map(() => {
          // Use clientWidth/clientHeight instead of contentRect to avoid sub-pixel rendering noise
          // clientWidth/clientHeight are always integers and don't fluctuate due to browser rendering
          return {
            viewport: {
              width: params.viewport.clientWidth,
              height: params.viewport.clientHeight
            },
            content: {
              width: params.content.clientWidth,
              height: params.content.clientHeight
            }
          };
        }),
        distinctUntilChanged((prev: ResizeObserverResponse, curr: ResizeObserverResponse) => {
          return (
            prev.viewport.width === curr.viewport.width &&
            prev.viewport.height === curr.viewport.height &&
            prev.content.width === curr.content.width &&
            prev.content.height === curr.content.height
          );
        })
      );
    }
  });

  readonly overrideSize: WritableSignal<ElementDimensions | null> = signal(null);

  readonly viewportSize: Signal<ElementDimensions> = computed(() =>
    this.overrideSize() ?? this.resizeResource.value()?.viewport
  );

  readonly contentSize: Signal<ElementDimensions> = computed(() =>
    this.resizeResource.value()?.content
  );

  readonly layoutReady: Signal<boolean> = computed(() => {
    return !!this.viewportSize() && !!this.contentSize()
  });

  readonly isScrollable: Signal<boolean> = computed(() => {
    if (!this.layoutReady()) return false;
    const adapter: SliderAdapter = this.slider.adapter();
    return this.contentSize()[adapter.sizeProperty] > this.viewportSize()[adapter.sizeProperty];
  });

  readonly snapPaddingStart: Signal<number> = computed(() => {
    const adapter: SliderAdapter = this.slider.adapter();
    const align: GallerySnapAlign = this.galleryRef.snapAlign();
    return this.calculatePadding(adapter, adapter.content.firstElementChild, align, 'end');
  });

  readonly snapPaddingEnd: Signal<number> = computed(() => {
    const adapter: SliderAdapter = this.slider.adapter();
    const align: GallerySnapAlign = this.galleryRef.snapAlign();
    return this.calculatePadding(adapter, adapter.content.lastElementChild, align, 'start');
  });

  private calculatePadding(adapter: SliderAdapter, element: Element, align: GallerySnapAlign, edgeCase: 'start' | 'end'): number {
    // To keep calculating reactive, we must subscribe to contentSize changes,
    // Especially for auto-sized items. when cached loads too quickly, this avoids 0 padding.
    this.contentSize();
    if (!this.isScrollable() || this.galleryRef.isOneItemPerView() || !this.galleryRef.forceSnap()) return null;

    const viewportSize: number = this.viewportSize()[adapter.sizeProperty];
    const itemSize: number = element[adapter.offsetSize];

    if (align === 'center') {
      return (viewportSize / 2) - (itemSize / 2);
    }
    return align === edgeCase ? (viewportSize - itemSize) : null;
  }
}
