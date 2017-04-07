import { Component, Input, OnInit } from '@angular/core';
import { LightBoxService } from "../../service/light-box.service";

@Component({
  selector: 'light-box-images',
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
    if (this.lightbox.config.thumb.position) {
      direction = 'row';
      left = 50;
      x = this.state.currIndex * this.lightbox.config.thumb.width + (this.lightbox.config.thumb.width / 2);
    } else {
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
    if (this.lightbox.config.thumb.position) {
      left = `calc(50% - ${this.lightbox.config.thumb.width / 2}px)`;
    } else {
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
    let direction, width = '100%', height = '100%';
    if (this.lightbox.config.thumb.position) {
      direction = 'row';
      height = `${this.lightbox.config.thumb.height}px`;
    } else {
      direction = 'column';
      width = `${this.lightbox.config.thumb.width}px`;
    }
    return {
      flexDirection: direction,
      width: width,
      height: height
    }
  }

}
