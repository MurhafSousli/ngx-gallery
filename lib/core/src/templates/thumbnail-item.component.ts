import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GalleryItemComponent } from '../models';

@Component({
  selector: 'thumbnail-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div [lazyImage]="data.thumbSrc"></div>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
    div {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
    }
  `]
})
export class ThumbnailItemComponent implements GalleryItemComponent {
  @Input() data: any;
}
