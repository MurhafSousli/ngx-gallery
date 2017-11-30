import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Gallery } from '../../services/gallery.service';
import { GalleryState, GalleryPlayConfig } from '../../models';

import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { map, takeWhile, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'gallery-player',
  templateUrl: './gallery-player.component.html',
  styleUrls: ['./gallery-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GalleryPlayerComponent implements OnInit {

  progress$: Observable<any>;
  @Input() config: GalleryPlayConfig;

  constructor(public gallery: Gallery) {
  }

  ngOnInit() {

    const trickleTime = this.config.interval / 10;

    const isPlayingAndNotLoading = filter((state: GalleryState) => state.play && !state.loading);

    const progressStyle = map((percent: number) => ({
      height: this.config.thickness + 'px',
      backgroundColor: this.config.color,
      width: percent + '%',
      transition: `width linear ${percent ? trickleTime : 0}ms`
    }));

    const timeToPercent = map((tick: number) => tick * trickleTime * 100 / this.config.interval);

    const timerToNextImage = switchMap(() => timer(0, trickleTime).pipe(
      timeToPercent,
      takeWhile((elapsed) => {
        const skip = elapsed <= 100;
        if (!skip) {
          this.gallery.next();
        }
        return skip && this.gallery.state.play;
      }),
      progressStyle
    ));

    /** Start player worker */
    this.progress$ = this.gallery.state$.pipe(
      isPlayingAndNotLoading,
      timerToNextImage
    );

    /** Start auto-play if enabled */
    if (this.config.autoplay) {
      this.gallery.play();
    }
  }
}
