import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
// import { GalleryModule } from './core/public_api';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { GallerizeModule } from '@ngx-gallery/gallerize';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    GalleryModule.forRoot(),
    LightboxModule.forRoot(),
    GallerizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
