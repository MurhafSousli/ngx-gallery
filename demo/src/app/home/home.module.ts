import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { GalleryModule } from 'ng-gallery';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    GalleryModule
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
