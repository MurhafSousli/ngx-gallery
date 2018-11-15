import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { GalleryState } from '../models';

@Component({
  selector: 'gallery-dots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="g-dot"
         *ngFor="let item of state.items; let i = index"
         [class.g-dot-active]="i === state.currIndex"
         (tapClick)="action.emit(i)">
      <div class="g-dot-inner"></div>
    </div>
  `
})
export class GalleryDotsComponent {
  @Input() state: GalleryState;
  @Output() action = new EventEmitter<number>();
}
