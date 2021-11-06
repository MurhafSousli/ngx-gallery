import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { GalleryConfig, GalleryItem } from 'ng-gallery';
import { Pixabay } from '../../service/pixabay.service';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  readonly camel$: Observable<GalleryItem[]>;
  readonly media$: Observable<GalleryConfig>;

  constructor(pixabay: Pixabay, mediaObserver: MediaObserver, private _title: Title) {
    this.camel$ = pixabay.getHDImages('juice');
    this.media$ = mediaObserver.asObservable().pipe(
      map((res: MediaChange[]) => {
        if (res.some((x => x.mqAlias === 'sm' || x.mqAlias === 'xs'))) {
          return {
            thumbWidth: 80,
            thumbHeight: 80
          };
        }
        return {
          thumbWidth: 120,
          thumbHeight: 90
        };
      })
    );
  }

  ngOnInit() {
    this._title.setTitle('Home | ng-gallery');
  }
}
