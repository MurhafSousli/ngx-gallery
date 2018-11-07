import { InjectionToken } from '@angular/core';
import { GalleryConfig } from '../models';

export const GALLERY_CONFIG = new InjectionToken<Partial<GalleryConfig>>('galleryConfig');
