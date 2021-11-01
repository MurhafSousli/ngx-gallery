import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { SharedModule } from '../../shared/shared.module';
import { GalleryExampleComponent } from './gallery-example.component';

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
