import { InjectionToken } from '@angular/core';
import { GalleryConfig } from '../models/config.model';

export const GALLERY_CONFIG = new InjectionToken<GalleryConfig>('galleryConfig');
