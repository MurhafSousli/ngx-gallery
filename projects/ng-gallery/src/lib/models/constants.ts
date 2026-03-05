export enum IMAGE_SIZE {
  Cover = 'cover',
  Contain = 'contain'
}

export enum LOADING_STRATEGY {
  Preload = 'preload',
  Lazy = 'lazy',
  Default = 'default'
}

export enum LOADING_ATTR {
  Eager= 'eager',
  Lazy = 'lazy'
}

export enum THUMB_POSITION {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export enum BulletsPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum CounterPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum ORIENTATION {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum ITEM_TYPE {
  Image = 'image',
  Video = 'video',
  Youtube = 'youtube',
  Vimeo = 'vimeo',
  Iframe = 'iframe'
}

export type GalleryItemType = ITEM_TYPE | string;
