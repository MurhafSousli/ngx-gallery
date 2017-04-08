import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LightBoxService } from "../service/light-box.service";

@Component({
  selector: 'light-box',
  templateUrl: './light-box.component.html',
  styleUrls: ['./light-box.component.scss']
})
export class LightBoxComponent implements OnInit, OnDestroy {

  constructor(private lightbox: LightBoxService) {
  }

  getContainerStyle() {
    let width = 'unset', height = 'unset', maxWidth = 'unset', maxHeight = 'unset', direction;
    if (this.lightbox.config.width) {
      width = '100%';
      maxWidth = this.lightbox.config.width + 'px';
    }
    if (this.lightbox.config.height) {
      height = '100%';
      maxHeight = this.lightbox.config.height + 'px';
    }

    if (this.lightbox.config.thumb.position === 'left'
      || this.lightbox.config.thumb.position === 'right') {
      direction = 'column'
    } else if (this.lightbox.config.thumb.position === 'top'
      || this.lightbox.config.thumb.position === 'bottom') {
      direction = 'row'
    }

    return {
      flexDirection: direction,
      maxHeight: maxHeight,
      maxWidth: maxWidth,
      height: height,
      width: width
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.lightbox.reset();
  }

}
