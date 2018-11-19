export enum GalleryAction {
  INITIALIZED = 'initialized',
  ITEMS_CHANGED = 'itemsChanged',
  INDEX_CHANGED = 'indexChanged',
  PLAY = 'play',
  STOP = 'stop'
}

export enum ImageSize {
  Cover = 'cover',
  Contain = 'contain'
}

export enum LoadingStrategy {
  Preload = 'preload',
  Lazy = 'lazy',
  Default = 'default'
}

export enum ThumbnailsPosition {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export enum ImageLoaderMode {
  Determinate= 'determinate',
  Indeterminate= 'indeterminate'
}

export enum DotsPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum CounterPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum ThumbnailsMode {
  Free = 'free',
  Strict = 'strict'
}

export enum SlidingDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export enum GalleryItemType {
  Image = 'image',
  Video = 'video',
  Youtube = 'youtube',
  Iframe = 'iframe'
}
