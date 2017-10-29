import { ChangeDetectionStrategy, Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';

@Component({
  selector: 'gallery',
  template: `<gallery-main [state]="gallery.state$ | async" [config]="gallery.config" [isOverlay]="isOverlay"></gallery-main>`,
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnDestroy {

  @Input() isOverlay: boolean;

  constructor(public gallery: Gallery) {
  }

  ngOnDestroy() {
    this.isOverlay ? this.gallery.closeDialog() : this.gallery.reset();
  }

}
