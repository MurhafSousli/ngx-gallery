import {
  Component,
  inject,
  output,
  computed,
  input,
  Signal,
  InputSignal,
  OutputEmitterRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { GalleryItemContext } from '../directives/gallery-item-def.directive';
import { GalleryImageComponent } from './templates/gallery-image.component';
import { ImageItemData } from './templates/items.model';
import { GalleryItemType } from '../models/constants';
import { GalleryRef } from '../services/gallery-ref';
import { SliderItem } from './items/items';

@Component({
  standalone: true,
  selector: 'gallery-thumb',
  host: {
    '[attr.galleryIndex]': 'index()',
    '[class.g-active-thumb]': 'active()',
    '[class.g-visible-thumb]': 'visible()',
  },
  providers: [{ provide: SliderItem, useExisting: GalleryThumbComponent }],
  template: `
    <gallery-image [src]="data().thumb"
                   [alt]="data().alt + '-thumbnail'"
                   [isThumbnail]="true"
                   [loadingIcon]="galleryRef.config().thumbLoadingIcon"
                   [loadingError]="galleryRef.config().thumbLoadingError"
                   (error)="error.emit($event)"></gallery-image>

    @if (galleryRef.config().thumbTemplate) {
      <div class="g-template g-thumb-template">
        <ng-container *ngTemplateOutlet="galleryRef.config().thumbTemplate; context: imageContext()"/>
      </div>
    }
  `,
  styleUrl: './gallery-thumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, GalleryImageComponent]
})
export class GalleryThumbComponent extends SliderItem {
  /**
   * The gallery reference instance
   */
  readonly galleryRef: GalleryRef = inject(GalleryRef);

  /** Item's index in the gallery */
  index: InputSignal<number> = input<number>();

  /** The number of total items */
  count: InputSignal<number> = input<number>();

  /** Gallery current index */
  currIndex: InputSignal<number> = input<number>();

  /** Item's type 'image', 'video', 'youtube', 'Vimeo', 'iframe' */
  type: InputSignal<GalleryItemType> = input<GalleryItemType>();

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  data: InputSignal<ImageItemData> = input<ImageItemData>();

  /** Whether the item is visible in the viewport */
  visible: InputSignal<boolean> = input<boolean>();

  active: Signal<boolean> = computed(() => this.index() === this.currIndex());

  imageContext: Signal<GalleryItemContext<ImageItemData>> = computed(() => {
    return {
      $implicit: this.data(),
      index: this.index(),
      type: this.type(),
      active: this.active(),
      count: this.count(),
      first: this.index() === 0,
      last: this.index() === this.count() - 1
    }
  });

  error: OutputEmitterRef<ErrorEvent> = output<ErrorEvent>();
}
