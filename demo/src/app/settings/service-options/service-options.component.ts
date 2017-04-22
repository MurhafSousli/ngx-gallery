import {ChangeDetectionStrategy, Component} from '@angular/core';
import {GalleryService} from '../../gallery';

@Component({
  selector: 'service-options',
  templateUrl: './service-options.component.html',
  styleUrls: ['./service-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceOptionsComponent {

  constructor(public gallery: GalleryService) {

  }
}
