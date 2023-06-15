import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';

import { LabComponent } from './lab.component';

@NgModule({
  imports: [
    FormsModule,
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: LabComponent
      }
    ]),
    LabComponent
  ]
})
export class LabModule {
}
