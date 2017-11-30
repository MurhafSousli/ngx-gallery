export interface GalleryConfig {
  gestures?: boolean;
  className?: string;
  imageSize?: string;
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
  className?: string;
  position?: string;
  style?: any;
}

export interface GalleryDescConfig {
  width?: string;
  height?: string;
  position?: string;
  overlay?: boolean;
  text?: boolean;
  counter?: boolean;
  className?: string;
  style?: any;
}

export interface GalleryLoaderConfig {
  className?: string;
  icon?: string;
}

export interface GalleryNavConfig {
  nextClass?: string;
  prevClass?: string;
}

export interface GalleryPlayConfig {
  className?: string;
  position?: string;
  progress?: boolean;
  thickness?: number;
  color?: string;
  autoplay?: boolean;
  interval?: number;
}

export interface GalleryThumbConfig {
  className?: string;
  width?: number;
  height?: number;
  position?: string;
}

export interface GalleryLightboxConfig {
  backdropClass?: string;
  panelClass?: string;
  hasBackdrop?: boolean;
}
