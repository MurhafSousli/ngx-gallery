import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: HomeComponent
      }
    ])
  ]

})
export class HomeModule {
}
