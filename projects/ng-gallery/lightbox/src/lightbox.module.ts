import { NgModule } from '@angular/core';
import { LightboxDirective } from './lightbox.directive';
import { GallerizeDirective } from './gallerize.directive';

@NgModule({
  imports: [LightboxDirective, GallerizeDirective  ],
  exports: [LightboxDirective, GallerizeDirective  ]
})
export class LightboxModule {
}
