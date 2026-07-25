import {
  Component,
  inject,
  signal,
  computed,
  Signal,
  ElementRef,
  WritableSignal,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GalleryRef } from '../gallery-ref';
import { SliderContext } from '../slider/slider.token';
import { MouseSliding } from '../gestures/mouse-sliding';
import { ResizeSensor } from '../resize-sensor/resize-sensor';
import { IntersectionSensor } from '../observers/intersection-sensor';
import { SmoothScroll } from '../smooth-scroll/smooth-scroll.directive';
import { HorizontalAdapter, SliderAdapter, VerticalAdapter } from '../adapters';

@Component({
  host: {
    tabindex: '0',
    '[class.g-slider]': 'true',
    '[attr.status]': 'status()',
    '[attr.orientation]': 'galleryRef.orientation()',
    '[attr.forceSnap]': 'galleryRef.forceSnap() && !galleryRef.isOneItemPerView() ? "" : null',
    '[style.--_slider-snap-type]': 'snapType()',
    '[style.--_slider-snap-align]': 'galleryRef.snapAlign()',
  },
  selector: 'g-slider',
  template: `
    <ul class="g-slider-content">
      <ng-content/>
    </ul>
  `,
  styleUrl: 'slider.scss',
  hostDirectives: [
    SmoothScroll,
    MouseSliding,
    ResizeSensor,
    IntersectionSensor
  ],
  providers: [{ provide: SliderContext, useExisting: Slider }]
})
export class Slider implements SliderContext {

  protected readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly isBrowser: boolean = isPlatformBrowser(inject(PLATFORM_ID));

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  /**
   * Slider adapter based on orientation
   */
  readonly adapter: Signal<SliderAdapter> = computed(() => {
    return this.galleryRef.orientation() === 'horizontal'
      ? new HorizontalAdapter(this.nativeElement)
      : new VerticalAdapter(this.nativeElement);
  });

  readonly scrolling: WritableSignal<boolean> = signal<boolean>(false);
  readonly dragging: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * Slider status
   */
  readonly status: Signal<'idle' | 'dragging' | 'scrolling'> = computed<'idle' | 'dragging' | 'scrolling'>(() => {
    if (this.dragging()) return 'dragging';
    if (this.scrolling()) return 'scrolling';
    return 'idle';
  });

  readonly snapType: Signal<string> = computed(() => {
    if (this.status() === 'idle') {
      return this.adapter().scrollSnapType;
    }
    return 'none';
  });

}
