import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';

import { AdvancedExampleComponent } from './advanced-example.component';

@NgModule({
  imports: [
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: AdvancedExampleComponent
      }
    ]),
    AdvancedExampleComponent
  ]
})
export class AdvancedExampleModule {
}
