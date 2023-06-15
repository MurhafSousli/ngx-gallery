import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';

import { GalleryExampleComponent } from './gallery-example.component';

@NgModule({
  imports: [
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: GalleryExampleComponent
      }
    ]),
    GalleryExampleComponent
  ]
})
export class GalleryExampleModule {
}
