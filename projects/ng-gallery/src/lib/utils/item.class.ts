import { GalleryItemType, ITEM_TYPE } from '../models/constants';
import { IframeItemData, ImageItemData, VideoItemData, VimeoItemData, YoutubeItemData } from '../templates/items.model';

interface GalleryItem {
  type: GalleryItemType;
  data: any;
}

export class ImageItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: ImageItemData;

  constructor(data: ImageItemData) {
    this.data = data;
    this.type = ITEM_TYPE.Image;
  }
}

export class VideoItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: VideoItemData;

  constructor(data: VideoItemData) {
    this.data = data;
    this.type = ITEM_TYPE.Video;
  }
}

export class IframeItem implements GalleryItem {
  readonly type: GalleryItemType;
  readonly data: IframeItemData;

  constructor(data: IframeItemData) {
    this.data = data;
    this.type = ITEM_TYPE.Iframe;
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
        thumb: data.thumb ?? `//img.youtube.com/vi/${ data.src }/default.jpg`
      }
    };
    this.type = ITEM_TYPE.Youtube;
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
        thumb: data.thumb ?? this.getVimeoThumb(data.src as string)
      }
    };


    this.type = ITEM_TYPE.Vimeo;
  }

  private getVimeoThumb(videoId: string): string {
    //Vimeo has no API for getting a thumbnail, but this project can do it: https://github.com/ThatGuySam/vumbnail
    return `//vumbnail.com/${ videoId }.jpg`
  }
}
