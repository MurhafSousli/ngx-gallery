import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  ViewEncapsulation
} from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';

@Component({
  selector: 'gallery-items',
  templateUrl: './gallery-items.component.html',
  styleUrls: ['./gallery-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryItemsComponent implements OnChanges {

  loading = false;

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery) {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    /** Show loading when current image changes */
    if (!simpleChanges['state'].firstChange) {
      const curr: GalleryState = simpleChanges['state'].currentValue;
      const prev: GalleryState = simpleChanges['state'].previousValue;

      if (curr.currIndex !== prev.currIndex) {
        this.loading = true;
      }
    }
  }

}
