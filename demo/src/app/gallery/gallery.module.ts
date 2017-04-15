import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryService } from './service/gallery.service';
import { GalleryConfig } from './service/gallery.config';

import { GalleryComponent } from './component/gallery/gallery.component';
import { GalleryNavComponent } from './component/gallery-nav/gallery-nav.component';
import { GalleryThumbnailsComponent } from './component/gallery-thumb/gallery-thumb.component';
import { GalleryTextComponent } from './component/gallery-text/gallery-text.component';

import { GalleryDirective } from './directive/gallery.directive';
import { LazyLoadImageDirective } from './directive/lazyload-image.directive';
import { GalleryImageComponent } from './component/gallery-image/gallery-image.component';
import { GalleryLoaderComponent } from './component/gallery-loader/gallery-loader.component';
import { GalleryModalComponent } from './component/gallery-modal/gallery-modal.component';
import { GalleryBaseComponent } from './component/gallery-base/gallery-base.component';

/** Initialize ConfigService with URL */
export function galleryFactory(config: GalleryConfig) {
  return new GalleryService(config);
}

export const CONFIG = new InjectionToken<GalleryConfig>('config');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GalleryComponent,
    GalleryNavComponent,
    LazyLoadImageDirective,
    GalleryThumbnailsComponent,
    GalleryDirective,
    GalleryTextComponent,
    GalleryImageComponent,
    GalleryLoaderComponent,
    GalleryModalComponent,
    GalleryBaseComponent
  ],
  exports: [
    GalleryComponent,
    GalleryDirective,
    GalleryModalComponent
  ]
})
export class GalleryModule {
  static forRoot(config?: GalleryConfig): ModuleWithProviders {

    return {
      ngModule: GalleryModule,
      providers: [
        { provide: CONFIG, useValue: config },
        {
          provide: GalleryService,
          useFactory: galleryFactory,
          deps: [CONFIG]
        }
      ]
    };
  }
}

