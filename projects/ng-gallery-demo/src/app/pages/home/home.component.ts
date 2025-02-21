import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
// import { FlexLayoutModule, MediaChange, MediaObserver } from '@angular/flex-layout';
import {
  GalleryComponent,
  GalleryConfig,
  GalleryItemData,
  GalleryItemDef,
  GalleryThumbsComponent,
  ImgRecognizer
} from 'ng-gallery';
import { Observable, map } from 'rxjs';
import { Pixabay } from '../../service/pixabay.service';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BadgesComponent } from '../../shared/badges/badges.component';

@Component({
  host: {
    'class': 'page'
  },
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    RouterLink,
    BadgesComponent,
    GalleryComponent,
    FooterComponent,
    AsyncPipe,
    // FlexLayoutModule,
    GalleryThumbsComponent,
    GalleryItemDef,
    ImgRecognizer
  ]
})
export class HomeComponent implements OnInit {

  readonly camel$: Observable<GalleryItemData[]>;
  readonly media$: Observable<any>;

  constructor(pixabay: Pixabay, private _title: Title) {
    this.camel$ = pixabay.getHDImages('mountain');
    // this.media$ = mediaObserver.asObservable().pipe(
    //   map((res: MediaChange[]) => {
    //     if (res.some((x => x.mqAlias === 'sm' || x.mqAlias === 'xs'))) {
    //       return {
    //         thumbWidth: 80,
    //         thumbHeight: 80
    //       };
    //     }
    //     return {
    //       thumbWidth: 120,
    //       thumbHeight: 90
    //     };
    //   })
    // );
  }

  ngOnInit() {
    this._title.setTitle('Home | ng-gallery');
  }
}
