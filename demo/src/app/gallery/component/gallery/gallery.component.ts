import {Component, OnDestroy} from '@angular/core';
import {GalleryService} from '../../service/gallery.service';

@Component({
  selector: 'gallery',
  template: '<gallery-base *ngIf="gallery.state | async as state" [state]="state"></gallery-base>',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnDestroy {

  constructor(private gallery: GalleryService) {
  }

  ngOnDestroy() {
    this.gallery.reset();
  }

}
