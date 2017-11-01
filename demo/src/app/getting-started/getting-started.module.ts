import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingStartedComponent } from './getting-started.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';

import { GalleryModule } from 'ng-gallery';

@NgModule({
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    GalleryModule
  ],
  declarations: [GettingStartedComponent],
})
export class GettingStartedModule { }
