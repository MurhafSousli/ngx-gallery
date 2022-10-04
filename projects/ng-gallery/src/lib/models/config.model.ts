import { InjectionToken, TemplateRef } from '@angular/core';

export const GALLERY_CONFIG = new InjectionToken<GalleryConfig>('GALLERY_CONFIG');

export interface GalleryConfig {
  nav?: boolean;
  dots?: boolean;
  loop?: boolean;
  thumb?: boolean;
  zoomOut?: number;
  navIcon?: string;
  counter?: boolean;
  dotsSize?: number;
  gestures?: boolean;
  autoPlay?: boolean;
  thumbWidth?: number;
  thumbHeight?: number;
  loadingIcon?: string;
  loadingError?: string;
  thumbLoadingIcon?: string;
  thumbLoadingError?: string;
  disableThumb?: boolean;
  panSensitivity?: number;
  playerInterval?: number;
  reserveGesturesAction?: boolean;
  itemTemplate?: TemplateRef<any>;
  thumbTemplate?: TemplateRef<any>;
  thumbMode?: 'strict' | 'free';
  imageSize?: 'cover' | 'contain';
  dotsPosition?: 'top' | 'bottom';
  counterPosition?: 'top' | 'bottom';
  slidingDirection?: 'horizontal' | 'vertical';
  loadingStrategy?: 'preload' | 'lazy' | 'default';
  thumbPosition?: 'top' | 'left' | 'right' | 'bottom';
  thumbView?: 'default' | 'contain';
}
