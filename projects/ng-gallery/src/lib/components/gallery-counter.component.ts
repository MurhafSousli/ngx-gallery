import { Component, inject, computed, Signal, ChangeDetectionStrategy } from '@angular/core';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  standalone: true,
  selector: 'gallery-counter',
  template: `
    <div class="g-counter">{{ counter() }}</div>
  `,
  styleUrl: './gallery-counter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryCounterComponent {

  galleryRef: GalleryRef = inject(GalleryRef);

  counter: Signal<string> = computed(() => {
    return (this.galleryRef.currIndex() + 1) + ' / ' + this.galleryRef.items().length;
  });
}
