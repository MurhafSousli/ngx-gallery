import { GalleryItem } from '@ngx-gallery/core';
import { ImageItemProComponent } from './image-item-pro.component';
import { ThumbnailItemProComponent } from './thumb-item-pro.component';

export class ImageProItem implements GalleryItem {
  public component = ImageItemProComponent;
  public thumbComponent = ThumbnailItemProComponent;
  public data: any;

  constructor(src: string, thumb?: string, moreData?: any) {
    this.data = {src, thumb, ...moreData};
  }
}

