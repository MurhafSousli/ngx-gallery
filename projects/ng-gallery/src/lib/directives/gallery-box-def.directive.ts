import { Directive, TemplateRef } from '@angular/core';
import { GalleryConfig, GalleryState } from 'ng-gallery';


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
  state?: GalleryState;
  config?: GalleryConfig;
}
