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
  thumbFreeScroll?: boolean;
  itemTemplate?: TemplateRef<any>;
  thumbTemplate?: TemplateRef<any>;
  slidingDirection?: 'horizontal' | 'vertical';
  loadingStrategy?: 'preload' | 'lazy' | 'default';
  thumbPosition?: 'top' | 'left' | 'right' | 'bottom';
}
