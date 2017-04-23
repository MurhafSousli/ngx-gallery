import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryPlayConfig } from '../../service/gallery.config';
import { GalleryState } from '../../service/gallery.state';

@Component({
  selector: 'gallery-player',
  templateUrl: './gallery-player.component.html',
  styleUrls: ['./gallery-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryPlayerComponent implements OnInit {

  @Input() config: GalleryPlayConfig;
  @Input() state: GalleryState;

  constructor(public gallery: GalleryService) {
  }

  ngOnInit() {
    /** Start auto-play if enabled */
    if (this.config.autoplay) {
      this.gallery.play();
    }
  }

}
