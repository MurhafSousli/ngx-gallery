import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'section-title',
  template: `
    <div fxLayout fxLayoutAlign="start center">
      <h2>
        <i class="fas fa-caret-right" aria-hidden="true"></i>
        <fa-icon [icon]="iconCaretRight" size="lg"/>
        <ng-content/>
      </h2>
    </div>
  `,
  styleUrl: 'section-title.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule]
})
export class SectionTitleComponent {

  iconCaretRight = faCaretRight;
}
