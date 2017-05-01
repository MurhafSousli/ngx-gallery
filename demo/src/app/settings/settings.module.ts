import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/share.module';

import { DescOptionsComponent } from './desc-options/desc-options.component';
import { ThumbOptionsComponent } from './thumb-options/thumb-options.component';
import { GalleryOptionsComponent } from './gallery-options/gallery-options.component';
import { LoaderOptionsComponent } from './loader-options/loader-options.component';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';
import { BulletsOptionsComponent } from './bullets-options/bullets-options.component';
import { PlayOptionsComponent } from './play-options/play-options.component';
import { ServiceOptionsComponent } from './service-options/service-options.component';
import { NavOptionsComponent } from './nav-options/nav-options.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    DescOptionsComponent,
    ThumbOptionsComponent,
    GalleryOptionsComponent,
    LoaderOptionsComponent,
    ImportDialogComponent,
    BulletsOptionsComponent,
    PlayOptionsComponent,
    ServiceOptionsComponent,
    NavOptionsComponent
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
