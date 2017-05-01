import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdSelectModule, MdDialogModule, MdToolbarModule, MdCardModule, MdButtonModule, MdMenuModule, MdInputModule, MdCheckboxModule, MdIconModule, MdSidenavModule } from '@angular/material';

import { HighlightModule } from './highlight/highlight.module';
import { SharedService } from './service/shared.service';
import { ObjectInputComponent } from './object-input/object-input.component';
import { KeysPipe } from './keys.pipe';
import { ReactiveInputComponent } from './reactive-input/reactive-input.component';

@NgModule({
  providers: [
    SharedService
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HighlightModule,

    MdInputModule,
    MdCardModule,
    MdMenuModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdSidenavModule,
    MdSelectModule,
    MdDialogModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveInputComponent,
    RouterModule,
    HighlightModule,
    ObjectInputComponent,
    
    MdInputModule,
    MdCardModule,
    MdMenuModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdSidenavModule,
    MdSelectModule,
    MdDialogModule
  ],
  declarations: [ObjectInputComponent, KeysPipe, ReactiveInputComponent],
})
export class SharedModule {
}
