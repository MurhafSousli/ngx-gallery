import { Component, EventEmitter, Input, Output } from '@angular/core';
import {GalleryNavConfig} from '../../gallery';
// import { GalleryNavConfig } from 'ng-gallery';

@Component({
  selector: 'nav-options',
  templateUrl: './nav-options.component.html',
  styleUrls: ['./nav-options.component.scss']
})
export class NavOptionsComponent {

  @Input() config = <GalleryNavConfig>null;
  @Output() value = new EventEmitter<GalleryNavConfig>();

  enabledChanged(e) {
    this.config = e;
    this.value.emit(this.config);
  }

}
