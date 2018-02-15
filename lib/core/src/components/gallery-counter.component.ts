import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { GalleryState } from '../models';

@Component({
  selector: 'gallery-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `<div class="g-counter">{{(state.currIndex + 1) + '/' + state.items.length}}</div>`
})
export class GalleryCounterComponent {
  @Input() state: GalleryState;
}
