import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LightboxModule } from './lightbox/lightbox.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { RibbonComponent } from './ribbon/ribbon.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    RibbonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LightboxModule.forRoot(
      {
        width: 1000,
        height: 500,
        transition: 'all linear 200ms',
        thumb: {
          width: 90,
          height: 60,
          position: 'right',
          overlay: false
        }
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
