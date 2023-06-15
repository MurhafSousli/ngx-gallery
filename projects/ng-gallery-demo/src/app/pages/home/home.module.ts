import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    GalleryModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent
      }
    ]),
    HomeComponent
  ]
})
export class HomeModule {
}
