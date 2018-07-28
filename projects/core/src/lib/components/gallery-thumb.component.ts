import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { GalleryConfig } from '../models';

@Component({
  selector: 'gallery-thumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <gallery-image [src]="data.thumb" [loadingIcon]="config.loadingIcon"></gallery-image>

    <div *ngIf="config.thumbTemplate" class="g-template g-thumb-template">
      <ng-container
        *ngTemplateOutlet="config.thumbTemplate; context: { index: this.index, type: this.type, data: this.data }">
      </ng-container>
    </div>
  `
})
export class GalleryThumbComponent {

  @Input() config: GalleryConfig;

  /** Item's index in the gallery */
  @Input() index: number;

  /** Gallery current index */
  @Input() currIndex: number;

  /** Item's type 'image', 'video', 'youtube', 'iframe' */
  @Input() type: string;

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  @Input() data: any;

  @HostBinding('class.g-active-thumb') get isActive() {
    return this.index === this.currIndex;
  }

}
