/** Tokens took place here to avoid circular dependency warning */

import { InjectionToken } from '@angular/core';
import { GalleryConfig } from '../models';

export const CONFIG = new InjectionToken<GalleryConfig>('config');
