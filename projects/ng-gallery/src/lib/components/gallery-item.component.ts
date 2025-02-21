import {
  Component,
  computed,
  input,
  AfterViewInit,
  Signal,
  InputSignal,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { GalleryItemContext } from '../directives/gallery-item-def.directive';
import { GalleryItemData, } from '../templates/items.model';
import { SliderItem } from './slider-item/slider-item';

@Component({
  selector: 'gallery-item',
  host: {
    '[attr.galleryIndex]': 'index()',
    '[class.g-active-item]': 'active()',
    '[attr.itemState]': 'state()',
  },
  providers: [{ provide: SliderItem, useExisting: GalleryItemComponent }],
  template: `
    <ng-container [ngTemplateOutlet]="galleryRef.config().itemTemplate"
                  [ngTemplateOutletContext]="itemContext()"
                  [ngTemplateOutletInjector]="injector"/>
  `,
  styleUrl: './gallery-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class GalleryItemComponent extends SliderItem implements AfterViewInit {

  /** The number of total slider-item */
  count: InputSignal<number> = input<number>();

  /** Gallery current index */
  currIndex: InputSignal<number> = input<number>();

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  data: InputSignal<GalleryItemData> = input<GalleryItemData>();

  active: Signal<boolean> = computed(() => this.index() === this.currIndex());

  itemContext: Signal<GalleryItemContext<GalleryItemData>> = computed(() => {
    return {
      $implicit: this.data(),
      index: this.index(),
      active: this.active(),
      count: this.count(),
      first: this.index() === 0,
      last: this.index() === this.count() - 1
    };
  });

  ngAfterViewInit(): void {
    // If item does not contain an image, then set the state to DONE
    if (!this.isItemContainImage) {
      this.state.set('success');
    }
  }
}

