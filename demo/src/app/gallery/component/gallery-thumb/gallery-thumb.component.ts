import { Component, Input, OnChanges, ChangeDetectionStrategy, ElementRef, Renderer2, OnInit } from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import { GalleryState } from '../../service/gallery.state';
import { GalleryThumbConfig } from '../../service/gallery.config';

@Component({
  selector: 'gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryThumbComponent implements OnInit, OnChanges {

  rulerStyle;
  currThumbStyle;

  @Input() state: GalleryState;
  @Input() config: GalleryThumbConfig;

  constructor(public gallery: GalleryService, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {

  }

  ngOnChanges() {
    // ruler variables
    let rulerX = 0, rulerY = 0, rulerCenterX = 0, rulerCenterY = 0, rulerDirection = 'row';
    // current thumbnail variables
    let thumbX = 'unset', thumbY = 'unset';
    // container variables
    let contWidth = '100%', contHeight = '100%', contDirection = 'column', contOrder = 0;
    // temp variables
    let widthHalf, heightHalf;

    const thumbWidth = this.config.width;
    const thumbHeight = this.config.height;


    switch (this.config.position) {
      case 'top':
        widthHalf = thumbWidth / 2;
        // ruler position
        rulerX = this.state.currIndex * thumbWidth + widthHalf;
        rulerCenterX = 50;

        // current thumbnail position
        thumbX = `calc(50% - ${widthHalf}px)`;

        // container position
        contHeight = `${thumbHeight}px`;
        break;

      case 'bottom':
        widthHalf = thumbWidth / 2;
        // ruler position
        rulerX = this.state.currIndex * thumbWidth + widthHalf;
        rulerCenterX = 50;

        // current thumbnail position
        thumbX = `calc(50% - ${widthHalf}px)`;

        // container position
        contHeight = `${thumbHeight}px`;
        contOrder = 2;
        break;
      case 'left':
        heightHalf = thumbHeight / 2;
        // ruler position
        rulerY = this.state.currIndex * thumbHeight + heightHalf;
        rulerCenterY = 50;
        rulerDirection = 'column';

        // current thumbnail position
        thumbY = `calc(50% - ${heightHalf}px)`;

        // container position
        contWidth = `${thumbWidth}px`;
        contDirection = 'row';
        break;
      case 'right':
        heightHalf = thumbHeight / 2;
        // ruler position
        rulerY = this.state.currIndex * thumbHeight + heightHalf;
        rulerCenterY = 50;
        rulerDirection = 'column';

        // current thumbnail position
        thumbY = `calc(50% - ${heightHalf}px)`;

        // container position
        contWidth = `${thumbWidth}px`;
        contDirection = 'row';
        contOrder = 2;
        break;
      default:
    }

    this.setRulerStyle(rulerX, rulerY, rulerCenterX, rulerCenterY, rulerDirection);
    this.setCurrThumbStyle(thumbX, thumbY, thumbWidth, thumbHeight);
    this.setContainerStyle(contWidth, contHeight, contDirection, contOrder);
  }

  setRulerStyle(x, y, left, top, direction) {
    this.rulerStyle = {
      margin: `${-y}px 0 0 ${-x}px`,
      left: `${left}%`,
      top: `${top}%`,
      flexDirection: direction
    };
  }

  setCurrThumbStyle(left, top, width, height) {
    this.currThumbStyle = {
      left: left,
      top: top,
      width: `${width}px`,
      height: `${height}px`
    };
  }

  setContainerStyle(width, height, direction, order) {
    this.renderer.setStyle(this.el.nativeElement, 'flexDirection', direction);
    this.renderer.setStyle(this.el.nativeElement, 'order', order);
    this.renderer.setStyle(this.el.nativeElement, 'width', width);
    this.renderer.setStyle(this.el.nativeElement, 'height', height);
  }

  getThumbImage(i) {
    return `url(${this.state.images[i].thumbnail || this.state.images[i].src})`;
  }

}
