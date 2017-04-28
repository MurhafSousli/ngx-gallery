import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdToolbarModule, MdCardModule, MdButtonModule, MdMenuModule, MdInputModule} from '@angular/material';

import {HighlightModule} from './highlight/highlight.module';
import {SharedService} from './service/shared.service';
import {ObjectInputComponent} from './object-input/object-input.component';
import {KeysPipe} from './keys.pipe';
import {ReactiveInputComponent} from './reactive-input/reactive-input.component';

@NgModule({
  providers: [
    SharedService
  ],
  imports: [
    FormsModule,
    MdInputModule,
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
    MdButtonModule,
    ObjectInputComponent,
    ReactiveFormsModule,
    FormsModule,
    MdInputModule,
    ReactiveInputComponent
  ],
  declarations: [ObjectInputComponent, KeysPipe, ReactiveInputComponent],
})
export class SharedModule {
}
