import { InjectionToken } from '@angular/core';
import { LightboxConfig } from './lightbox.model';

export const LIGHTBOX_CONFIG = new InjectionToken<LightboxConfig>('lightboxConfig');
