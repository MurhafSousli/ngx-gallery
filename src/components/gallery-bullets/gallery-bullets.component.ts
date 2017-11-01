import { Component, Input, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryBulletConfig } from '../../models';
import { applyCssPrefixes } from '../../utils/auto-prefixer';

@Component({
  selector: 'gallery-bullets',
  templateUrl: './gallery-bullets.component.html',
  styleUrls: ['./gallery-bullets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryBulletsComponent implements OnInit {

  containerStyle;
  @Input() state: GalleryState;
  @Input() config: GalleryBulletConfig;

  constructor(public gallery: Gallery) {
  }

  ngOnInit() {

    let style;

    switch (this.config.position) {
      case 'bottom':
        style = {
          'flex-direction': 'row',
          height: 'auto',
          width: '100%',
          bottom: 0
        };
        break;
      case 'left':
        style = {
          'flex-direction': 'column',
          height: '100%',
          width: 'auto'
        };
        break;
      case 'right':
        style = {
          'flex-direction': 'column',
          height: '100%',
          width: 'auto',
          right: 0
        };
        break;
      default:
        // top
        style = {
          'flex-direction': 'row',
          height: 'auto',
          width: '100%',
        };
        break;
    }

    this.containerStyle = applyCssPrefixes(style);
  }


}
