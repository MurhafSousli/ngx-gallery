import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';

import { Gallery } from './services/gallery.service';
import { GalleryConfig } from './models';
import { CONFIG } from './services/gallery.token';

import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryNavComponent } from './components/gallery-nav/gallery-nav.component';
import { GalleryThumbComponent } from './components/gallery-thumb/gallery-thumb.component';
import { GalleryTextComponent } from './components/gallery-text/gallery-text.component';
import { GalleryItemsComponent } from './components/gallery-items/gallery-items.component';
import { GalleryLoaderComponent } from './components/gallery-loader/gallery-loader.component';
import { GalleryBulletsComponent } from './components/gallery-bullets/gallery-bullets.component';
import { GalleryPlayerComponent } from './components/gallery-player/gallery-player.component';
import { GalleryMainComponent } from './components/gallery-main/gallery-main.component';
import { GallerySliderComponent } from './components/gallery-slider/gallery-slider.component';
import { GalleryLightboxComponent } from './components/gallery-lightbox/gallery-lightbox.component';

import { GallerizeDirective } from './directives/gallerize.directive';
import { TapDirective } from './directives/tap.directive';
import { LazyDirective } from './directives/lazy.directive';

/**
 * Initialize Gallery with custom config
 * @param {GalleryConfig} config
 * @param {Overlay} overlay
 * @returns {Gallery}
 */
export function galleryFactory(config: GalleryConfig, overlay: Overlay) {
  return new Gallery(config, overlay);
}

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    GalleryComponent,
    GalleryNavComponent,
    GalleryThumbComponent,
    GalleryTextComponent,
    GalleryItemsComponent,
    GalleryLoaderComponent,
    GalleryBulletsComponent,
    GalleryPlayerComponent,
    GalleryMainComponent,
    GallerySliderComponent,
    GalleryLightboxComponent,
    GallerizeDirective,
    TapDirective,
    LazyDirective
  ],
  exports: [
    GalleryComponent,
    GallerizeDirective
  ],
  entryComponents: [
    GalleryLightboxComponent
  ]
})
export class GalleryModule {
  static forRoot(config?: GalleryConfig): ModuleWithProviders {

    return {
      ngModule: GalleryModule,
      providers: [
        { provide: CONFIG, useValue: config },
        {
          provide: Gallery,
          useFactory: galleryFactory,
          deps: [CONFIG, Overlay]
        }
      ]
    };
  }
}
