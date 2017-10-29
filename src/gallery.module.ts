import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, Overlay } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';

import { Gallery } from './services/gallery.service';
import { GalleryConfig } from './models';

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
import { GalleryOverlayComponent } from './components/gallery-overlay/gallery-overlay.component';

import { GallerizeDirective } from './directives/gallerize.directive';
import { TapDirective } from './directives/tap.directive';
import { CONFIG } from './services/gallery.token';


/** Initialize Gallery with custom config
 * @param {GalleryConfig} config
 * @param {Overlay} overlay Required for the gallery dialog
 * @param {ViewportRuler} viewportRuler Required for the gallery dialog
 **/
export function galleryFactory(config: GalleryConfig, overlay: Overlay, viewportRuler: ViewportRuler) {
  return new Gallery(config, overlay, viewportRuler);
}

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
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
    GalleryOverlayComponent,
    GallerizeDirective,
    TapDirective
  ],
  exports: [
    GalleryComponent,
    GallerizeDirective
  ],
  entryComponents: [
    GalleryOverlayComponent
  ]
})
export class GalleryModule {
  static forRoot(config?: GalleryConfig): ModuleWithProviders {

    return {
      ngModule: GalleryModule,
      providers: [
        {provide: CONFIG, useValue: config},
        {
          provide: Gallery,
          useFactory: galleryFactory,
          deps: [CONFIG, Overlay, ViewportRuler]
        }
      ]
    };
  }
}
