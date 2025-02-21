import { InjectionToken, Provider, TemplateRef } from '@angular/core';
import { BezierEasingOptions } from '../smooth-scroll';
import { defaultConfig } from '../utils/gallery.default';
import { GalleryItemData } from '../templates/items.model';

export const GALLERY_CONFIG: InjectionToken<GalleryConfig> = new InjectionToken<GalleryConfig>('GALLERY_CONFIG', {
  providedIn: 'root',
  factory: () => defaultConfig
});

export function provideGalleryOptions(options: GalleryConfig): Provider {
  return {
    provide: GALLERY_CONFIG,
    useValue: { ...defaultConfig, ...options }
  }
}

type ImageSize = 'contain' | 'cover';

type Orientation = 'horizontal' | 'vertical';

type ThumbsPosition = 'top' | 'left' | 'right' | 'bottom';

type HorizontalPosition = 'top' | 'bottom';

type LoadingStrategy = 'preload' | 'lazy' | 'default';

type LoadingAttr = 'eager' | 'lazy';

interface ThumbConfig {
  thumbLoadingIcon?: string;
  thumbLoadingError?: string;
}

interface NavConfig {
  navIcon?: string;
}

interface PlayerConfig {
  autoplay?: boolean;
  autoplayInterval?: number;
}

interface SliderConfig {
  loop?: boolean;
  disableScroll?: boolean;
  disableMouseScroll?: boolean;
  itemAutosize?: boolean;
  loadingIcon?: string;
  loadingError?: string;
  scrollDuration?: number;
  scrollEase?: BezierEasingOptions;
  orientation?: Orientation;
  imageSize?: ImageSize;
  loadingStrategy?: LoadingStrategy;
  loadingAttr?: LoadingAttr;
  centralized?: boolean;
}

export type GalleryConfig = SliderConfig
  & ThumbConfig
  & NavConfig
  & PlayerConfig
  & {
  scrollBehavior?: ScrollBehavior;
  resizeDebounceTime?: number;
  debug?: boolean;
}
