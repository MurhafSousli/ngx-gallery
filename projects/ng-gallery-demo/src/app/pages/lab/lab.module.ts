import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LabComponent } from './lab.component';
import { SharedModule } from '../../shared/shared.module';

import { GalleryModule } from '../../../../../ng-gallery/src/public-api';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: LabComponent
      }
    ])
  ],
  declarations: [
    LabComponent
  ]
})
export class LabModule {
}
