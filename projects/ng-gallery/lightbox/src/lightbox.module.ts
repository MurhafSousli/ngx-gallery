import { NgModule } from '@angular/core';
import { GalleryModule } from 'ng-gallery';
import { Lightbox } from './lightbox';
import { LightboxFor } from './lightbox-for';
import { LightboxCloseButton } from './lightbox-close-button';

@NgModule({
  imports: [
    GalleryModule,
    Lightbox,
    LightboxFor,
    LightboxCloseButton
  ],
  exports: [
    GalleryModule,
    Lightbox,
    LightboxFor,
    LightboxCloseButton
  ]
})
export class LightboxModule {
}
