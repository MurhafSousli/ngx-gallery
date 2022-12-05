import { GalleryAction } from './constants';
import { GalleryItemData } from '../components/templates/items.model';

export interface GalleryState {
  action?: GalleryAction;
  items?: GalleryItem[];
  behavior?: ScrollBehavior;
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  isPlaying?: boolean;
}

export interface GalleryItem {
  data?: GalleryItemData;
  type?: string;
}

export interface GalleryError {
  itemIndex: number;
  error: ErrorEvent;
}
