import { InjectionToken, Provider } from '@angular/core';
import { defaultOptions } from './lightbox.default';

export const LIGHTBOX_OPTIONS: InjectionToken<LightboxOptions> = new InjectionToken<LightboxOptions>('LIGHTBOX_OPTIONS', {
  providedIn: 'root',
  factory: () => defaultOptions
});

export type DialogClosePolicy = 'any' | 'closerequest' | 'none';

export interface LightboxRef {
  hasCustomCloseButton: boolean;
  dialogElement: HTMLDialogElement;
}

export const LIGHTBOX_DIALOG = new InjectionToken<LightboxRef>('LIGHTBOX_DIALOG');

export interface LightboxOptions {
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  hideCloseButton?: boolean;
  closedBy?: DialogClosePolicy;
  disableAnimation?: boolean;
}

export function provideLightboxOptions(options: LightboxOptions): Provider {
  return {
    provide: LIGHTBOX_OPTIONS,
    useValue: { ...defaultOptions, ...options }
  }
}
