import { InjectionToken } from '@angular/core';

export const LIGHTBOX_CONFIG = new InjectionToken<LightboxConfig>('LIGHTBOX_CONFIG');

export interface LightboxConfig {
  backdropClass?: string;
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  keyboardShortcuts?: boolean;
  closeIcon?: string;
  role?: string;
  ariaLabelledBy?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  startAnimationTime?: number;
  exitAnimationTime?: number;
}
