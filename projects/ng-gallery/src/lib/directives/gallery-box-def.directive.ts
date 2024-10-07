import { Directive, TemplateRef } from '@angular/core';
import { GalleryConfig } from '../models/config.model';


@Directive({
  standalone: true,
  selector: '[galleryBoxDef]'
})
export class GalleryBoxDef {

  constructor(public templateRef: TemplateRef<GalleryStateContext>) {
  }

  // Make sure the template checker knows the type of the context with which the
  // template of this directive will be rendered
  static ngTemplateContextGuard(
    directive: GalleryBoxDef,
    context: unknown
  ): context is GalleryStateContext {
    return true;
  }
}

export interface GalleryStateContext {
  config?: GalleryConfig;
}
