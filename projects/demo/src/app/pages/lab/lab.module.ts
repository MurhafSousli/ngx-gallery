import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';
import { LabComponent } from './lab.component';
import { SharedModule } from '../../shared/shared.module';

import { GalleryModule } from '@ngx-gallery/core';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    GalleryModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
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
