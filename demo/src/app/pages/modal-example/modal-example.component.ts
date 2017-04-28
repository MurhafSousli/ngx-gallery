import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GalleryService} from '../../gallery/service/gallery.service';
import {SharedService} from '../../shared/service/shared.service';

@Component({
  selector: 'modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalExampleComponent implements OnInit {

  images = [];

  constructor(public gallery: GalleryService, public shared: SharedService) {
  }

  ngOnInit() {
    this.images = this.shared.getImages();
    this.gallery.load(this.images);
  }

}
