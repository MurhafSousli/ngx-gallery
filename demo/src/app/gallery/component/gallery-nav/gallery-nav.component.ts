import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { GalleryService } from '../../service/gallery.service';

@Component({
  selector: 'gallery-nav',
  templateUrl: './gallery-nav.component.html',
  styleUrls: ['./gallery-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryNavComponent implements OnInit {

  @Input() state;

  constructor(public gallery: GalleryService) {
  }

  ngOnInit() {
  }

}
