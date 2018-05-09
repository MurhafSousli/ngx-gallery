import { ImageItemComponent } from './image-item.component';
import { VideoItemComponent } from './video-item.component';
import { IframeItemComponent } from './iframe-item.component';
import { ThumbnailItemComponent } from './thumbnail-item.component';
import { GalleryItem } from '../models';

export class ImageItem implements GalleryItem {
  public component = ImageItemComponent;
  public thumbComponent = ThumbnailItemComponent;
  public data: any;

  constructor(src: string, thumb?: string) {
    this.data = {src, thumb};
  }
}

export class VideoItem implements GalleryItem {
  public component = VideoItemComponent;
  public thumbComponent = ThumbnailItemComponent;
  public data: any;

  constructor(src: string, thumb?: string, poster?: string) {
    this.data = {src, thumb, poster};
  }
}

export class IframeItem implements GalleryItem {
  public component = IframeItemComponent;
  public thumbComponent = ThumbnailItemComponent;
  public data: any;

  constructor(src: string, thumb?: string) {
    this.data = {src, thumb};
  }
}

export class YoutubeItem implements GalleryItem {
  public component = IframeItemComponent;
  public thumbComponent = ThumbnailItemComponent;
  public data: any;

  constructor(src: string, thumb?: string) {
    this.data = {
      src: `//youtube.com/embed/${src}?wmode=transparent`,
      thumb: thumb ? thumb : `//img.youtube.com/vi/${src}/default.jpg`
    };
  }
}

export {
  ImageItemComponent,
  VideoItemComponent,
  IframeItemComponent,
  ThumbnailItemComponent
};
