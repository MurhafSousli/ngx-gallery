import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges, ViewEncapsulation
} from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryConfig } from '../../models';

/** TODO: Investigate How to get the most of lazysizes library */
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks';
// import 'lazysizes/plugins/object-fit/ls.object-fit';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'lazysizes/plugins/optimumx/ls.optimumx';
// import 'lazysizes/plugins/video-embed/ls.video-embed';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/progressive/ls.progressive';

import lazySizes from 'lazysizes';

@Component({
  selector: 'gallery-items',
  templateUrl: './gallery-items.component.html',
  styleUrls: ['./gallery-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryItemsComponent implements OnInit, OnChanges {

  loading = false;

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery) {
  }

  ngOnInit() {
    lazySizes.init();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    /** Show loading if there are items to display */
    this.loading = true;
  }

  onLazyLoaded(e) {
    this.loading = false;
  }
}
