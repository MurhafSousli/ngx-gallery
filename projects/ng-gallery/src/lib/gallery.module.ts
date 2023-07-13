import { NgModule } from '@angular/core';
import { GalleryComponent } from './components/gallery.component';
import { GalleryImageDef } from './directives/gallery-image-def.directive';
import { GalleryThumbDef } from './directives/gallery-thumb-def.directive';
import { GalleryItemDef } from './directives/gallery-item-def.directive';
import { GalleryBoxDef } from './directives/gallery-box-def.directive';

@NgModule({
  imports: [
    GalleryComponent,
    GalleryItemDef,
    GalleryImageDef,
    GalleryThumbDef,
    GalleryBoxDef
  ],
  exports: [
    GalleryComponent,
    GalleryItemDef,
    GalleryImageDef,
    GalleryThumbDef,
    GalleryBoxDef
  ]
})
export class GalleryModule {
}
