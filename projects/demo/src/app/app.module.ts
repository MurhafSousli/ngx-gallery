import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighlightModule } from 'ngx-highlightjs';

// Gallery modules
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';

import { AppRoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';

import { Pixabay } from './service/pixabay.service';
import { ImageItemProComponent } from './extra-templates/image-item-pro.component';
import { ThumbnailItemProComponent } from './extra-templates/thumb-item-pro.component';
import { NFormatterPipe } from './shared/pipes/n-formatter.pipe';
import { GalleryMockDialog } from './shared/gallery-mock-dialog';
import { SharedModule } from './shared/shared.module';
// import { ImageItemComponent } from '../../../core/src/lib/templates/image-item.component';
// import { VideoItemComponent } from '../../../core/src/lib/templates/video-item.component';
// import { IframeItemComponent } from '../../../core/src/lib/templates/iframe-item.component';
// import { ThumbnailItemComponent } from '../../../core/src/lib/templates/thumbnail-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ThumbnailItemProComponent,
    ImageItemProComponent,
    GalleryMockDialog,
    NFormatterPipe,
    // ImageItemComponent,
    // VideoItemComponent,
    // IframeItemComponent,
    // ThumbnailItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    HighlightModule.forRoot({theme: 'tomorrow'}),
    GalleryModule.forRoot(),
    LightboxModule.forRoot()
  ],
  providers: [
    Pixabay
  ],
  entryComponents: [
    // ImageItemComponent,
    // VideoItemComponent,
    // IframeItemComponent,
    // ThumbnailItemComponent,
    ImageItemProComponent,
    ThumbnailItemProComponent,
    GalleryMockDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
