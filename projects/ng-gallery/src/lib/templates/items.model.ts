type GalleryItemModel = {
  // type?: GalleryItemType;
  src?: string | { url: string, type: string }[];
  thumb?: string;
  args?: any;
};

export type ImageItemData = GalleryItemModel & {
  alt?: string;
};

export type IframeItemData = GalleryItemModel & {
  params?: any;
};

export type YoutubeItemData = IframeItemData & {
  autoplay?: boolean;
};

export type VimeoItemData = IframeItemData & {
  autoplay?: boolean;
};

export type VideoItemData = GalleryItemModel & {
  poster?: string;
  loop?: boolean;
  // The only option for boolean video attributes is 'true', because false will still be evaluated to true in attributes binding
  mute?: true;
  disablePictureInPicture?: true;
  controls?: boolean;
  autoplay?: boolean;
  preload?: 'none' | 'metadata' | 'auto' | '';
  controlsList?: 'nodownload' | 'nofullscreen' | 'noremoteplayback';
  disableRemotePlayback?: boolean;
};

export type GalleryItemData = GalleryItemModel;
