import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HighlightComponent} from './component/highlight.component';
import {HighlightDirective} from './directive/highlight.directive';
import { HtmlSanitizerPipe } from '../html-sanitizer.pipe';

@NgModule({
  declarations: [
    HighlightComponent,
    HighlightDirective,
    HtmlSanitizerPipe
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
