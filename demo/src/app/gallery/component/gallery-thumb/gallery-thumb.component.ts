import {Component, Input, OnChanges, ChangeDetectionStrategy, ElementRef, Renderer2} from '@angular/core';
import {GalleryService} from '../../service/gallery.service';
import {GalleryState} from '../../service/gallery.state';

@Component({
  selector: 'gallery-thumb',
  templateUrl: './gallery-thumb.component.html',
  styleUrls: ['./gallery-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryThumbnailsComponent implements OnChanges {

  rulerStyle;
  currThumbStyle;

  @Input() state: GalleryState;

  constructor(private gallery: GalleryService, private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnChanges() {
    const config = this.gallery.config.thumbnails;
    // ruler variables
    let rulerX = 0, rulerY = 0, rulerCenterX = 0, rulerCenterY = 0, rulerDirection = 'row';
    // current thumbnail variables
    let thumbX = 'unset', thumbY = 'unset';
    // container variables
    let contWidth = '100%', contHeight = '100%', contDirection = 'column', contOrder = 0;
    // temp variables
    let widthHalf, heightHalf;


    switch (config.position) {
      case 'top':
        widthHalf = config.width / 2;
        // ruler position
        rulerX = this.state.currIndex * config.width + widthHalf;
        rulerCenterX = 50;

        // current thumbnail position
        thumbX = `calc(50% - ${widthHalf}px)`;

        // container position
        contHeight = `${config.height}px`;
        break;

      case 'bottom':
        widthHalf = config.width / 2;
        // ruler position
        rulerX = this.state.currIndex * config.width + widthHalf;
        rulerCenterX = 50;

        // current thumbnail position
        thumbX = `calc(50% - ${widthHalf}px)`;

        // container position
        contHeight = `${config.height}px`;
        contOrder = 2;
        break;
      case 'left':
        heightHalf = config.height / 2;
        // ruler position
        rulerY = this.state.currIndex * config.height + heightHalf;
        rulerCenterY = 50;
        rulerDirection = 'column';

        // current thumbnail position
        thumbY = `calc(50% - ${heightHalf}px)`;

        // container position
        contWidth = `${config.width}px`;
        contDirection = 'row';
        break;
      case 'right':
        heightHalf = config.height / 2;
        // ruler position
        rulerY = this.state.currIndex * config.height + heightHalf;
        rulerCenterY = 50;
        rulerDirection = 'column';

        // current thumbnail position
        thumbY = `calc(50% - ${heightHalf}px)`;

        // container position
        contWidth = `${config.width}px`;
        contDirection = 'row';
        contOrder = 2;
        break;
      default:
        break;
    }

    this.setRulerStyle(rulerX, rulerY, rulerCenterX, rulerCenterY, rulerDirection);
    this.setCurrThumbStyle(thumbX, thumbY, config.width, config.height);
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
