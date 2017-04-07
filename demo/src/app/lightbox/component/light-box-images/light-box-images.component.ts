import { Component, Input, OnInit } from '@angular/core';
import { LightBoxService } from "../../service/light-box.service";

@Component({
  selector: 'light-box-images',
  templateUrl: './light-box-images.component.html',
  styleUrls: ['./light-box-images.component.scss']
})
export class LightBoxImagesComponent implements OnInit {

  @Input() state;
  @Input() thumbnailWidth = 90;
  @Input() thumbnailHeight = 60;
  @Input() horizontal = true;

  constructor(private lightbox: LightBoxService) {
  }

  ngOnInit() {
  }

  getRulerStyle() {
    let direction, x = 0, y = 0, left = 0, top = 0;
    if (this.horizontal) {
      direction = 'row';
      left = 50;
      x = this.state.currIndex * this.thumbnailWidth * ((this.horizontal) ? 1 : 0) + (this.thumbnailWidth / 2);
    } else {
      direction = 'column';
      top = 50;
      y = this.state.currIndex * this.thumbnailHeight * ((this.horizontal) ? 0 : 1) + (this.thumbnailHeight / 2);
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
    if (this.horizontal) {
      left = `calc(50% - ${this.thumbnailWidth / 2}px)`;
    } else {
      top = `calc(50% - ${this.thumbnailHeight / 2}px)`;
    }
    return {
      left: left,
      top: top,
      width: `${this.thumbnailWidth}px`,
      height: `${this.thumbnailHeight}px`
    };
  }

  getContainerStyle() {
    let direction, width = '100%', height = '100%';
    if (this.horizontal) {
      direction = 'row';
      height = `${this.thumbnailHeight}px`;
    } else {
      direction = 'column';
      width = `${this.thumbnailWidth}px`;
    }
    return {
      flexDirection: direction,
      width: width,
      height: height
    }
  }

}
