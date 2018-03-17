import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GalleryModule } from './gallery/core';
import { LightboxModule } from './gallery/lightbox';
import { GallerizeModule } from './gallery/gallerize';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    BrowserAnimationsModule,
    GalleryModule.forRoot(),
    LightboxModule.forRoot(),
    GallerizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
