import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { GallerizeExampleComponent } from './gallerize-example.component';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule,
    RouterModule.forChild([
      {
        path: '', component: GallerizeExampleComponent
      }
    ]),
    GallerizeExampleComponent
  ]
})
export class GallerizeExampleModule {
}
