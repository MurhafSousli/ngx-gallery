import { Directive, TemplateRef } from '@angular/core';
import { GalleryItemData } from '../components/templates/items.model';
import { GalleryItemType } from '../models/constants';

@Directive({
  standalone: true,
  selector: '[galleryItemDef]'
})
export class GalleryItemDef {
  constructor(public templateRef: TemplateRef<GalleryItemContext<GalleryItemDef>>) {
  }

  // Make sure the template checker knows the type of the context with which the
  // template of this directive will be rendered
  static ngTemplateContextGuard(
    directive: GalleryItemDef,
    context: unknown
  ): context is GalleryItemContext<GalleryItemData> {
    return true;
  }
}

export interface GalleryItemContext<T> {
  /** Data for the row that this cell is located within. */
  $implicit?: T;

  /** Index of the item. */
  index?: number;

  /** The type of the item. */
  type?: GalleryItemType;

  /** True if this item is the active one. */
  active?: boolean;

  /** The number of total items. */
  count?: number;

  /** True if this item is first. */
  first?: boolean;

  /** True if this item is last. */
  last?: boolean;
}
