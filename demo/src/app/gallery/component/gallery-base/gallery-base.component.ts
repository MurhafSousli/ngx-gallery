import {Component, Input} from '@angular/core';
import {GalleryService} from '../../service/gallery.service';
import {GalleryConfig} from '../../service/gallery.config';

@Component({
  selector: 'gallery-base',
  templateUrl: './gallery-base.component.html',
  styleUrls: ['./gallery-base.component.scss']
})
export class GalleryBaseComponent {

  @Input() state: GalleryConfig;

  constructor(private gallery: GalleryService) {
  }

  getContainerStyle() {
    // just a shortcut for thumbnail position
    const thumbPos = this.gallery.config.thumbnails.position;

    // Container Style
    let width = 'unset', height = 'unset', maxWidth = 'unset', maxHeight = 'unset';
    if (this.gallery.config.width) {
      // width = '100%';
      width = this.gallery.config.width;
      maxWidth = this.gallery.config.width;
    }
    if (this.gallery.config.height) {
      // height = '100%';
      height = this.gallery.config.height;
      maxHeight = this.gallery.config.height;
    }

    return {
      flexDirection: (thumbPos === 'left' || thumbPos === 'right') ? 'row' : 'column',
      maxHeight: maxHeight,
      maxWidth: maxWidth,
      height: height,
      width: width
    };
  }

}
