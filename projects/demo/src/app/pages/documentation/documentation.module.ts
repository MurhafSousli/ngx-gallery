import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DocumentationComponent } from './documentation.component';
import { SharedModule } from '../../shared/shared.module';
import { docRoutes } from './routes';

@NgModule({
  declarations: [DocumentationComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(docRoutes)
  ]

})
export class DocumentationModule {
}
