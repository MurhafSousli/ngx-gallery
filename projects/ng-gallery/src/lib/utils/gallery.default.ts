import {
  ImageSize,
  GalleryAction,
  ThumbnailsMode,
  LoadingStrategy,
  SlidingDirection,
  ThumbnailsPosition,
  DotsPosition,
  CounterPosition,
  ThumbnailsView
} from '../models/constants';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

/** Initial state */
export const defaultState: GalleryState = {
  action: GalleryAction.INITIALIZED,
  isPlaying: false,
  hasNext: false,
  hasPrev: false,
  currIndex: 0,
  items: []
};

export const defaultConfig: GalleryConfig = {
  nav: true,
  loop: true,
  dots: false,
  thumb: true,
  debug: false,
  dotsSize: 6,
  counter: true,
  autoPlay: false,
  thumbWidth: 120,
  thumbHeight: 90,
  disableThumb: false,
  slidingDisabled: false,
  thumbSlidingDisabled: false,
  mouseSlidingDisabled: false,
  thumbMouseSlidingDisabled: false,
  playerInterval: 3000,
  slidingDuration: 468,
  slidingEase: {
    x1: 0.42,
    y1: 0,
    x2: 0.58,
    y2: 1
  },
  thumbAutosize: false,
  itemAutosize: false,
  autoHeight: false,
  scrollBehavior: 'smooth',
  navScrollBehavior: 'smooth',
  resizeDebounceTime: 50,
  imageSize: ImageSize.Contain,
  thumbImageSize: ImageSize.Cover,
  thumbView: ThumbnailsView.Default,
  dotsPosition: DotsPosition.Bottom,
  counterPosition: CounterPosition.Top,
  thumbPosition: ThumbnailsPosition.Bottom,
  loadingStrategy: LoadingStrategy.Preload,
  slidingDirection: SlidingDirection.Horizontal,
  navIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/></svg>`,
  // navIcon: `<?xml version="1.0" encoding="UTF-8"?><svg width="512px" height="512px" enable-background="new 0 0 240.823 240.823" version="1.1" viewBox="0 0 240.823 240.823" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m183.19 111.82l-108.3-108.26c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.3-108.26c4.68-4.691 4.68-12.511-0.012-17.19z"></svg>`,
  loadingIcon: `<?xml version="1.0" encoding="UTF-8"?><svg stroke="#fff" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>`
};
