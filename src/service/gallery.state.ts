export interface GalleryState {
  active: boolean;
  images?: GalleryImage[];
  prevIndex?: number;
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface GalleryImage {
  src: string;
  thumbnail?: string;
  text?: string;
}
