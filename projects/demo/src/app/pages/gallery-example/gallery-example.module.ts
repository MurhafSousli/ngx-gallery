import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GalleryExampleComponent } from './gallery-example.component';

import { GalleryModule } from '@ngx-gallery/core';

@NgModule({
  declarations: [
    GalleryExampleComponent
  ],
  imports: [
    SharedModule,
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: GalleryExampleComponent
      }
    ])
  ]

})
export class GalleryExampleModule {
}
