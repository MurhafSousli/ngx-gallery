import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { GALLERY_CONFIG } from 'ng-gallery';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
// ICONS
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './routing.module';


import { AppComponent } from './app.component';

import { GalleryMockDialog } from './shared/gallery-mock-dialog';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    GalleryMockDialog
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        imageSize: 'cover'
      }
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTwitter, faGithub, faExternalLinkAlt);
  }
}
