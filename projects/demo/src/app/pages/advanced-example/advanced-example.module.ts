import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AdvancedExampleComponent } from './advanced-example.component';

@NgModule({
  declarations: [
    AdvancedExampleComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdvancedExampleComponent
      }
    ])
  ]

})
export class AdvancedExampleModule {
}
