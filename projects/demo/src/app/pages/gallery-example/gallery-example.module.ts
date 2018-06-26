import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryExampleComponent } from './gallery-example.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [GalleryExampleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: GalleryExampleComponent,
        data: {
          title: 'Basic Example'
        }
      }
    ])
  ]

})
export class GalleryExampleModule {
}
