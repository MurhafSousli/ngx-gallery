import { GalleryAction, GalleryItemType } from './constants';

export interface GalleryState {
  action?: GalleryAction;
  items?: GalleryItem[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface GalleryItem {
  data?: any;
  type?: GalleryItemType;
}
