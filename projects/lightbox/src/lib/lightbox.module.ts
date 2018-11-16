import { NgModule, ModuleWithProviders } from '@angular/core';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

import { Lightbox } from './lightbox.service';
import { LightboxComponent } from './lightbox.component';
import { LightboxDirective } from './lightbox.directive';
import { LightboxConfig } from './lightbox.model';
import { LIGHTBOX_CONFIG } from './lightbox.token';

export function lightboxFactory(config: LightboxConfig, gallery: Gallery, overlay: Overlay) {
  return new Lightbox(config, gallery, overlay);
}

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
  static forRoot(config?: LightboxConfig): ModuleWithProviders {

    return {
      ngModule: LightboxModule,
      providers: [
        {
          provide: LIGHTBOX_CONFIG,
          useValue: config
        },
        {
          provide: Lightbox,
          useFactory: lightboxFactory,
          deps: [LIGHTBOX_CONFIG, Gallery, Overlay]
        }
      ]
    };
  }
}
