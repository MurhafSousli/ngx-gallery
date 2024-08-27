import {
  Component,
  Input,
  Output,
  HostBinding,
  inject,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { GalleryItemContext } from '../directives/gallery-item-def.directive';
import { GalleryImageComponent } from './templates/gallery-image.component';
import { ImageItemData } from './templates/items.model';
import { GalleryConfig } from '../models/config.model';
import { GalleryItemType } from '../models/constants';

@Component({
  standalone: true,
  selector: 'gallery-thumb',
  template: `
    <gallery-image [src]="data.thumb"
                   [alt]="data.alt + '-thumbnail'"
                   [isThumbnail]="true"
                   [loadingIcon]="config.thumbLoadingIcon"
                   [loadingError]="config.thumbLoadingError"
                   (error)="error.emit($event)"></gallery-image>

    @if (config.thumbTemplate) {
      <div class="g-template g-thumb-template">
        <ng-container *ngTemplateOutlet="config.thumbTemplate; context: imageContext"/>
      </div>
    }
  `,
  styleUrl: './gallery-thumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, GalleryImageComponent]
})
export class GalleryThumbComponent {

  @Input() config: GalleryConfig;

  /** Item's index in the gallery */
  @Input() index: number;

  /** The number of total items */
  @Input() count: number;

  /** Gallery current index */
  @Input() currIndex: number;

  /** Item's type 'image', 'video', 'youtube', 'Vimeo', 'iframe' */
  @Input() type: GalleryItemType;

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  @Input() data: ImageItemData;

  @Output() error: EventEmitter<ErrorEvent> = new EventEmitter<ErrorEvent>();

  @HostBinding('class.g-active-thumb') get isActive() {
    return this.index === this.currIndex;
  }

  @HostBinding('attr.galleryIndex') get isIndexAttr(): number {
    return this.index;
  }

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  get imageContext(): GalleryItemContext<ImageItemData> {
    return {
      $implicit: this.data,
      index: this.index,
      type: this.type,
      active: this.isActive,
      count: this.count,
      first: this.index === 0,
      last: this.index === this.count - 1
    }
  }
}
