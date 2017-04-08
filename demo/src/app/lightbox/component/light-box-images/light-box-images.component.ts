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
    let direction, ruleX = 0, ruleY = 0;
    switch (this.config.position) {
      case 'top':
        ruleX = this.state.currIndex * this.config.width + (this.config.width / 2);
        this.setRulerStyle(ruleX, 0, 50, 0, 'row');
        this.setCurrThumbStyle(`calc(50% - ${this.config.width / 2}px)`, 'unset');
        this.setContainerStyle('100%', `${this.config.height}px`, 'column', 0);
        break;
      case 'bottom':
        ruleX = this.state.currIndex * this.config.width + (this.config.width / 2);
        this.setRulerStyle(ruleX, 0, 50, 0, 'row');
        this.setCurrThumbStyle(`calc(50% - ${this.config.width / 2}px)`, 'unset');
        this.setContainerStyle('100%', `${this.config.height}px`, 'column', 3);
        break;
      case 'left':
        ruleY = this.state.currIndex * this.config.height + (this.config.height / 2);
        this.setRulerStyle(0, ruleY, 0, 50, 'column');
        this.setCurrThumbStyle('unset', `calc(50% - ${this.config.height / 2}px)`);
        this.setContainerStyle(`${this.config.width}px`, '100%', 'row', 0);
        break;
      case 'right':
        ruleY = this.state.currIndex * this.config.height + (this.config.height / 2);
        this.setRulerStyle(0, ruleY, 0, 50, 'column');
        this.setCurrThumbStyle('unset', `calc(50% - ${this.config.height / 2}px)`);
        this.setContainerStyle(`${this.config.width}px`, '100%', 'row', 3);
        break;
      default:
        break;
    }

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
