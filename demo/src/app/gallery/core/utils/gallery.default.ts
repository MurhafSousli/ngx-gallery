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
  zoomOut: 0,
  loadingSvg: `<?xml version="1.0" encoding="UTF-8"?>
<svg stroke="#fff" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
<g fill="none" fill-rule="evenodd" stroke-width="2">
<circle cx="22" cy="22" r="1">
<animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/>
<animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/>
</circle>
<circle cx="22" cy="22" r="1">
<animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/>
<animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/>
</circle>
</g>
</svg>`
};
