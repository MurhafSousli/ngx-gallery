import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared';

import { AppRoutingModule } from './routing.module';
import { GalleryModule } from './gallery';
// import { GalleryModule } from 'ng-gallery';
import { SettingsModule } from './settings/settings.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SettingsModule,
    SharedModule,
    BrowserAnimationsModule,
    GalleryModule.forRoot(
      {
        style: {
          background: "#121519",
          width: "900px",
          height: "600px"
        },
        description: {
          position: 'bottom',
          overlay: false,
          text: true,
          counter: true
        },
        thumbnails: {
          width: 120,
          height: 90,
          position: 'top',
          space: 20
        },
        bullets: false,
        navigation: true,
        gestures: true
      }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
