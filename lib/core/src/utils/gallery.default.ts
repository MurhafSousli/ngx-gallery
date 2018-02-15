import { GalleryAction, GalleryConfig, GalleryState } from '../models';

/** Initial state */
export const defaultState: GalleryState = {
  action: GalleryAction.INITIALIZED,
  currIndex: 0,
  hasNext: false,
  hasPrev: false,
  items: []
};

export const defaultConfig: GalleryConfig = {
  gestures: true,
  panSensitivity: 25,
  counter: true,
  nav: true,
  dots: false,
  thumb: true,
  thumbWidth: 120,
  thumbHeight: 90,
  thumbPosition: 'bottom',
  disableThumb: false,
  slidingDirection: 'horizontal',
  zoomOut: 0
};
