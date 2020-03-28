import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GallerizeExampleComponent } from './gallerize-example.component';

import { GalleryModule } from '../../../../../ng-gallery/src/public-api';
import { LightboxModule } from '../../../../../ng-gallery/lightbox/src/public_api';

@NgModule({
  declarations: [
    GallerizeExampleComponent
  ],
  imports: [
    SharedModule,
    GalleryModule,
    LightboxModule,
    RouterModule.forChild([
      {
        path: '', component: GallerizeExampleComponent
      }
    ])
  ]

})
export class GallerizeExampleModule { }
