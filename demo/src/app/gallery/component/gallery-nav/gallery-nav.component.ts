import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'gallery-nav',
  templateUrl: './gallery-nav.component.html',
  styleUrls: ['./gallery-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryNavComponent {

  @Input() state;

  constructor(public gallery: GalleryService) {
  }

}
