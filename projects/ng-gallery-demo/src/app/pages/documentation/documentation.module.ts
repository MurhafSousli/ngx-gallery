import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponent } from './documentation.component';

import { docRoutes } from './routes';

@NgModule({
  imports: [
    RouterModule.forChild(docRoutes),
    DocumentationComponent
  ]
})
export class DocumentationModule {
}
