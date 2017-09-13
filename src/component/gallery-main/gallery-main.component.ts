import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GalleryState } from '../../service/gallery.state';
import { GalleryConfig } from '../../config';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'gallery-main',
  templateUrl: './gallery-main.component.html',
  styleUrls: ['./gallery-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryMainComponent implements OnInit {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  loading: any;
  thumbDirection: any;

  constructor(public gallery: GalleryService) {
  }

  ngOnInit() {
    // shortcut for thumbnail config
    const thumbPos = this.config.thumbnails ? this.config.thumbnails.position : 0;
    this.thumbDirection = (thumbPos === 'left' || thumbPos === 'right') ? 'row' : 'column';
  }

}
