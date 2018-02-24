import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GalleryState, GalleryConfig } from '../models';

@Component({
  selector: 'gallery-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <i *ngIf="config.loop || state.hasPrev" class="g-nav-prev" (tapClick)="indexChange.emit('prev')"></i>
    <i *ngIf="config.loop || state.hasNext" class="g-nav-next" (tapClick)="indexChange.emit('next')"></i>
  `
})
export class GalleryNavComponent {
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() indexChange = new EventEmitter<string>();
}
