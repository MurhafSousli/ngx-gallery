import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'section-title',
  template: `
    <div fxLayout fxLayoutAlign="start center">
      <h2>
        <i class="fas fa-caret-right" aria-hidden="true"></i>
        <fa-icon [icon]="iconCaretRight" size="lg"></fa-icon>
        <ng-content></ng-content>
      </h2>
    </div>
  `,
  styleUrls: ['section-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionTitleComponent {

  iconCaretRight = faCaretRight;
}
