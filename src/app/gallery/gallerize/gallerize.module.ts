import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { GalleryModule } from '@ngx-gallery/core';
// import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryModule } from '../core';
import { LightboxModule } from '../lightbox';
import { GallerizeDirective } from './gallerize.directive';

@NgModule({
  imports: [
    CommonModule,
    GalleryModule,
    LightboxModule
  ],
  declarations: [GallerizeDirective],
  exports: [GallerizeDirective]
})
export class GallerizeModule {

}
