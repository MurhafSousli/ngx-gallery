import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Gallery } from './services/gallery.service';
import { GalleryConfig } from './models';

import { GalleryComponent } from './components/gallery.component';
import { GalleryCoreComponent } from './components/gallery-core.component';
import { GalleryNavComponent } from './components/gallery-nav.component';
import { GalleryThumbComponent } from './components/gallery-thumb.component';
import { GalleryDotsComponent } from './components/gallery-dots.component';
import { GallerySliderComponent } from './components/gallery-slider.component';
import { GalleryCounterComponent } from './components/gallery-counter.component';

import { LazyDirective } from './directives/lazy.directive';
import { TapClickDirective } from './directives/tap-click.directive';
import { GalleryItemDirective } from './directives/gallery-item.directive';
import { ImageItemComponent } from './templates/image-item.component';
import { VideoItemComponent } from './templates/video-item.component';
import { IframeItemComponent } from './templates/iframe-item.component';
import { ThumbnailItemComponent } from './templates/thumbnail-item.component';

export const GALLERY_CONFIG = new InjectionToken<GalleryConfig>('galleryConfig');

export function galleryFactory(galleryConfig: GalleryConfig) {
  return new Gallery(galleryConfig);
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GalleryComponent,
    GalleryCoreComponent,
    GalleryNavComponent,
    GalleryThumbComponent,
    GalleryDotsComponent,
    GallerySliderComponent,
    GalleryCounterComponent,
    ImageItemComponent,
    VideoItemComponent,
    IframeItemComponent,
    ThumbnailItemComponent,
    GalleryItemDirective,
    LazyDirective,
    TapClickDirective
  ],
  exports: [
    GalleryComponent,
    LazyDirective,
    TapClickDirective
  ],
  entryComponents: [
    IframeItemComponent,
    ImageItemComponent,
    VideoItemComponent,
    ThumbnailItemComponent
  ]
})
export class GalleryModule {
  static forRoot(config?: GalleryConfig) {

    return {
      ngModule: GalleryModule,
      providers: [
        {
          provide: GALLERY_CONFIG,
          useValue: config
        },
        {
          provide: Gallery,
          useFactory: galleryFactory,
          deps: [GALLERY_CONFIG]
        }
      ]
    };
  }
}
