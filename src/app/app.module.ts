import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GallerizeModule } from '@ngx-gallery/gallerize';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot({
      thumbPosition: 'left'
    }),
    LightboxModule.forRoot(),
    GallerizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
