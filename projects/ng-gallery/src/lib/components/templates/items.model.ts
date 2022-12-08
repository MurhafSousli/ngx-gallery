import { GalleryItem } from '../../models/gallery.model';
import { GalleryItemType } from '../../models/constants';

export class ImageItem implements GalleryItem {
  readonly type: string;
  readonly data: ImageItemData;

  constructor(data: ImageItemData) {
    this.data = data;
    this.type = GalleryItemType.Image;
  }
}

export class VideoItem implements GalleryItem {
  readonly type: string;
  readonly data: VideoItemData;

  constructor(data: VideoItemData) {
    this.data = data;
    this.type = GalleryItemType.Video;
  }
}

export class IframeItem implements GalleryItem {
  readonly type: string;
  readonly data: IframeItemData;

  constructor(data: IframeItemData) {
    this.data = data;
    this.type = GalleryItemType.Iframe;
  }
}

export class YoutubeItem implements GalleryItem {
  readonly type: string;
  readonly data: YoutubeItemData;

  constructor(data: YoutubeItemData) {
    this.data = {
      ...data,
      ...{
        src: `https://youtube.com/embed/${ data.src }`,
        thumb: data.thumb ? data.thumb : `//img.youtube.com/vi/${ data.src }/default.jpg`
      }
    };
    this.type = GalleryItemType.Youtube;
  }
}

type GalleryItemModel = {
  type?: string;
  src?: string;
  thumb?: string;
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

export type VideoItemData = GalleryItemModel & {
  src?: string | { url: string, type: string }[];
  thumb?: string;
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

export type GalleryItemData = ImageItemData | VideoItemData | IframeItemData | YoutubeItemData;
