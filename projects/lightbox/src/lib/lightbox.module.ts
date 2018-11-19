import { NgModule, ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { GalleryModule } from '@ngx-gallery/core';

import { LightboxComponent } from './lightbox.component';
import { LightboxDirective } from './lightbox.directive';
import { LightboxConfig } from './lightbox.model';
import { LIGHTBOX_CONFIG } from './lightbox.token';

@NgModule({
  imports: [
    OverlayModule,
    GalleryModule,
    A11yModule
  ],
  declarations: [
    LightboxComponent,
    LightboxDirective
  ],
  exports: [
    LightboxDirective
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
