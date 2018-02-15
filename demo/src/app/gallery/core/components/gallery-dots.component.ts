import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { GalleryState } from '../models';

@Component({
  selector: 'gallery-dots',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div class="g-dot"
         *ngFor="let item of state.items; let i = index"
         (tapClick)="indexChange.emit(i)">
      <div class="g-dot-inner"
           [class.-current]="i === state.currIndex"></div>
    </div>
  `
})
export class GalleryDotsComponent {
  @Input() state: GalleryState;
  @Output() indexChange = new EventEmitter<number>();
}
