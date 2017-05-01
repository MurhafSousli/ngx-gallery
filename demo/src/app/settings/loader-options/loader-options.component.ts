import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
// import {GalleryLoaderConfig} from '../../gallery';
import { GalleryLoaderConfig } from 'ng-gallery';

@Component({
  selector: 'loader-options',
  templateUrl: './loader-options.component.html',
  styleUrls: ['./loader-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderOptionsComponent {

  @Input() config = <GalleryLoaderConfig>null;
  @Output() value = new EventEmitter<GalleryLoaderConfig>();

  prevConfig = <GalleryLoaderConfig>{};

  positionOptions = [
    'topLeft',
    'topRight',
    'bottomRight',
    'bottomLeft',
    'center'
  ];

  iconOptions = [
    'puff',
    'spinning-circles',
    'three-dots',
    'oval',
    'ball-triangle',
    'bars',
    'tail-spin'
  ];

  constructor() {

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

  heightChanged(e) {
    this.config.height = e;
    this.value.emit(this.config);
  }

  widthChanged(e) {
    this.config.width = e;
    this.value.emit(this.config);
  }

  positionChanged(e) {
    this.config.position = e;
    this.value.emit(this.config);
  }

  iconChanged(e) {
    this.config.icon = e;
    this.value.emit(this.config);
  }
}
