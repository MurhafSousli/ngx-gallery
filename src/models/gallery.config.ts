export interface GalleryConfig {
  gestures?: boolean;
  style?: any;
  description?: GalleryDescConfig;
  thumbnails?: GalleryThumbConfig;
  loader?: GalleryLoaderConfig;
  navigation?: GalleryNavConfig;
  bullets?: GalleryBulletConfig;
  player?: GalleryPlayConfig;
  lightbox?: GalleryLightboxConfig;
}

export interface GalleryBulletConfig {
  style?: any;
  position?: string;
}

export interface GalleryDescConfig {
  width?: string;
  height?: string;
  position?: string;
  overlay?: boolean;
  text?: boolean;
  counter?: boolean;
  style?: any;
}

export interface GalleryLoaderConfig {
  width?: string;
  height?: string;
  icon?: string;
}

export interface GalleryNavConfig {
  nextIcon?: string;
  prevIcon?: string;
  iconWidth?: string;
  iconHeight?: string;
  position?: string;
}

export interface GalleryPlayConfig {
  progress?: boolean;
  autoplay?: boolean;
  interval?: number;
}

export interface GalleryThumbConfig {
  width?: number;
  height?: number;
  position?: string;
  space?: number;
}

export interface GalleryLightboxConfig {
  backdropClass?: string;
  panelClass?: string;
  hasBackdrop?: boolean;
  positionStrategy?: any;
  scrollStrategy?: any;
}
