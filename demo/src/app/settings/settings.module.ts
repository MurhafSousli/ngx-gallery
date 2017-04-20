import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DescOptionsComponent} from './desc-options/desc-options.component';
import {ThumbOptionsComponent} from './thumb-options/thumb-options.component';
import {GalleryOptionsComponent} from './gallery-options/gallery-options.component';
import {LoaderOptionsComponent} from './loader-options/loader-options.component';
import {
  MdCheckboxModule,
  MdDialogModule,
  MdInputModule,
  MdSelectModule,
  MdToolbarModule,
  MdButtonModule
} from '@angular/material';
import {ImportDialogComponent} from './import-dialog/import-dialog.component';
import { BulletsOptionsComponent } from './bullets-options/bullets-options.component';
import { PlayOptionsComponent } from './play-options/play-options.component';
import { ServiceOptionsComponent } from './service-options/service-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    MdToolbarModule,
    MdButtonModule,
    MdDialogModule
  ],
  declarations: [
    DescOptionsComponent,
    ThumbOptionsComponent,
    GalleryOptionsComponent,
    LoaderOptionsComponent,
    ImportDialogComponent,
    BulletsOptionsComponent,
    PlayOptionsComponent,
    ServiceOptionsComponent
  ],
  entryComponents: [
    ImportDialogComponent
  ],
  exports: [
    GalleryOptionsComponent
  ]
})
export class SettingsModule {
}
