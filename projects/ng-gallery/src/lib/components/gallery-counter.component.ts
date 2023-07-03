import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GalleryState } from '../models/gallery.model';

@Component({
    selector: 'gallery-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="g-counter">{{ (state.currIndex + 1) + ' / ' + state.items.length }}</div>
  `,
  standalone: true
})
export class GalleryCounterComponent {
  @Input() state: GalleryState;
}
