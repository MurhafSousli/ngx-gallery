import { GalleryItemType } from './constants';
import { GalleryItemData } from '../components/templates/items.model';

export interface GalleryItem {
  data?: GalleryItemData;
  type?: GalleryItemType;
}

export interface GalleryError {
  itemIndex: number;
  error: ErrorEvent;
}
