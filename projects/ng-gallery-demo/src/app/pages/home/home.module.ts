import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { GalleryModule } from '../../../../../ng-gallery/src/public-api';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent
      }
    ])
  ]

})
export class HomeModule {
}
