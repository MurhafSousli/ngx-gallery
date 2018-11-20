import { InjectionToken } from '@angular/core';

export const LIGHTBOX_CONFIG = new InjectionToken<LightboxConfig>('lightboxConfig');

export interface LightboxConfig {
  backdropClass?: string;
  panelClass?: string;
  hasBackdrop?: boolean;
  keyboardShortcuts?: boolean;
  closeIcon?: string;
  role?: string;
  ariaLabelledBy?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}
