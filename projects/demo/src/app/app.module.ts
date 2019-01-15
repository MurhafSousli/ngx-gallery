import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighlightModule } from 'ngx-highlightjs';

import { AppRoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { Pixabay } from './service/pixabay.service';
import { GalleryMockDialog } from './shared/gallery-mock-dialog';
import { SharedModule } from './shared/shared.module';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { GALLERY_CONFIG } from '@ngx-gallery/core';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
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
    HighlightModule.forRoot({languages: hljsLanguages})
  ],
  providers: [
    Pixabay,
    {
      provide: GALLERY_CONFIG,
      useValue: {
        imageSize: 'cover'
      }
    }
  ],
  entryComponents: [
    GalleryMockDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
