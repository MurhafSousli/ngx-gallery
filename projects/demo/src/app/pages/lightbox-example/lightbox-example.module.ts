import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LightboxExampleComponent } from './lightbox-example.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LightboxExampleComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: LightboxExampleComponent,
        data: {
          title: 'Lightbox Example'
        }
      }
    ])
  ]
})
export class LightboxExampleModule {
}
