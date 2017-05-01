import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// import {GalleryThumbConfig} from '../../gallery';
import { GalleryThumbConfig } from 'ng-gallery';

@Component({
  selector: 'thumb-options',
  templateUrl: './thumb-options.component.html',
  styleUrls: ['./thumb-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbOptionsComponent {

  @Input() config = <GalleryThumbConfig>null;
  @Output() value = new EventEmitter<GalleryThumbConfig>();

  prevConfig = <GalleryThumbConfig>{};

  positionOptions = [
    'top',
    'bottom'
  ];

  enabledChanged(e) {
    if (e) {
      this.config = this.prevConfig;
      this.value.emit(this.config);
    } else {
      this.prevConfig = this.config;
      this.value.emit(false);
    }
  }

  spaceChanged(e) {
    this.config.space = e;
    this.value.emit(this.config);
  }

  positionChanged(e) {
    this.config.position = e;
    this.value.emit(this.config);
  }

  widthChanged(e) {
    this.config.width = e;
    this.value.emit(this.config);
  }

  heightChanged(e) {
    this.config.height = e;
    this.value.emit(this.config);
  }

}
