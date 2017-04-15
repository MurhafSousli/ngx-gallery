import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GalleryLoaderConfig} from '../../gallery/service/gallery.config';

@Component({
  selector: 'loader-options',
  templateUrl: './loader-options.component.html',
  styleUrls: ['./loader-options.component.scss']
})
export class LoaderOptionsComponent {

  @Input() config: GalleryLoaderConfig;
  @Output() value = new EventEmitter<GalleryLoaderConfig>();

  prevConfig: GalleryLoaderConfig = {};

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

}
