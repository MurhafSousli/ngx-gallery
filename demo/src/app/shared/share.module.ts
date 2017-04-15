import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MdToolbarModule, MdCardModule, MdButtonModule,MdMenuModule} from '@angular/material';

import {SharedService} from './service/shared.service';
import {HighlightModule} from './highlight/highlight.module';

@NgModule({
  providers: [
    SharedService
  ],
  imports: [
    MdCardModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    CommonModule,
    RouterModule,
    HighlightModule
  ],
  exports: [
    MdCardModule,
    RouterModule,
    HighlightModule,
    MdButtonModule
  ],
})
export class SharedModule {
}
