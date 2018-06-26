import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div class="tab" fxLayout fxLayoutAlign="space-between center">
      <div fxLayout fxLayoutAlign="center center" class="tab-number">{{data.index}}</div>
      <div fxLayout="column" fxLayoutAlign="space-around start">
        <h3>{{data.title}}</h3>
        <div>{{data.subtitle}}</div>
      </div>
    </div>
  `,
  styles: [`
    .tab {
      width: 100%;
      height: 100%;
      color: #3F51B5;
      font-size: 12px;
    }

    .tab-number {
      margin-right: 1em;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      font-size: 18px;
      background-color: #3F51B5;
      color: white;
    }

    h3 {
      margin: 0;
    }
  `]
})
export class TabComponent {
  @Input() data;
}
