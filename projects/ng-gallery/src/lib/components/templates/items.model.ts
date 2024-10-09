import { GalleryItem } from '../../models/gallery.model';
import { GalleryItemType, GalleryItemTypes } from '../../models/constants';

export class ImageItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: ImageItemData;

  constructor(data: ImageItemData) {
    this.data = data;
    this.type = GalleryItemTypes.Image;
  }
}

export class VideoItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: VideoItemData;

  constructor(data: VideoItemData) {
    this.data = data;
    this.type = GalleryItemTypes.Video;
  }
}

export class IframeItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: IframeItemData;

  constructor(data: IframeItemData) {
    this.data = data;
    this.type = GalleryItemTypes.Iframe;
  }
}

export class YoutubeItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: YoutubeItemData;

  constructor(data: YoutubeItemData) {
    this.data = {
      ...data,
      ...{
        src: `https://youtube.com/embed/${ data.src }`,
        thumb: data.thumb ? data.thumb : `//img.youtube.com/vi/${ data.src }/default.jpg`
      }
    };
    this.type = GalleryItemTypes.Youtube;
  }
}

export class VimeoItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: VimeoItemData;

  constructor(data: VimeoItemData) {
    this.data = {
      ...data,
      ...{
        src: `https://player.vimeo.com/video/${ data.src }`,
        thumb: data.thumb ? data.thumb : this.getVimeoThumb(data.src as string)
      }
    };


    this.type = GalleryItemTypes.Vimeo;
  }

  private getVimeoThumb(videoId: string): string {
    //Vimeo has no API for getting a thumbnail, but this project can do it: https://github.com/ThatGuySam/vumbnail
    return `//vumbnail.com/${ videoId }.jpg`
  }
}

type GalleryItemModel = {
  type?: GalleryItemType;
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

export type GalleryItemData = ImageItemData | VideoItemData | IframeItemData | YoutubeItemData | VimeoItemData;

export type ItemState = 'success' | 'loading' | 'failed';
