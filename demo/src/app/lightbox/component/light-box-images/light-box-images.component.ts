import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { LightBoxService } from '../../service/light-box.service';
import { LightBoxConfig, LightBoxState } from '../../service/light-box.interface';

@Component({
  selector: 'light-box-thumbnails',
  templateUrl: './light-box-images.component.html',
  styleUrls: ['./light-box-images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightBoxImagesComponent implements OnChanges {

  config;
  rulerStyle;
  currThumbStyle;
  containerStyle;

  @Input() state: LightBoxState;

  constructor(private lightbox: LightBoxService) {
    this.config = lightbox.config.thumb;
  }

  ngOnChanges() {
    // ruler variables
    let rulerX = 0, rulerY = 0, rulerCenterX = 0, rulerCenterY = 0, rulerDirection = 'row';

    switch (this.config.position) {
      case 'top':
        // ruler top position
        rulerX = this.state.currIndex * this.config.width + (this.config.width / 2);
        rulerCenterX = 50;
        // current thumbnail position
        this.setCurrThumbStyle(`calc(50% - ${this.config.width / 2}px)`, 'unset');
        // container position
        this.setContainerStyle('100%', `${this.config.height}px`, 'column', 0);
        break;
      case 'bottom':
        // ruler bottom position
        rulerX = this.state.currIndex * this.config.width + (this.config.width / 2);
        rulerCenterX = 50;
        // current thumbnail position
        this.setCurrThumbStyle(`calc(50% - ${this.config.width / 2}px)`, 'unset');
        // container position
        this.setContainerStyle('100%', `${this.config.height}px`, 'column', 3);
        break;
      case 'left':
        // ruler position
        rulerY = this.state.currIndex * this.config.height + (this.config.height / 2);
        rulerCenterY = 50;
        rulerDirection = 'column';
        // current thumbnail position
        this.setCurrThumbStyle('unset', `calc(50% - ${this.config.height / 2}px)`);
        // container position
        this.setContainerStyle(`${this.config.width}px`, '100%', 'row', 0);
        break;
      case 'right':
        // ruler position
        rulerY = this.state.currIndex * this.config.height + (this.config.height / 2);
        rulerCenterY = 50;
        rulerDirection = 'column';
        // current thumbnail position
        this.setCurrThumbStyle('unset', `calc(50% - ${this.config.height / 2}px)`);
        // container position
        this.setContainerStyle(`${this.config.width}px`, '100%', 'row', 3);
        break;
      default:
        break;
    }

    this.setRulerStyle(rulerX, rulerY, rulerCenterX, rulerCenterY, rulerDirection);

  }

  setRulerStyle(x, y, left, top, direction) {
    this.rulerStyle = {
      margin: `${-y}px 0 0 ${-x}px`,
      left: `${left}%`,
      top: `${top}%`,
      flexDirection: direction
    };
  }

  setCurrThumbStyle(left, top) {
    this.currThumbStyle = {
      left: left,
      top: top,
      width: `${this.config.width}px`,
      height: `${this.config.height}px`
    };
  }

  setContainerStyle(width, height, direction, order) {

    this.containerStyle = {
      position: (this.config.overlay) ? 'absolute' : 'relative',
      flexDirection: direction,
      order: order,
      width: width,
      height: height
    }
  }

}
