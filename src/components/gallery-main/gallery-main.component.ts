import {  ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';

@Component({
  selector: 'gallery-main',
  templateUrl: './gallery-main.component.html',
  styleUrls: ['./gallery-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryMainComponent {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Input() isOverlay: boolean;

  constructor(public gallery: Gallery) {
  }

}
