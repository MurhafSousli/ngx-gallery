import { Component, Input, inject, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { NgScrollbar } from 'ngx-scrollbar';
import { HighlightAuto } from 'ngx-highlightjs';

@Component({
  standalone: true,
  selector: 'hl-code',
  templateUrl: './hl-code.component.html',
  styleUrls: ['./hl-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSnackBarModule, NgScrollbar, MatButtonModule, ClipboardModule, MatIconModule, HighlightAuto, MatTooltip]
})
export class HlCodeComponent {

  readonly snackBar: MatSnackBar = inject(MatSnackBar);

  @Input() code: string;
  @Input() track: string = 'vertical';
  @Input({ transform: booleanAttribute }) disabled: boolean;

}


