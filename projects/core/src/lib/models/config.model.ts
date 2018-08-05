import { TemplateRef } from '@angular/core';

export interface GalleryConfig {
  nav?: boolean;
  dots?: boolean;
  loop?: boolean;
  fluid?: boolean;
  thumb?: boolean;
  zoomOut?: number;
  navIcon?: string;
  counter?: boolean;
  gestures?: boolean;
  thumbWidth?: number;
  thumbHeight?: number;
  loadingIcon?: string;
  disableThumb?: boolean;
  panSensitivity?: number;
  itemTemplate?: TemplateRef<any>;
  thumbTemplate?: TemplateRef<any>;
  thumbMode?: 'strict' | 'free';
  slidingDirection?: 'horizontal' | 'vertical';
  loadingStrategy?: 'preload' | 'lazy' | 'default';
  thumbPosition?: 'top' | 'left' | 'right' | 'bottom';
}
