import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

import { LightboxExampleComponent } from './lightbox-example.component';

@NgModule({
  imports: [
    GalleryModule,
    LightboxModule.withConfig({
      keyboardShortcuts: false
    }),
    RouterModule.forChild([
      {
        path: '', component: LightboxExampleComponent
      }
    ]),
    LightboxExampleComponent
  ]
})
export class LightboxExampleModule {
}
