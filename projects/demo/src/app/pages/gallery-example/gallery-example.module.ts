import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GalleryExampleComponent } from './gallery-example.component';

@NgModule({
  declarations: [
    GalleryExampleComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: GalleryExampleComponent
      }
    ])
  ]

})
export class GalleryExampleModule {
}
