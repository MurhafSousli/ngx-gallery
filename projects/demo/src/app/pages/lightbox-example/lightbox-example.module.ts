import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LightboxExampleComponent } from './lightbox-example.component';
import { SharedModule } from '../../shared/shared.module';

import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';

@NgModule({
  declarations: [LightboxExampleComponent],
  imports: [
    SharedModule,
    GalleryModule,
    LightboxModule.withConfig({
      keyboardShortcuts: false
    }),
    RouterModule.forChild([
      {
        path: '', component: LightboxExampleComponent
      }
    ])
  ]
})
export class LightboxExampleModule {
}
