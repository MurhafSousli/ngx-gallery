import { computed, Directive, ElementRef, inject, Signal } from '@angular/core';
import { SliderAdapter } from './base-adapter';
import { HorizontalAdapter, VerticalAdapter } from './main-adapters';
import { GalleryConfig } from '../../models/config.model';
import { Orientation } from '../../models/constants';
import { GalleryRef } from '../../services/gallery-ref';

@Directive({
  standalone: true,
  selector: '[adapter]'
})
export class Adapter {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  adapter: Signal<SliderAdapter> = computed(() => {
    const config: GalleryConfig = this.galleryRef.config();
    return config.orientation === Orientation.Horizontal ?
      new HorizontalAdapter(this.nativeElement, config) :
      new VerticalAdapter(this.nativeElement, config);
  });
}
