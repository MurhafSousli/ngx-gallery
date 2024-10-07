import { InjectionToken, Provider, TemplateRef } from '@angular/core';
import { BezierEasingOptions } from '../smooth-scroll';
import { defaultConfig } from '../utils/gallery.default';

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
  thumbTemplate?: TemplateRef<any>;
}

interface NavConfig {
  navIcon?: string;
}

interface BulletsConfig {
  bullets?: boolean;
  disableBullets?: boolean;
  bulletSize?: number;
  bulletPosition?: HorizontalPosition;
}

interface CounterConfig {
  counter?: boolean;
  counterPosition?: HorizontalPosition;
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
  autoHeight?: boolean;
  loadingIcon?: string;
  loadingError?: string;
  scrollDuration?: number;
  scrollEase?: BezierEasingOptions;
  orientation?: Orientation;
  imageSize?: ImageSize;
  loadingStrategy?: LoadingStrategy;
  loadingAttr?: LoadingAttr;
  boxTemplate?: TemplateRef<any>;
  itemTemplate?: TemplateRef<any>;
  imageTemplate?: TemplateRef<any>;
  centralized?: boolean;
}

export type GalleryConfig = SliderConfig
  & ThumbConfig
  & NavConfig
  & BulletsConfig
  & CounterConfig
  & PlayerConfig
  & {
  scrollBehavior?: ScrollBehavior;
  resizeDebounceTime?: number;
  debug?: boolean;
}
