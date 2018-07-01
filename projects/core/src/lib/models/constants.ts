
export enum GalleryAction {
  INITIALIZED = 'initialized',
  ITEMS_CHANGED = 'itemsChanged',
  INDEX_CHANGED = 'indexChanged'
}

export enum LoadingStrategy {
  Preload = 'preload',
  Lazy = 'lazy',
  Default = 'default'
}

export enum ThumbnailPosition {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
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
