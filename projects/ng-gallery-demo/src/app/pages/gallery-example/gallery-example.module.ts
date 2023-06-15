import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { SharedModule } from '../../shared/shared.module';
import { GalleryExampleComponent } from './gallery-example.component';

@NgModule({
  imports: [
    SharedModule,
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
