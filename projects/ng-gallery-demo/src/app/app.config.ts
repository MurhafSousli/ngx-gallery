import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import { NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AppRoutingModule } from './routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, NgProgressModule, NgProgressHttpModule, NgProgressRouterModule),
    {
      provide: GALLERY_CONFIG,
      useValue: {
        imageSize: 'cover'
      } as GalleryConfig
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    },
    {
      provide: NG_SCROLLBAR_OPTIONS,
      useValue: {
        appearance: 'compact'
      }
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
