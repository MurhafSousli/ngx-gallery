import { GalleryConfig } from '../models';

export const defaultConfig: GalleryConfig = {
  gestures: true,
  style: {
    background: '#121519'
  },
  navigation: {

  },
  loader: {
    width: '50px',
    height: '50px',
    icon: 'oval'
  },
  description: {
    position: 'bottom',
    overlay: false,
    text: true,
    counter: true
  },
  player: {
    autoplay: false,
    interval: 3000,
    progress: false
  },
  thumbnails: {
    width: 120,
    height: 90,
    position: 'top',
    space: 30
  },
  overlay: {
    backdropClass: 'g-backdrop',
    panelClass: 'g-overlay',
    hasBackdrop: true,
    positionStrategy: 'GlobalPositionStrategy',
    scrollStrategy: 'BlockScrollStrategy'
  }
};



