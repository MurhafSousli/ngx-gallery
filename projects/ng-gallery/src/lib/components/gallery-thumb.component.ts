import { Component, Input, ChangeDetectionStrategy, HostBinding, Output, EventEmitter } from '@angular/core';
import { GalleryConfig } from '../models/config.model';

@Component({
  selector: 'gallery-thumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <gallery-image [src]="data.thumb"
                   [alt]="data.alt + '-thumbnail'"
                   [isThumbnail]="true"
                   [loadingIcon]="config.thumbLoadingIcon"
                   [loadingError]="config.thumbLoadingError"
                   (error)="error.emit($event)"></gallery-image>

    <div *ngIf="config.thumbTemplate" class="g-template g-thumb-template">
      <ng-container
        *ngTemplateOutlet="config.thumbTemplate; context: { index, type, data, isActive }">
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

  @Output() error = new EventEmitter<ErrorEvent>();

  @HostBinding('class.g-active-thumb') get isActive() {
    return this.index === this.currIndex;
  }

}
