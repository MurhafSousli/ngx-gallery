import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideGalleryOptions } from 'ng-gallery';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { progressInterceptor } from 'ngx-progressbar/http';
import { provideNgProgressRouter } from 'ngx-progressbar/router';
import { provideScrollbarOptions } from 'ngx-scrollbar';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideGalleryOptions({
      imageSize: 'cover'
    }),
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      }
    }),
    provideScrollbarOptions({
      appearance: 'compact'
    }),
    provideNgProgressRouter({
      minDuration: 600
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([progressInterceptor])
    )
  ]
};
