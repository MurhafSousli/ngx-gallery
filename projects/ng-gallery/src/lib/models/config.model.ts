import { BezierEasingOptions } from '../smooth-scroll/smooth-scroll.model';

export type GalleryItemState = 'ready' | 'loading' | 'error';

export type GalleryOrientation = 'horizontal' | 'vertical';

export type GalleryCounterPosition = 'top' | 'bottom';

export type GalleryAutoplayPause = 'hover' | 'click' | 'never';

export type GalleryAutoplayDirection = 'forward' | 'backward' | 'ping-pong';

export type GalleryDock =
  | 'top'
  | 'bottom'
  | 'start'
  | 'end';

export type GalleryPosition =
  | GalleryDock
  | 'center';


export type GalleryAlign =
  | 'start'
  | 'end'
  | 'center'
  | 'stretch';

export type GallerySnapAlign =
  | 'start'
  | 'end'
  | 'center'

interface SliderOptions {
  gap?: number;
  loop?: boolean;
  forceSnap?: boolean;
  itemsPerView?: number;
  steps?: number | 'page';
  scrollDuration?: number;
  disableScroll?: boolean;
  orientation?: GalleryOrientation;
  itemSize?: number | 'auto';
  disableMouseScroll?: boolean;
  snapAlign?: GallerySnapAlign;
  scrollEase?: BezierEasingOptions;
  resizeTransitionDuration?: number;
}

export interface ThumbOptions {
  thumbDisabled?: boolean;
  detachThumbs?: boolean;
  thumbFloating?: boolean;
  thumbForceSnap?: boolean;
  disableThumbScroll?: boolean;
  disableThumbMouseScroll?: boolean;
  thumbLoop?: boolean;
  thumbSteps?: number | 'page';
  thumbSize?: number | 'auto';
  thumbGap?: number;
  thumbThickness?: number;
  thumbPerView?: number;
  thumbPosition?: GalleryDock;
  thumbSnapAlign?: GallerySnapAlign;
  thumbScrollBehavior?: ScrollBehavior;
}

interface NavOptions {
  showNavDisabledButtons?: boolean;
  navOutside?: boolean;
}

interface CounterOptions {
  counterAlign?: GalleryCounterPosition;
  counterText?: (active: string, total: string) => string;
}

interface PlayerOptions {
  autoplay?: boolean;
  autoplayInterval?: number;
  autoplayScrollBehavior?: ScrollBehavior;
  autoplayDirection?: GalleryAutoplayDirection;
  autoplayPause?: GalleryAutoplayPause;
}

export type GalleryOptions = SliderOptions
  & ThumbOptions
  & NavOptions
  & PlayerOptions
  & CounterOptions
  & {
  scrollBehavior?: ScrollBehavior;
  resizeDebounceTime?: number;
}
