import {Component, OnInit} from '@angular/core';
import {GalleryService} from '../../gallery/service/gallery.service';
import {SharedService} from '../../shared/service/shared.service';

@Component({
  selector: 'modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss']
})
export class ModalExampleComponent implements OnInit {

  constructor(public gallery: GalleryService, public shared: SharedService) {
  }

  ngOnInit() {
    this.gallery.load(this.shared.getImages());
  }

}
