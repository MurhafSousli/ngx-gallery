import { InjectionToken, Provider } from '@angular/core';
import { defaultConfig } from './lightbox.default';

export const LIGHTBOX_CONFIG: InjectionToken<LightboxConfig> = new InjectionToken<LightboxConfig>('LIGHTBOX_CONFIG', {
  providedIn: 'root',
  factory: () => defaultConfig
});

export interface LightboxConfig {
  backdropClass?: string | string[];
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

export function provideLightboxOptions(options: LightboxConfig): Provider {
  return {
    provide: LIGHTBOX_CONFIG,
    useValue: { ...defaultConfig, ...options }
  }
}
