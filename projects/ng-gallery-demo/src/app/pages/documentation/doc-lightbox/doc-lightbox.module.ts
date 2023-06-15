import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocLightboxComponent } from './doc-lightbox/doc-lightbox.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DocLightboxComponent }]),
    DocLightboxComponent
  ]
})
export class DocLightboxModule {
}
