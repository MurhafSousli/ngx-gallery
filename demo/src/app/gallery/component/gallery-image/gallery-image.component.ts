import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { GalleryService } from '../../service/gallery.service';
import {animation} from './gallery-image.animation';

@Component({
  selector: 'gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: animation
})
export class GalleryImageComponent {

  @Input() state;
  loadDone;
  animate;

  constructor(public gallery: GalleryService) {
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
