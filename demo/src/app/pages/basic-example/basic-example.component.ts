import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GalleryService} from '../../gallery';
// import { GalleryService } from 'ng-gallery';
import {SharedService} from '../../shared/service/shared.service';

@Component({
  selector: 'basic-example',
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicExampleComponent implements OnInit {

  constructor(public gallery: GalleryService, public shared: SharedService) {
  }

  ngOnInit() {
    this.gallery.load(this.shared.getImages());
  }


}
