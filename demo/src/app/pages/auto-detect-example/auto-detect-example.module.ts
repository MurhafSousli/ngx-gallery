import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AutoDetectExampleComponent } from './auto-detect-example.component';

@NgModule({
  declarations: [
    AutoDetectExampleComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AutoDetectExampleComponent,
        data: {
          title: 'Auto-Detect Example'
        }
      }
    ])
  ]

})
export class AutoDetectExampleModule { }
