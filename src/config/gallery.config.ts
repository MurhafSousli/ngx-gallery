import { GalleryDescConfig } from './gallery-desc.config';
import { GalleryNavConfig } from './gallery-nav.config';
import { GalleryThumbConfig } from './gallery-thumb.config';
import { GalleryPlayConfig } from './gallery-play.config';
import { GalleryBulletConfig } from './gallery-bullet.config';
import { GalleryLoaderConfig } from './gallery-loader.config';

export interface GalleryConfig {
  animation?: string;
  gestures?: boolean;
  style?: any;
  description?: GalleryDescConfig;
  thumbnails?: GalleryThumbConfig;
  loader?: GalleryLoaderConfig;
  navigation?: GalleryNavConfig;
  bullets?: GalleryBulletConfig;
  player?: GalleryPlayConfig;
}
