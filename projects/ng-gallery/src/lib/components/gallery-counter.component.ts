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

@Component({
  standalone: true,
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

  readonly align: InputSignal<'top' | 'bottom'> = input<'top' | 'bottom'>('top');

  readonly counter: Signal<string> = computed(() => {
    return `${ this.galleryRef.currIndex() + 1 } / ${ this.galleryRef.items().length }`;
  });
}
