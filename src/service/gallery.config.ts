export interface GalleryConfig {
  animation?: string;
  gestures?: boolean;
  style?;
  description?: GalleryDescConfig;
  thumbnails?: GalleryThumbConfig;
  loader?: GalleryLoaderConfig;
  navigation?: GalleryNavConfig;
  bullets?: GalleryBulletConfig;
  player?: GalleryPlayConfig;
}

export interface GalleryBulletConfig {
  style?;
  position?: string;
}

export interface GalleryPlayConfig {
  progress?: boolean;
  autoplay?: boolean;
  speed?: number;
}

/** TODO: Add options for navigation */
export interface GalleryNavConfig {
  nextIcon?: string;
  prevIcon?: string;
  iconWidth?: string;
  iconHeight?: string;
  position?: string;
}

export interface GalleryDescConfig {
  width?: string;
  height?: string;
  position?: string;
  overlay?: boolean;
  text?: boolean;
  counter?: boolean;
  style?;
}

export interface GalleryThumbConfig {
  width?: number;
  height?: number;
  position?: string;
  space?: number;
}

export interface GalleryLoaderConfig {
  width?: string;
  height?: string;
  position?: string;
  icon?: string;
}
