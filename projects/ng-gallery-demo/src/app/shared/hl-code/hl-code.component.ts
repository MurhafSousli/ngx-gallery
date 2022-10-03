import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hl-code',
  templateUrl: './hl-code.component.html',
  styleUrls: ['./hl-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HlCodeComponent {

  @Input() code: string;
  @Input() disabled: boolean;
  @Input() track = 'vertical';

  constructor(public snackBar: MatSnackBar) {
  }

}


