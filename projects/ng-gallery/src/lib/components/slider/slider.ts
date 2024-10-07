import {
  Component,
  inject,
  computed,
  contentChildren,
  booleanAttribute,
  input,
  Signal,
  ElementRef,
  InputSignal,
  WritableSignal,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { GalleryRef } from '../../services/gallery-ref';
import { GalleryConfig } from '../../models/config.model';
import { Orientation } from '../../models/constants';
import { HorizontalAdapter, SliderAdapter, VerticalAdapter } from '../adapters';
import { SliderItem } from '../items/items';

@Component({
  standalone: true,
  host: {
    '[class.g-slider]': 'true',
    '[attr.centralised]': 'centralized()',
    '[attr.orientation]': 'orientation()',
    '[attr.autoSize]': 'autoSize()',
  },
  selector: 'g-slider',
  template: `
    <ng-content/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  readonly orientation: InputSignal<Orientation> = input<Orientation>();

  readonly autoSize: InputSignal<boolean> = input<boolean>();

  readonly centralized: InputSignal<boolean> = input<boolean>();

  readonly items: Signal<ReadonlyArray<SliderItem>> = contentChildren<SliderItem>(SliderItem, { descendants: true });

  isThumbs: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });

  readonly adapter: Signal<SliderAdapter> = computed(() => {
    const config: GalleryConfig = this.galleryRef.config();
    return this.orientation() === Orientation.Horizontal
      ? new HorizontalAdapter(this.nativeElement, config)
      : new VerticalAdapter(this.nativeElement, config);
  });

  get visibleEntries(): WritableSignal<Record<number, IntersectionObserverEntry>> {
    if (this.isThumbs()) {
      return this.galleryRef.visibleThumbs;
    }
    return this.galleryRef.visibleItems;
  }
}
