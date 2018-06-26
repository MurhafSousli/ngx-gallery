import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MixedComponent } from './mixed-example.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [MixedComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: MixedComponent,
        data: {
          title: 'Mixed Example'
        }
      }
    ])
  ]

})
export class MixedExampleModule {
}
