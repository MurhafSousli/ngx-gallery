import { InjectionToken } from '@angular/core';

export const DIALOG_CLOSEDBY_SUPPORTED = new InjectionToken<boolean>('DIALOG_CLOSEBY_SUPPORTED', {
  factory: () => 'closedBy' in HTMLDialogElement.prototype
});
