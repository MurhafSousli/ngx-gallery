import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { SharedModule } from '../../shared/shared.module';
import { LabComponent } from './lab.component';

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
