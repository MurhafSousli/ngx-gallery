import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

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
