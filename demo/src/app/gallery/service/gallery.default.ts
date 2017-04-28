import {GalleryState} from './gallery.state';
import {GalleryConfig} from './gallery.config';

export const defaultState: GalleryState = {
  images: undefined,
  prevIndex: 0,
  currIndex: 0,
  hasNext: undefined,
  hasPrev: undefined,
  active: false
};

export const defaultConfig: GalleryConfig = {
  style: {
    background: '#121519',
    width: '900px',
    height: '500px'
  },
  animation: 'fade',
  loader: {
    width: '50px',
    height: '50px',
    position: 'center',
    icon: 'oval'
  },
  description: {
    position: 'bottom',
    overlay: false,
    text: true,
    counter: true,
    style: {
      color: 'red'
    }
  },
  bullets: false,
  player: {
    autoplay: false,
    speed: 3000
  },
  thumbnails: {
    width: 120,
    height: 90,
    position: 'left',
    space: 30
  }
};



