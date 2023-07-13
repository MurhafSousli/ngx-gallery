import { NgModule } from '@angular/core';
import { GalleryModule } from 'ng-gallery';
import { LightboxDirective } from './lightbox.directive';
import { GallerizeDirective } from './gallerize.directive';

@NgModule({
  imports: [GalleryModule, LightboxDirective, GallerizeDirective],
  exports: [GalleryModule, LightboxDirective, GallerizeDirective]
})
export class LightboxModule {
}
