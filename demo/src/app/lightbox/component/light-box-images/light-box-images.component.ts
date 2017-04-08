import { Component, Input, OnInit } from '@angular/core';
import { LightBoxService } from "../../service/light-box.service";

@Component({
  selector: 'light-box-thumbnails',
  templateUrl: './light-box-images.component.html',
  styleUrls: ['./light-box-images.component.scss']
})
export class LightBoxImagesComponent implements OnInit {

  @Input() state;

  constructor(private lightbox: LightBoxService) {
  }

  ngOnInit() {
  }

  getRulerStyle() {
    let direction, x = 0, y = 0, left = 0, top = 0;

    if (this.lightbox.config.thumb.position === 'top'
      || this.lightbox.config.thumb.position === 'bottom') {

      direction = 'row';
      left = 50;
      x = this.state.currIndex * this.lightbox.config.thumb.width + (this.lightbox.config.thumb.width / 2);

    } else if (this.lightbox.config.thumb.position === 'left'
      || this.lightbox.config.thumb.position === 'right') {

      direction = 'column';
      top = 50;
      y = this.state.currIndex * this.lightbox.config.thumb.height + (this.lightbox.config.thumb.height / 2);
    }
    return {
      margin: `${-y}px 0 0 ${-x}px`,
      left: `${left}%`,
      top: `${top}%`,
      flexDirection: direction
    };
  }

  getCurrThumbStyle() {
    let left = 'unset', top = 'unset';
    if (this.lightbox.config.thumb.position === 'top'
      || this.lightbox.config.thumb.position === 'bottom') {
      left = `calc(50% - ${this.lightbox.config.thumb.width / 2}px)`;
    }
    else if (this.lightbox.config.thumb.position === 'left'
      || this.lightbox.config.thumb.position === 'right') {
      top = `calc(50% - ${this.lightbox.config.thumb.height / 2}px)`;
    }
    return {
      left: left,
      top: top,
      width: `${this.lightbox.config.thumb.width}px`,
      height: `${this.lightbox.config.thumb.height}px`
    };
  }

  getContainerStyle() {
    let direction, width = '100%', height = '100%', order = 0;
    if (this.lightbox.config.thumb.position === 'left'
      || this.lightbox.config.thumb.position === 'right') {

      direction = 'row';
      width = `${this.lightbox.config.thumb.width}px`;

    } else if (this.lightbox.config.thumb.position === 'top'
      || this.lightbox.config.thumb.position === 'bottom') {

      direction = 'column';
      height = `${this.lightbox.config.thumb.height}px`;
    }
    return {
      position: (this.lightbox.config.thumb.overlay) ? 'absolute' : 'relative',
      flexDirection: direction,
      order: this.lightbox.config.thumb.position  === 'bottom' || 'right' ? 3 : 0,
      width: width,
      height: height
    }
  }

}
