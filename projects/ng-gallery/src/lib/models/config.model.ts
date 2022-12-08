import { InjectionToken, TemplateRef } from '@angular/core';
import { BezierEasingOptions } from '../smooth-scroll';

export const GALLERY_CONFIG = new InjectionToken<GalleryConfig>('GALLERY_CONFIG');

export interface GalleryConfig {
  scrollBehavior?: ScrollBehavior;
  navScrollBehavior?: ScrollBehavior;
  nav?: boolean;
  dots?: boolean;
  loop?: boolean;
  thumb?: boolean;
  navIcon?: string;
  counter?: boolean;
  dotsSize?: number;
  autoPlay?: boolean;
  thumbWidth?: number;
  thumbHeight?: number;
  loadingIcon?: string;
  loadingError?: string;
  thumbLoadingIcon?: string;
  thumbLoadingError?: string;
  disableThumb?: boolean;
  slidingDuration?: number;
  slidingEase?: BezierEasingOptions;
  slidingDisabled?: boolean;
  thumbSlidingDisabled?: boolean;
  mouseSlidingDisabled?: boolean;
  thumbMouseSlidingDisabled?: boolean;
  resizeDebounceTime?: number;
  playerInterval?: number;
  boxTemplate?: TemplateRef<any>;
  itemTemplate?: TemplateRef<any>;
  thumbTemplate?: TemplateRef<any>;
  thumbDetached?: boolean;
  imageSize?: 'cover' | 'contain';
  thumbImageSize?: 'cover' | 'contain';
  dotsPosition?: 'top' | 'bottom';
  counterPosition?: 'top' | 'bottom';
  slidingDirection?: 'horizontal' | 'vertical';
  loadingStrategy?: 'preload' | 'lazy' | 'default';
  thumbPosition?: 'top' | 'left' | 'right' | 'bottom';
  thumbView?: 'default' | 'contain';
  thumbAutosize?: boolean;
  itemAutosize?: boolean;
  autoHeight?: boolean;
  debug?: boolean;
}
