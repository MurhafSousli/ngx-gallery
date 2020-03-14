import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
// import { GalleryModule } from '@ngx-gallery/core';
import { GalleryModule } from '../../src/public-api';

import { Lightbox } from './lightbox.service';
import { LightboxComponent } from './lightbox.component';
import { LightboxDirective } from './lightbox.directive';
import { LightboxConfig, LIGHTBOX_CONFIG } from './lightbox.model';
import { GallerizeDirective } from './gallerize.directive';

@NgModule({
  imports: [
    OverlayModule,
    GalleryModule,
    A11yModule
  ],
  declarations: [
    LightboxComponent,
    LightboxDirective,
    GallerizeDirective
  ],
  exports: [
    LightboxDirective,
    GallerizeDirective
  ],
  providers: [
    Lightbox
  ],
  entryComponents: [
    LightboxComponent
  ]
})
export class LightboxModule {
  static withConfig(config: LightboxConfig): ModuleWithProviders {
    return {
      ngModule: LightboxModule,
      providers: [
        {
          provide: LIGHTBOX_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
