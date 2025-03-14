import {
  Component,
  inject,
  computed,
  input,
  Signal,
  InputSignal,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryRef } from '../services/gallery-ref';
import { HorizontalPosition } from '../models/config.model';

@Component({
  selector: 'gallery-counter',
  host: {
    '[attr.align]': 'align()'
  },
  template: `
    <div class="g-counter">{{ counter() }}</div>
  `,
  styleUrl: './gallery-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCounterComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly align: InputSignal<HorizontalPosition> = input<HorizontalPosition>('top');

  readonly counter: Signal<string> = computed(() => {
    return `${ this.galleryRef.currIndex() + 1 } / ${ this.galleryRef.items().length }`;
  });
}
