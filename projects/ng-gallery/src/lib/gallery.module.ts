import { NgModule } from '@angular/core';
import { GalleryComponent } from './core/gallery.component';
import { GalleryItemDef } from './directives/gallery-item-def.directive';
import { GalleryBoxDef } from './directives/gallery-box-def.directive';

@NgModule({
  imports: [
    GalleryComponent,
    GalleryItemDef,
    GalleryBoxDef
  ],
  exports: [
    GalleryComponent,
    GalleryItemDef,
    GalleryBoxDef
  ]
})
export class GalleryModule {
}
