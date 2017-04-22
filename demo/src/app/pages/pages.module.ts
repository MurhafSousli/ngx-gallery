import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicExampleComponent} from './basic-example/basic-example.component';
import {ModalExampleComponent} from './modal-example/modal-example.component';
import {AutoDetectExampleComponent} from './auto-detect-example/auto-detect-example.component';
import {SharedModule} from '../shared/share.module';
import {GalleryModule} from '../gallery/gallery.module';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { ReloadOptionsComponent } from './reload-options/reload-options.component';

@NgModule({
  declarations: [
    ModalExampleComponent,
    AutoDetectExampleComponent,
    BasicExampleComponent,
    DocumentationComponent,
    HomeComponent,
    ReloadOptionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GalleryModule
  ],
  exports: [
    ModalExampleComponent,
    AutoDetectExampleComponent,
    BasicExampleComponent
  ],
})
export class PagesModule {
}
