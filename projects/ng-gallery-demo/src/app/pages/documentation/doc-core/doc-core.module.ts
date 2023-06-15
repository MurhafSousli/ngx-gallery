import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DocCoreComponent } from './doc-core/doc-core.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocCoreComponent
      }
    ]),
    DocCoreComponent
  ]
})
export class DocCoreModule {
}
