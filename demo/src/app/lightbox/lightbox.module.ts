import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightBoxComponent } from './component/light-box.component';
import { LightBoxService, LightBoxConfig } from './service/light-box.service';
import { LightBoxNavComponent } from './component/light-box-nav/light-box-nav.component';
import { LazyLoadImageDirective } from "./directive/lazyload-image.directive";
import { LightBoxImagesComponent } from './component/light-box-images/light-box-images.component';
import { LightBoxDirective } from './directive/light-box.directive';

/** Initialize ConfigService with URL */
export function lightBoxFactory(config: LightBoxConfig) {
  return new LightBoxService(config);
}

export const CONFIG = new InjectionToken<LightBoxConfig>('config');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LightBoxComponent,
    LightBoxNavComponent,
    LazyLoadImageDirective,
    LightBoxImagesComponent,
    LightBoxDirective
  ],
  exports: [
    LightBoxComponent,
    LightBoxDirective
  ]
})
class LightboxModule {
  static forRoot(config?: LightBoxConfig): ModuleWithProviders {

    return {
      ngModule: LightboxModule,
      providers: [
        { provide: CONFIG, useValue: config },
        {
          provide: LightBoxService,
          useFactory: lightBoxFactory,
          deps: [CONFIG]
        }
      ]
    };
  }
}

export { LightboxModule, LightBoxService, LightBoxDirective };
