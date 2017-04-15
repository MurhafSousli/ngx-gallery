import {
  Component,
  AfterContentInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import 'prismjs/prism';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-batch.js';

declare const Prism: any;

@Component({
  selector: 'highlight',
  template: '<pre><code [innerHtml]="codeString"></code></pre>',
  styleUrls: ['highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HighlightComponent implements AfterContentInit {


  @Input() lang;

  @Input() code;

  codeString;

  constructor() {
  }

  ngAfterContentInit() {
    let code;
    switch (this.lang) {
      case 'ts':
        code = Prism.highlight(this.code, Prism.languages.typescript);
        break;
      case 'scss':
        code = Prism.highlight(this.code, Prism.languages.scss);
        break;
      case 'html':
        code = Prism.highlight(this.code, Prism.languages.markup);
        break;
      default:
        code = Prism.highlight(this.code, Prism.languages.batch);
    }
    this.codeString = code;
  }


}
