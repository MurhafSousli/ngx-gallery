import { enableProdMode, importProvidersFrom } from '@angular/core';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressModule } from 'ngx-progressbar';
import { NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';

import { AppRoutingModule } from './app/routing.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
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
}).catch(err => console.error(err));
