import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { animation } from './gallery-image.animation';
import { GalleryState } from '../../service/gallery.state';
import { GalleryConfig } from '../../service/gallery.config';

@Component({
  selector: 'gallery-image',
  templateUrl: './gallery-image.component.html',
  styleUrls: ['./gallery-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: animation
})
export class GalleryImageComponent {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() loading = new EventEmitter();
  animate: string;

  constructor() {
  }

  imageLoad(done: boolean) {
    this.loading.emit(!done);

    if (done) {
      this.animate = 'none';
    } else {
      switch (this.config.animation) {
        case 'fade':
          this.animate = 'fade';
          break;
        case 'slide':
          this.animate = (this.state.currIndex > this.state.prevIndex) ? 'slideLeft' : 'slideRight';
          break;
        default:
          this.animate = 'none';
      }
    }

  }


}
