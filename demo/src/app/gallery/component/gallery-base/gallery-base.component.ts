import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GalleryService} from '../../service/gallery.service';
import {GalleryState} from '../../service/gallery.state';

@Component({
  selector: 'gallery-base',
  templateUrl: './gallery-base.component.html',
  styleUrls: ['./gallery-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryBaseComponent implements OnInit {

  @Input() state: GalleryState;

  constructor(public gallery: GalleryService) {
  }

  ngOnInit() {
    /** Start auto-play if enabled */
    if (this.gallery.config.player.autoplay && !this.state.play) {
      this.gallery.play();
    }
  }

  /** TODO: set in ngOnInit */
  getContainerStyle() {
    // shortcut for thumbnail config
    const thumbPos = this.gallery.config.thumbnails.position;

    // set container size
    let height = 'unset', maxWidth = 'unset';
    if (this.gallery.config.width) {
      maxWidth = this.gallery.config.width;
    }
    if (this.gallery.config.height) {
      height = this.gallery.config.height;
    }

    return {
      flexDirection: (thumbPos === 'left' || thumbPos === 'right') ? 'row' : 'column',
      maxWidth: maxWidth,
      height: height
    };
  }

}
