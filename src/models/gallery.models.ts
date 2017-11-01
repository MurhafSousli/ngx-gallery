export interface GalleryState {
  play?: boolean;
  items?: GalleryItem[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface GalleryItem {
  src?: string;
  thumbnail?: string;
  text?: string;
}
