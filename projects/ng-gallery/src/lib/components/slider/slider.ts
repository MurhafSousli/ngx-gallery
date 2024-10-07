import {
  Component,
  inject,
  computed,
  contentChildren,
  input,
  Signal,
  InputSignal,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryRef } from '../../services/gallery-ref';
import { GalleryConfig } from '../../models/config.model';
import { Orientation } from '../../models/constants';
import { GalleryItemComponent } from '../gallery-item.component';
import { HorizontalAdapter, SliderAdapter, VerticalAdapter } from '../adapters';

@Component({
  standalone: true,
  host: {
    '[class.g-slider]': 'true',
    '[attr.centralised]': 'centralized()',
    '[attr.orientation]': 'orientation()',
    '[attr.autoSize]': 'autoSize()',
  },
  selector: 'g-slider',
  template: `<ng-content/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  readonly orientation: InputSignal<Orientation> = input<Orientation>();

  readonly autoSize: InputSignal<boolean> = input<boolean>();

  readonly centralized: InputSignal<boolean> = input<boolean>();

  readonly isThumbnail: InputSignal<boolean> = input<boolean>();

  readonly items: Signal<ReadonlyArray<GalleryItemComponent>> = contentChildren<GalleryItemComponent>(GalleryItemComponent, { descendants: true });

  readonly adapter: Signal<SliderAdapter> = computed(() => {
    const config: GalleryConfig = this.galleryRef.config();
    return this.orientation() === Orientation.Horizontal
      ? new HorizontalAdapter(this.nativeElement, config)
      : new VerticalAdapter(this.nativeElement, config);
  });
}
