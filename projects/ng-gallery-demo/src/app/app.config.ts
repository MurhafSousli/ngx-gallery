import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideGalleryOptions } from 'ng-gallery';
import { provideScrollbarOptions } from 'ngx-scrollbar';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { progressInterceptor } from 'ngx-progressbar/http';
import { appRoutes } from './routing.module';
import { provideNgProgressRouter } from 'ngx-progressbar/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideGalleryOptions({
      imageSize: 'cover'
    }),
    provideRouter(appRoutes, withHashLocation()),
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
    provideAnimations(),
    provideNgProgressRouter({
      minDuration: 600
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors([progressInterceptor])
    )
  ]
};
