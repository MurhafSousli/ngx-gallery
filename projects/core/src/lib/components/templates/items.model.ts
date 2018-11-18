import { GalleryItem } from '../../models/gallery.model';
import { GalleryItemType } from '../../models/constants';

export class ImageItem implements GalleryItem {
  readonly type: string;
  readonly data: any;

  constructor(data: any) {
    this.data = data;
    this.type = GalleryItemType.Image;
  }
}

export class VideoItem implements GalleryItem {
  readonly type: string;
  readonly data: any;

  constructor(data: any) {
    this.data = data;
    this.type = GalleryItemType.Video;
  }
}

export class IframeItem implements GalleryItem {
  readonly type: string;
  readonly data: any;

  constructor(data: any) {
    this.data = data;
    this.type = GalleryItemType.Iframe;
  }
}

export class YoutubeItem implements GalleryItem {
  readonly type: string;
  readonly data: any;

  constructor(data: any) {
    this.data = {
      src: `//youtube.com/embed/${data.src}?wmode=transparent`,
      thumb: data.thumb ? data.thumb : `//img.youtube.com/vi/${data.src}/default.jpg`
    };
    this.type = GalleryItemType.Youtube;
  }
}
