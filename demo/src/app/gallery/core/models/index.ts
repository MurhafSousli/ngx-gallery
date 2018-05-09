import { Type } from '@angular/core';

export interface GalleryState {
  action?: GalleryAction;
  items?: GalleryItem[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface GalleryItem {
  data?: any;
  component?: Type<any>;
  thumbComponent?: Type<any>;
}

export enum GalleryAction {
  INITIALIZED = 'initialized',
  ITEMS_CHANGED = 'itemsChanged',
  INDEX_CHANGED = 'indexChanged',
  OPENED = 'opened',
  CLOSED = 'closed'
}

export interface GalleryConfig {
  gestures?: boolean;
  loop?: boolean;
  panSensitivity?: number;
  nav?: boolean;
  dots?: boolean;
  counter?: boolean;
  thumb?: boolean;
  thumbWidth?: number;
  thumbHeight?: number;
  thumbPosition?: 'top' | 'left' | 'right' | 'bottom';
  disableThumb?: boolean;
  zoomOut?: number;
  slidingDirection?: 'horizontal' | 'vertical';
  loadingIcon?: string;
}

export interface GalleryItemComponent {
  data: any;
  index?: number;
}
