import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GalleryBulletConfig} from "../../gallery/service/gallery.config";

@Component({
  selector: 'bullets-options',
  templateUrl: './bullets-options.component.html',
  styleUrls: ['./bullets-options.component.scss']
})
export class BulletsOptionsComponent {


  @Input() config: GalleryBulletConfig;
  @Output() value = new EventEmitter<GalleryBulletConfig>();

  prevConfig: GalleryBulletConfig = {};

  positionOptions = [
    'left',
    'top',
    'right',
    'bottom'
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
