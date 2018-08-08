import { GalleryAction } from './constants';

export interface GalleryState {
  action?: GalleryAction;
  items?: GalleryItem[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  isPlaying?: boolean;
}

export interface GalleryItem {
  data?: any;
  type?: string;
}
