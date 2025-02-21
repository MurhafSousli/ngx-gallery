import { Directive, inject, TemplateRef } from '@angular/core';
import { GalleryItemData } from '../templates/items.model';

@Directive({
  selector: '[galleryItemDef]'
})
export class GalleryItemDef {
  templateRef: TemplateRef<GalleryItemDef> = inject(TemplateRef<GalleryItemDef>)

  // Make sure the template checker knows the type of the context with which the
  // template of this directive will be rendered
  static ngTemplateContextGuard(
    directive: GalleryItemDef,
    context: GalleryItemContext<GalleryItemData>
  ): context is GalleryItemContext<GalleryItemData> {
    return true;
  }
}

export interface GalleryItemContext<T> {
  /** Data for the row that this cell is located within. */
  $implicit?: T;

  /** Index of the item. */
  index?: number;

  /** True if this item is the active one. */
  active?: boolean;

  /** The number of total items. */
  count?: number;

  /** True if this item is first. */
  first?: boolean;

  /** True if this item is last. */
  last?: boolean;
}
