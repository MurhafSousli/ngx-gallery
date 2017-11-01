import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState } from '../../models';

@Component({
  selector: 'gallery-nav',
  templateUrl: './gallery-nav.component.html',
  styleUrls: ['./gallery-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryNavComponent {

  @Input() state: GalleryState;

  constructor(public gallery: Gallery) {
  }

}
