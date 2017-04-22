import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GalleryState} from '../../service/gallery.state';
import {GalleryConfig} from '../../service/gallery.config';
import {GalleryService} from '../../service/gallery.service';

@Component({
  selector: 'gallery-main',
  templateUrl: './gallery-main.component.html',
  styleUrls: ['./gallery-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryMainComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  loading;
  styles;

  constructor(public gallery: GalleryService) {
  }

  ngOnInit() {
    this.styles = this.getContainerStyle();
  }

  getContainerStyle() {
    // shortcut for thumbnail config
    const thumbPos = this.config.thumbnails.position;

    return {
      flexDirection: (thumbPos === 'left' || thumbPos === 'right') ? 'row' : 'column',
      width: this.config.width,
      height: this.config.height
    };
  }

}
