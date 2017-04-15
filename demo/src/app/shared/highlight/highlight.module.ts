import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightComponent} from './component/highlight.component';
import {HighlightDirective} from './directive/highlight.directive';

@NgModule({
  declarations: [
    HighlightComponent,
    HighlightDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HighlightComponent,
    HighlightDirective
  ],
})
export class HighlightModule {
}
