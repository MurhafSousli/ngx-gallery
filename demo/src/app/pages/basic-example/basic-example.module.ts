import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicComponent } from './basic-example.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: BasicComponent,
        data: {
          title: 'Basic Example'
        }
      }
    ])
  ]

})
export class BasicExampleModule {
}
