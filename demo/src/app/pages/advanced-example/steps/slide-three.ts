import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'slide-three',
  preserveWhitespaces: false,
  template: `
    <div class="slide" fxLayout="column" fxLayoutAlign="start center">
      <h2>Good luck!</h2>
      <div class="text" fxLayout fxLayoutAlign="center center">
        <mat-icon class="md-24">done</mat-icon>
        <p>Your application has been received!</p>
      </div>
      <h4>Lottery code: 123456</h4>
    </div>
  `,
  styles: [`
    .slide {
      width: 100%;
      height: 100%;
    }

    h2 {
      margin-top: 2em;
      color: #3F51B5;
    }

    h4 {
      color: #0e2231;
    }
    .text {
      margin: 2em 0;
    }

    mat-icon {
      color: #00cc66;
      font-size: 40px;
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideThreeComponent {

}
