import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { GallerizeExampleComponent } from './gallerize-example.component';

@NgModule({
  declarations: [
    GallerizeExampleComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: GallerizeExampleComponent
      }
    ])
  ]

})
export class GallerizeExampleModule { }
