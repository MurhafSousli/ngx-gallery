import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AdvancedExampleComponent } from './advanced-example.component';

import { GalleryModule } from '../../../../../ngx-gallery/src/public-api';

@NgModule({
  declarations: [
    AdvancedExampleComponent
  ],
  imports: [
    SharedModule,
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: AdvancedExampleComponent
      }
    ])
  ]

})
export class AdvancedExampleModule {
}
