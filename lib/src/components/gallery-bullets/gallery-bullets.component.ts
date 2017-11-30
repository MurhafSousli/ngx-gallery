import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryAction, GalleryBulletConfig } from '../../models';

@Component({
  selector: 'gallery-bullets',
  templateUrl : './gallery-bullets.component.html',
  styleUrls: ['./gallery-bullets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryBulletsComponent {

  @Input() state: GalleryState;
  @Input() config: GalleryBulletConfig;

  constructor(public gallery: Gallery) {
  }

  onTapClick(i) {
    this.gallery.set(i, GalleryAction.BULLET_CLICK);
  }
}
