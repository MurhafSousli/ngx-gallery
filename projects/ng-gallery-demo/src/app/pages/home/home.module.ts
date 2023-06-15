import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { HomeComponent } from './home.component';


@NgModule({
  imports: [
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
