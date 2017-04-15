import {GalleryState} from './gallery.state';
import {GalleryConfig} from './gallery.config';

export const defaultState: GalleryState = {
  images: undefined,
  currIndex: undefined,
  hasNext: undefined,
  hasPrev: undefined,
  active: false
};

export const defaultConfig: GalleryConfig = {
  animate: 'none',
  width: '900px',
  height: '500px',
  loader: {
    width: '50px',
    height: '50px',
    position: 'center',
    icon: 'oval'
  },
  description: {
    position: 'bottom',
    overlay: true,
    text: true,
    counter: true
  },
  thumbnails: {
    width: 120,
    height: 90,
    position: 'top'
  }
};



