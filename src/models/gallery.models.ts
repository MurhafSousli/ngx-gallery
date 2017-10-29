export interface GalleryState {
  play?: boolean;
  items?: GalleryItem[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface GalleryItem {
  src?: string;
  srcset?: any;
  thumbnail?: string;
  text?: string;
}
