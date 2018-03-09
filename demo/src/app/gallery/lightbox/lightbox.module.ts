import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { Gallery, GalleryModule } from '../../gallery/core';

import { LightboxConfig } from './lightbox.model';
import { Lightbox } from './lightbox.service';
import { LightboxComponent } from './lightbox.component';

export const LIGHTBOX_CONFIG = new InjectionToken<LightboxConfig>('lightboxConfig');

export function lightboxFactory(config: LightboxConfig, gallery: Gallery, overlay: Overlay) {
  return new Lightbox(config, gallery, overlay);
}

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    GalleryModule
  ],
  declarations: [
    LightboxComponent
  ],
  entryComponents: [
    LightboxComponent
  ]
})
export class LightboxModule {
  static forRoot(config?: LightboxConfig) {

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
