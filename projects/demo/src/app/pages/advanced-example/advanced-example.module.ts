import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatRadioModule } from '@angular/material';
import { AdvancedExampleComponent } from './advanced-example.component';
import { SharedModule } from '../../shared/shared.module';
import { SlideThreeComponent } from './steps/slide-three';
import { SlideOneComponent } from './steps/slide-one';
import { SlideTwoComponent } from './steps/slide-two';
import { TabComponent } from './steps/tab';

@NgModule({
  declarations: [
    AdvancedExampleComponent,
    SlideThreeComponent,
    SlideOneComponent,
    SlideTwoComponent,
    TabComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdvancedExampleComponent,
        data: {
          title: 'Advanced Example'
        }
      }
    ]),
    MatRadioModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SlideThreeComponent,
    SlideOneComponent,
    SlideTwoComponent,
    TabComponent
  ]
})
export class AdvancedExampleModule {
}
