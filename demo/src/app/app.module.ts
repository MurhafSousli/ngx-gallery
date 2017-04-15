import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdCheckboxModule, MdButtonModule, MdToolbarModule, MdIconModule} from '@angular/material';

import {AppRoutingModule} from './routing.module';
import {GalleryModule} from './gallery/gallery.module';
import {SettingsModule} from './settings/settings.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MainComponent} from './main/main.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    AppRoutingModule,
    SettingsModule,
    GalleryModule.forRoot(
      {
        width: '900px',
        height: '500px',
        description: {
          position: 'bottom',
          overlay: true,
          text: true,
          counter: true
        },
        thumbnails: {
          width: 120,
          height: 90,
          position: 'top'
        }
      }
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
