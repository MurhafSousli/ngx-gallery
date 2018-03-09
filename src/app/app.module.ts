import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GalleryModule } from './gallery/core';
import { LightboxModule } from './gallery/lightbox';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(),
    LightboxModule.forRoot({
      panelClass: 'fullscreen'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
