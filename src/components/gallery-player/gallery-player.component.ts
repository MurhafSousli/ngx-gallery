import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryPlayConfig } from '../../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'gallery-player',
  templateUrl: './gallery-player.component.html',
  styleUrls: ['./gallery-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryPlayerComponent implements OnInit {

  @Input() config: GalleryPlayConfig;
  progress;

  constructor(public gallery: Gallery) {
  }

  ngOnInit() {
    /** Start auto-play if enabled */
    if (this.config.autoplay) {
      this.gallery.play();
    }

    this.progress = this.gallery.state$
      .map((state: GalleryState) => state.currIndex)
      .distinctUntilChanged()
      .mergeMap(() => Observable.timer(0, 100).take(2).map(v => !!v));

  }

  getClasses(e) {
    return {
      'g-progress-initial': !e,
      'g-progress-done': e
    };
  }

}
