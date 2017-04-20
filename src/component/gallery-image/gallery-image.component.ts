import { Component, Input } from '@angular/core';
import { transition, state, trigger, style, animate } from '@angular/animations';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  animations: [
    trigger('imgIn', [
      state('none', style({ opacity: 1 })),
      transition('slideLeft <=> *', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('slideRight <=> *', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('fade <=> *', [
        style({
          opacity: 0
        }),
        animate('0.5s ease-in')
      ]),
    ]),
    trigger('imgOut', [
      state('slideRight', style({ transform: 'translateX(100%)' })),
      state('slideLeft', style({ transform: 'translateX(-100%)' })),
      state('fade', style({ opacity: 0 })),
      state('none', style({ opacity: 1 })),
      transition('slideLeft <=> *', [
        style({
          transform: 'translateX(0)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('slideRight <=> *', [
        style({
          transform: 'translateX(0)'
        }),
        animate('0.5s ease-in')
      ]),
      transition('fade <=> *', [
        style({
          opacity: 1
        }),
        animate('1s ease-in')
      ]),
    ]),
  ],
})
export class GalleryImageComponent {

  @Input() state;
  loadDone;
  animate;

  constructor(private gallery: GalleryService) {
  }

  imageLoad(done) {
    this.loadDone = done;

    if (done) {
      this.animate = 'none';
    } else {
      switch (this.gallery.config.animation) {
        case 'fade':
          this.animate = 'fade';
          break;
        case 'slide':
          if (this.state.currIndex > this.state.prevIndex) {
            this.animate = 'slideLeft';
          } else {
            this.animate = 'slideRight';
          }
          break;
        default:
          this.animate = 'none';
      }
    }

  }


}
