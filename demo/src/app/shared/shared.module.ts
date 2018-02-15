import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighlightModule } from 'ngx-highlightjs';
import { MaterialModule } from '../material.module';

// import { GalleryModule } from '@ngx-gallery/core';
// import { LightboxModule } from '@ngx-gallery/lightbox';
// import { GallerizeModule } from '@ngx-gallery/gallerize';
import { GalleryModule } from '../gallery/core';
import { LightboxModule } from '../gallery/lightbox';
import { GallerizeModule } from '../gallery/gallerize';

import { KeysPipe } from './pipes/keys.pipe';
import { BadgesComponent } from './badges/badges.component';

import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    BadgesComponent,
    FooterComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HighlightModule,
    FlexLayoutModule,
    GalleryModule,
    LightboxModule,
    GallerizeModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HighlightModule,
    MaterialModule,
    FlexLayoutModule,
    BadgesComponent,
    FooterComponent,
    GalleryModule,
    LightboxModule,
    GallerizeModule
  ]
})
export class SharedModule {
}
