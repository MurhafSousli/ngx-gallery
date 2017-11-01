import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppSharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({appId: 'ng-gallery-demo-id'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    AppSharedModule,
    HomeModule,
    GalleryModule.forRoot({
      style: {
        height: '500px',
        width: '700px'
      },
      player: {
        progress: true,
        autoplay: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
