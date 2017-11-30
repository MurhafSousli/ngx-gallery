import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryItem, GalleryAction, GalleryConfig } from '../../models';

@Component({
  selector: 'gallery-items',
  template: `
    <div *ngIf="current" class="g-item">
      <div class="g-img"
           [style.backgroundSize]="config.imageSize"
           [lazyImage]="current.src"
           (loading)="onLoad($event)"></div>
    </div>
  `,
  styleUrls: ['./gallery-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryItemsComponent {

  @Input() current: GalleryItem;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery) {
  }

  onLoad(e: boolean) {
    this.gallery.setState({
      action: e ? GalleryAction.LOADING_START : GalleryAction.LOADING_END,
      loading: e
    });
  }

}
