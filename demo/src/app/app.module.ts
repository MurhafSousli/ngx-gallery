import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { GalleryModule } from '@ngx-gallery/core';
// import { LightboxModule } from '@ngx-gallery/lightbox';
import { GalleryModule } from './gallery/core';
import { LightboxModule } from './gallery/lightbox';
import { HighlightModule } from 'ngx-highlightjs';

import { AppRoutingModule } from './routing.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { SharedService } from './service/shared.service';
import { ImageItemProComponent } from './extra-templates/image-item-pro.component';
import { ThumbnailItemProComponent } from './extra-templates/thumb-item-pro.component';
import { HttpClientModule } from '@angular/common/http';
import { NFormatterPipe } from './shared/pipes/n-formatter.pipe';
import { GalleryMockDialog } from './shared/gallery-mock-dialog';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ThumbnailItemProComponent,
    ImageItemProComponent,
    GalleryMockDialog,
    NFormatterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HighlightModule.forRoot({theme: 'tomorrow'}),
    GalleryModule.forRoot(),
    LightboxModule.forRoot()
  ],
  providers: [
    SharedService
  ],
  entryComponents: [
    ImageItemProComponent,
    ThumbnailItemProComponent,
    GalleryMockDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
