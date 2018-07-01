import { GalleryItem, GalleryItemType } from '../../models';

export class ImageItem implements GalleryItem {
  readonly type = GalleryItemType.Image;
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }
}

export class VideoItem implements GalleryItem {
  readonly type = GalleryItemType.Video;
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }
}

export class IframeItem implements GalleryItem {
  readonly type = GalleryItemType.Iframe;
  readonly data: any;

  constructor(data: any) {
    this.data = data;
  }
}

export class YoutubeItem implements GalleryItem {
  readonly type = GalleryItemType.Youtube;
  readonly data: any;

  constructor(data: any) {
    this.data = {
      src: `//youtube.com/embed/${data.src}?wmode=transparent`,
      thumb: data.thumb ? data.thumb : `//img.youtube.com/vi/${data.src}/default.jpg`
    };
  }
}
