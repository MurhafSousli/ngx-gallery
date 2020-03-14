import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

import { AppRoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { GalleryMockDialog } from './shared/gallery-mock-dialog';
import { SharedModule } from './shared/shared.module';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

import { GALLERY_CONFIG } from '../../../ngx-gallery/src/public-api';

// =================
// ICONS
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';
import { NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';

// =================
// Highlight.js languages
export function getHighlightLanguages() {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
    css: () => import('highlight.js/lib/languages/css'),
    xml: () => import('highlight.js/lib/languages/xml')
  };
}

@NgModule({
  declarations: [
    AppComponent,
    GalleryMockDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    NgProgressModule,
    NgProgressHttpModule,
    NgProgressRouterModule,
    HighlightModule
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
        languages: getHighlightLanguages()
      }
    },
    {
      provide: NG_SCROLLBAR_OPTIONS,
      useValue: {
        appearance: 'compact'
      }
    }
  ],
  entryComponents: [
    GalleryMockDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTwitter);
    library.addIcons(faGithub);
    library.addIcons(faExternalLinkAlt);
  }
}
