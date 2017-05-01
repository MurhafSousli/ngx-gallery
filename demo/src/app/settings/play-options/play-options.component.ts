import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {GalleryService, GalleryPlayConfig} from '../../gallery';
// import { GalleryService, GalleryPlayConfig } from 'ng-gallery';

@Component({
  selector: 'play-options',
  templateUrl: './play-options.component.html',
  styleUrls: ['./play-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayOptionsComponent {

  @Input() config = <GalleryPlayConfig>null;
  @Output() value = new EventEmitter<GalleryPlayConfig>();

  prevConfig = <GalleryPlayConfig>{};

  constructor(public gallery: GalleryService) {
  }

  enabledChanged(e) {
    if (e) {
      this.config = this.prevConfig;
      this.value.emit(this.config);
    } else {
      this.prevConfig = this.config;
      this.value.emit(false);
    }
  }
  speedChanged(e) {
    this.config.speed = e;
    this.value.emit(this.config);
  }

  autoplayChanged(e) {
    this.config.autoplay = e;
    this.value.emit(this.config);
  }
}
