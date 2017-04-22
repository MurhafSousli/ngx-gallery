import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {GalleryService} from '../../service/gallery.service';

@Component({
  selector: 'gallery',
  template: '<gallery-main *ngIf="gallery.state | async as state" [state]="state" [config]="gallery.config"></gallery-main>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnDestroy {

  constructor(public gallery: GalleryService) {
  }

  ngOnDestroy() {
    this.gallery.reset();
  }

}
