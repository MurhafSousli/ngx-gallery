import { Component, Input, ChangeDetectionStrategy, HostBinding, Output, EventEmitter } from '@angular/core';
import { GalleryConfig } from '../models/config.model';
import { LoadingStrategy, GalleryItemType } from '../models/constants';

@Component({
  selector: 'gallery-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="load" [ngSwitch]="type">

      <ng-container *ngSwitchCase="Types.Image">

        <gallery-image [src]="data.src"
                       [mode]="config.loadingMode"
                       [loadingIcon]="config.loadingIcon"
                       [loadingError]="config.loadingError"
                       (error)="error.emit($event)"></gallery-image>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

      <gallery-video *ngSwitchCase="Types.Video"
                     [src]="data.src"
                     [poster]="data.poster"
                     [pause]="currIndex !== index"
                     (error)="error.emit($event)"></gallery-video>

      <gallery-iframe *ngSwitchCase="Types.Youtube"
                      [src]="data.src"
                      [pause]="currIndex !== index"></gallery-iframe>

      <gallery-iframe *ngSwitchCase="Types.Iframe"
                      [src]="data.src"></gallery-iframe>

      <ng-container *ngSwitchDefault>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

    </ng-container>
  `
})
export class GalleryItemComponent {

  readonly Types = GalleryItemType;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Item's index in the gallery */
  @Input() index: number;

  /** Gallery current index */
  @Input() currIndex: number;

  /** Item's type 'image', 'video', 'youtube', 'iframe' */
  @Input() type: string;

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  @Input() data: any;

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<Error>();

  @HostBinding('class.g-active-item') get isActive() {
    return this.index === this.currIndex;
  }

  get load() {
    switch (this.config.loadingStrategy) {
      case LoadingStrategy.Preload:
        return true;
      case LoadingStrategy.Lazy:
        return this.currIndex === this.index;
      default:
        return this.currIndex === this.index || this.currIndex === this.index - 1 || this.currIndex === this.index + 1;
    }
  }

}
