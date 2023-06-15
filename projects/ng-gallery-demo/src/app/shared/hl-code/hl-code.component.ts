import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HighlightModule } from 'ngx-highlightjs';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'hl-code',
  templateUrl: './hl-code.component.html',
  styleUrls: ['./hl-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgScrollbarModule, NgIf, HighlightModule, MatButtonModule, ClipboardModule, MatIconModule]
})
export class HlCodeComponent {

  @Input() code: string;
  @Input() disabled: boolean;
  @Input() track = 'vertical';

  constructor(public snackBar: MatSnackBar) {
  }

}


