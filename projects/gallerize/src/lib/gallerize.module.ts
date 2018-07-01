import { NgModule } from '@angular/core';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeDirective } from './gallerize.directive';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule
  ],
  declarations: [GallerizeDirective],
  exports: [GallerizeDirective]
})
export class GallerizeModule {

}
