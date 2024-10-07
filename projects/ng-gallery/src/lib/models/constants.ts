export enum ImageSize {
  Cover = 'cover',
  Contain = 'contain'
}

export enum LoadingStrategy {
  Preload = 'preload',
  Lazy = 'lazy',
  Default = 'default'
}

export enum LoadingAttr {
  Eager= 'eager',
  Lazy = 'lazy'
}

export enum ThumbnailsPosition {
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

export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum GalleryItemTypes {
  Image = 'image',
  Video = 'video',
  Youtube = 'youtube',
  Vimeo = 'vimeo',
  Iframe = 'iframe'
}

export type GalleryItemType = GalleryItemTypes | string;
