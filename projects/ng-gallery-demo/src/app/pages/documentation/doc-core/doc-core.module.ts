import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { DocCoreComponent } from './doc-core/doc-core.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: DocCoreComponent }]),
    DocCoreComponent
  ]
})
export class DocCoreModule {
}
