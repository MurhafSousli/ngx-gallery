import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryLoaderConfig } from '../../models';

@Component({
  selector: 'gallery-loader',
  template: `
    <div class="g-loader">
      <img [src]="icon" [style.width]="config.width" [style.height]="config.height"/>
    </div>
  `,
  styleUrls: ['./gallery-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryLoaderComponent implements OnInit {

  @Input() config: GalleryLoaderConfig;

  /** Loader icon */
  icon: string;

  constructor(public gallery: Gallery) {
  }

  ngOnInit() {
    this.icon = this.getIcon();
  }

  getIcon() {
    switch (this.config.icon) {
      case 'puff':
        return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/puff.svg';

      case 'spinning-circles':
        return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg';

      case 'three-dots':
        return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/three-dots.svg';

      case 'oval':
        return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/oval.svg';

      case 'ball-triangle':
        return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/ball-triangle.svg';

      case 'bars':
        return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/bars.svg';

      case 'tail-spin':
        return 'https://cdn.rawgit.com/SamHerbert/SVG-Loaders/75b65ef5/svg-loaders/tail-spin.svg';

      default:
        /** Custom loading icon src */
        return this.config.icon;
    }
  }


}
