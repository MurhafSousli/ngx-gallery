export interface GalleryState {
  action?: GalleryAction;
  play?: boolean;
  items?: GalleryItem[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  loading?: boolean;
}

export interface GalleryItem {
  src?: string;
  thumbnail?: string;
  text?: string;
}

export enum GalleryAction {
  INIT = 'init',
  LOAD = 'load',
  NEXT = 'next',
  PREV = 'prev',
  OTHER = 'other',
  PLAYING = 'playing',
  STOPPED = 'stopped',
  OPENED = 'opened',
  CLOSED = 'closed',
  LOADING_START = 'loading_start',
  LOADING_END = 'loading_end',
  BULLET_CLICK = 'bullet_click',
  THUMB_CLICK = 'thumb_click'
}

