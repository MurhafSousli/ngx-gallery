import { NgModule, ModuleWithProviders } from '@angular/core';
import { LightboxDirective } from './lightbox.directive';
import { LightboxConfig, LIGHTBOX_CONFIG } from './lightbox.model';
import { GallerizeDirective } from './gallerize.directive';

@NgModule({
  imports: [LightboxDirective, GallerizeDirective  ],
  exports: [LightboxDirective, GallerizeDirective  ]
})
export class LightboxModule {
  static withConfig(config: LightboxConfig): ModuleWithProviders<LightboxModule> {
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
