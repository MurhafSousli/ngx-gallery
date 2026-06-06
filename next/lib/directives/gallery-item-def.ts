import { Directive, inject, TemplateRef } from '@angular/core';
import { GalleryItemState } from '../models/config.model';

@Directive({
  selector: '[galleryItemDef]'
})
export class GalleryItemDef {

  readonly templateRef: TemplateRef<any> = inject(TemplateRef<any>);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static ngTemplateContextGuard(dir: GalleryItemDef, ctx: any): ctx is GalleryItemContext<any> {
    /* v8 ignore next 1 */
    return true;
  }
}

export interface GalleryItemContext<T> {
  /** Data for the row that this cell is located within. */
  $implicit: T;

  /** Index of the item. */
  index: number;

  /** The number of total items. */
  count: number;

  /** Item state 'ready' / 'loading' or 'error'.  */
  state: GalleryItemState;

  /** True if item is the active one. */
  active: boolean;

  /** True if item is visible */
  visible: boolean;

  /** True if item is at the center. */
  anchor: boolean;

  /** True if this item is first. */
  first: boolean;

  /** True if this item is last. */
  last: boolean;
}

@Directive({
  selector: '[galleryItemLoaderDef]'
})
export class GalleryItemLoaderDef extends GalleryItemDef {
}

@Directive({
  selector: '[galleryItemErrorDef]'
})
export class GalleryItemErrorDef extends GalleryItemDef {
}
