import {Component, Input} from '@angular/core';
import {transition, state, trigger, style, animate} from '@angular/animations';
import {GalleryService} from "../../service/gallery.service";

@Component({
  selector: 'gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  animations: [
    trigger('imgIn', [
      transition('loading => notloading', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('0.5s ease-in')
      ]),
    ]),
    trigger('imgOut', [
      state('loading', style({transform: 'translateX(-100%)'})),
      transition('loading => notloading', [
        style({
          transform: 'translateX(0)'
        }),
        animate('0.5s ease-in')
      ]),
    ]),
  ],
})
export class GalleryImageComponent {

  /** Index of the previous image (to check if the current image is next or prev) */
  tempIndex;
  prevIndex;
  prevImage;

  @Input() state;
  prevImg;
  imgLoad;

  animateIn;
  animateOut;

  constructor(private gallery: GalleryService) {
  }

  getCurrImage() {
    if (this.prevIndex) {
      this.prevIndex = this.state.currIndex;
    }
    return this.state.images[this.state.currIndex].src;
  }

  imageLoad(e) {
    this.imgLoad = e;

    switch (this.gallery.config.animate) {
      case 'fade':
        this.animateIn = '';
        break;
      case '':
        break;
      default:
        this.animateIn = 'none';
    }

    // set previous image index to the current one
    // this.prevIndex = this.state.currIndex;
    if (this.prevIndex !== undefined) {
      this.prevImg = this.state.images[this.prevIndex].src;
    }
  }


}
