import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/share.module';
import { GalleryModule } from '../gallery/gallery.module';

import { BasicExampleComponent } from './basic-example/basic-example.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';
import { AutoDetectExampleComponent } from './auto-detect-example/auto-detect-example.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { ReloadComponent } from './reload/reload.component';

@NgModule({
  declarations: [
    ModalExampleComponent,
    AutoDetectExampleComponent,
    BasicExampleComponent,
    DocumentationComponent,
    HomeComponent,
    ReloadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GalleryModule
  ]
})
export class PagesModule {
}
