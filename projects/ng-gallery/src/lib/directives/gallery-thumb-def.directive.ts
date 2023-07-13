import { Directive, TemplateRef } from '@angular/core';
import { ImageItemData } from '../components/templates/items.model';
import { GalleryItemContext } from './gallery-item-def.directive';

@Directive({
  standalone: true,
  selector: '[galleryThumbDef]'
})
export class GalleryThumbDef {

  constructor(public templateRef: TemplateRef<GalleryItemContext<ImageItemData>>) {
  }
  // Make sure the template checker knows the type of the context with which the
  // template of this directive will be rendered
  static ngTemplateContextGuard(
    directive: GalleryThumbDef,
    context: unknown
  ): context is GalleryItemContext<ImageItemData> {
    return true;
  }
}
