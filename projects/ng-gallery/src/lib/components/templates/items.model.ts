import { GalleryItem } from '../../models/gallery.model';
import { GalleryItemType } from '../../models/constants';

export class ImageItem implements GalleryItem {
  readonly type: string;
  readonly data: ImageItemOptions;

  constructor(data: ImageItemOptions) {
    this.data = data;
    this.type = GalleryItemType.Image;
  }
}

export class VideoItem implements GalleryItem {
  readonly type: string;
  readonly data: VideoItemOptions;

  constructor(data: VideoItemOptions) {
    this.data = data;
    this.type = GalleryItemType.Video;
  }
}

export class IframeItem implements GalleryItem {
  readonly type: string;
  readonly data: IframeItemOptions;

  constructor(data: IframeItemOptions) {
    this.data = data;
    this.type = GalleryItemType.Iframe;
  }
}

export class YoutubeItem implements GalleryItem {
  readonly type: string;
  readonly data: YoutubeItemOptions;

  constructor(data: YoutubeItemOptions) {
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

type GalleryItemOptions = {
  src?: string;
  thumb?: string;
};

export type ImageItemOptions = GalleryItemOptions;

export type IframeItemOptions = GalleryItemOptions & {
  params?: any;
};

export type YoutubeItemOptions = IframeItemOptions & {
  autoplay?: boolean;
};

export type VideoItemOptions = {
  src?: string | { url: string, type: string }[];
  thumb?: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
};
