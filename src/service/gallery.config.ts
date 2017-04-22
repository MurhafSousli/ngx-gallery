/**
 * Gallery config
 * width & height made as strings to allow percentage values (%)
 * overlay: true to launch it in a gallery modal, false to normal use
 */
export interface GalleryConfig {
  animation?: string;
  width?: string;
  height?: string;
  style?;
  description?: GalleryDescriptionConfig;
  thumbnails?: GalleryThumbConfig;
  loader?: GalleryLoaderConfig;
  navigation?: GalleryNavConfig;
  bullets?: GalleryBulletConfig;
  player?: GalleryPlayConfig;
}

export interface GalleryBulletConfig {
  width?: number;
  height?: number;
  position?: string;
}

export interface GalleryPlayConfig {
  progress?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export interface GalleryNavConfig {
  nextIcon?: string;
  prevIcon?: string;
  iconWidth?: string;
  iconHeight?: string;
  position?: string;
}

/**
 * Gallery animation
 * duration: numbers in (ms)
 * in: in animation class name
 * out: out animation class name
 * TODO: use angular animation
 */
// export interface GalleryAnimation {
//   in?: string | string[];
//   out?: string | string[];
//   duration?: number;
// }

/**
 * Gallery text config
 * width & height made as strings to allow percentage values (%)
 * position: top, bottom
 * overlay: true to show the text over image, false to put text beside the text
 */
export interface GalleryDescriptionConfig {
  width?: string;
  height?: string;
  position?: string;
  overlay?: boolean;
  text?: boolean;
  counter?: boolean;
}

/**
 * Gallery thumbnails config
 * width & height allow numbers only (for pixels)
 * position: top, left, right, bottom
 */
export interface GalleryThumbConfig {
  width?: number;
  height?: number;
  position?: string;
}

/**
 * Gallery loader config:
 * width & height made as strings to allow percentage values (%)
 * position: topLeft, topRight, bottomLeft, bottomRight
 * loader: can use existing loaders using their class names, or it can take Html for custom loaders
 */
export interface GalleryLoaderConfig {
  width?: string;
  height?: string;
  position?: string;
  icon?: string;
}
