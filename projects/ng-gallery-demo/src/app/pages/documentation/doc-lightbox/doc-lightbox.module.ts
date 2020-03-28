import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocLightboxComponent } from './doc-lightbox/doc-lightbox.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: DocLightboxComponent}])
  ],
  declarations: [DocLightboxComponent]
})
export class DocLightboxModule { }
