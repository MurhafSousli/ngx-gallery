import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DocGallerizeComponent } from './doc-gallerize/doc-gallerize.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: DocGallerizeComponent}])
  ],
  declarations: [DocGallerizeComponent]
})
export class DocGallerizeModule { }
