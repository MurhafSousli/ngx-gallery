import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { GalleryConfig } from './models/config.model';
import { GALLERY_CONFIG } from './utils/gallery.token';

import { GalleryComponent } from './components/gallery.component';
import { GalleryNavComponent } from './components/gallery-nav.component';
import { GalleryCoreComponent } from './components/gallery-core.component';
import { GalleryDotsComponent } from './components/gallery-dots.component';
import { GalleryThumbsComponent } from './components/gallery-thumbs.component';
import { GallerySliderComponent } from './components/gallery-slider.component';
import { GalleryCounterComponent } from './components/gallery-counter.component';

import { GalleryItemComponent } from './components/gallery-item.component';
import { GalleryThumbComponent } from './components/gallery-thumb.component';
import { GalleryImageComponent } from './components/templates/gallery-image.component';
import { GalleryVideoComponent } from './components/templates/gallery-video.component';
import { GalleryIframeComponent } from './components/templates/gallery-iframe.component';
import { RadialProgressComponent } from './components/templates/radial-progress.component';

import { LazyImage } from './directives/lazy-image';
import { TapClick } from './directives/tap-click';
import { CachingInterceptor } from './services/cache.interceptor';
import { RequestCache, RequestCacheWithMap } from './services/cache.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {provide: RequestCache, useClass: RequestCacheWithMap},
    {provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true}
  ],
  declarations: [
    GalleryComponent,
    GalleryNavComponent,
    GalleryDotsComponent,
    GalleryCoreComponent,
    GallerySliderComponent,
    GalleryCounterComponent,
    GalleryThumbsComponent,
    GalleryThumbComponent,
    GalleryItemComponent,
    GalleryImageComponent,
    GalleryVideoComponent,
    GalleryIframeComponent,
    RadialProgressComponent,
    LazyImage,
    TapClick
  ],
  exports: [
    GalleryComponent,
    LazyImage,
    TapClick,
  ]
})
export class GalleryModule {
  static withConfig(config: GalleryConfig): ModuleWithProviders {

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
