import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GalleryPlayConfig} from "../../gallery/service/gallery.config";
import {GalleryService} from "../../gallery/service/gallery.service";

@Component({
  selector: 'play-options',
  templateUrl: './play-options.component.html',
  styleUrls: ['./play-options.component.scss']
})
export class PlayOptionsComponent{


  @Input() config: GalleryPlayConfig;
  @Output() value = new EventEmitter<GalleryPlayConfig>();

  prevConfig: GalleryPlayConfig = {};

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
}
