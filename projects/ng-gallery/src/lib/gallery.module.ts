import { NgModule, ModuleWithProviders } from '@angular/core';
import { GalleryConfig, GALLERY_CONFIG } from './models/config.model';
import { GalleryComponent } from './components/gallery.component';

@NgModule({
  imports: [GalleryComponent],
  exports: [GalleryComponent]
})
export class GalleryModule {
  static withConfig(config: GalleryConfig): ModuleWithProviders<GalleryModule> {

    return {
      ngModule: GalleryModule,
      providers: [
        {
          provide: GALLERY_CONFIG,
          useValue: config
        }
      ]
    };
  }
}
