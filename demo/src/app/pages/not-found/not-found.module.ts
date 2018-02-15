import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: NotFoundComponent}
    ])
  ]

})
export class NotFoundPageModule {
}
