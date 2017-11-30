import { GalleryConfig } from '../models';

export const defaultConfig: GalleryConfig = {
  gestures: true,
  style: {
    width: '600px',
    height: '460px',
    background: '#121519'
  },
  navigation: {},
  loader: {
    icon: 'data:image/svg+xml;charset=utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'44\' height=\'44\' stroke=\'%23fff\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\' stroke-width=\'2\'%3E%3Ccircle cx=\'22\' cy=\'22\' r=\'1\'%3E%3Canimate attributeName=\'r\' begin=\'0s\' dur=\'1.8s\' values=\'1; 20\' calcMode=\'spline\' keyTimes=\'0; 1\' keySplines=\'0.165, 0.84, 0.44, 1\' repeatCount=\'indefinite\'/%3E%3Canimate attributeName=\'stroke-opacity\' begin=\'0s\' dur=\'1.8s\' values=\'1; 0\' calcMode=\'spline\' keyTimes=\'0; 1\' keySplines=\'0.3, 0.61, 0.355, 1\' repeatCount=\'indefinite\'/%3E%3C/circle%3E%3Ccircle cx=\'22\' cy=\'22\' r=\'1\'%3E%3Canimate attributeName=\'r\' begin=\'-0.9s\' dur=\'1.8s\' values=\'1; 20\' calcMode=\'spline\' keyTimes=\'0; 1\' keySplines=\'0.165, 0.84, 0.44, 1\' repeatCount=\'indefinite\'/%3E%3Canimate attributeName=\'stroke-opacity\' begin=\'-0.9s\' dur=\'1.8s\' values=\'1; 0\' calcMode=\'spline\' keyTimes=\'0; 1\' keySplines=\'0.3, 0.61, 0.355, 1\' repeatCount=\'indefinite\'/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E'
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
    progress: false,
    position: 'bottom'
  },
  thumbnails: {
    width: 120,
    height: 90,
    position: 'top'
  },
  lightbox: {
    backdropClass: 'g-backdrop',
    panelClass: 'g-overlay',
    hasBackdrop: true
  }
};



