import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { tryParseJSON } from '../../shared/service/shared.service';

@Component({
  selector: 'import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportDialogComponent {

  public readOnly;
  public config;
  error;

  constructor(public dialogRef: MdDialogRef<ImportDialogComponent>) {

  }

  validateConfig(text: string) {
    const result = tryParseJSON(text);
    if (result) {
      this.config = result;
    }
    this.error = !result;
  }

  closeAndImport() {
    if (!this.error) {
      this.dialogRef.close(this.config);
    }
  }

}

