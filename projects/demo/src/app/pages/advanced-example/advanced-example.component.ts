import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GalleryItem } from '@ngx-gallery/core';

import { Pixabay } from '../../service/pixabay.service';
import { SlideOneComponent } from './steps/slide-one';
import { SlideTwoComponent } from './steps/slide-two';
import { SlideThreeComponent } from './steps/slide-three';
import { TabComponent } from './steps/tab';

@Component({
  selector: 'advanced-example',
  templateUrl: './advanced-example.component.html',
  styleUrls: ['./advanced-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedExampleComponent implements OnInit {

  images$ = this._pixabay.getImages('island', true);
  slides: GalleryItem[];
  code: string;

  constructor(public _pixabay: Pixabay) {
    this.code = code;
  }

  ngOnInit() {
    this.slides = [
      {
        component: SlideOneComponent,
        thumbComponent: TabComponent,
        data: {
          index: 1,
          title: 'Identity',
          subtitle: 'Personal info!',
          galleryId: 'slides'
        }
      },
      {
        component: SlideTwoComponent,
        thumbComponent: TabComponent,
        data: {
          index: 2,
          title: 'Travel',
          subtitle: 'Which Suits You Best?',
          galleryId: 'slides'
        }
      },
      {
        component: SlideThreeComponent,
        thumbComponent: TabComponent,
        data: {
          index: 3,
          title: 'Summary',
          subtitle: 'Get lottery code!',
          galleryId: 'slides'
        }
      }
    ];
  }

}

const code = `import { Component, OnInit } from '@angular/core';
import { GalleryItem } from '@ngx-gallery/core';

import { SlideOneComponent } from './steps/slide-one';
import { SlideTwoComponent } from './steps/slide-two';
import { SlideThreeComponent } from './steps/slide-three';
import { TabComponent } from './steps/tab';

@Component({
  template: \`
    <gallery id="slides" [items]="slides" [disableThumb]="true"
             [thumbPosition]="'top'" [thumbWidth]="200"
             [gestures]="false" [nav]="false" [counter]="false">
    </gallery>
  \`
})

export class AdvancedExampleComponent implements OnInit {

  slides: GalleryItem[];

  ngOnInit() {
    this.slides = [
      {
        component: SlideOneComponent,
        thumbComponent: TabComponent,
        data: {
          index: 1,
          title: 'Identity',
          subtitle: 'Personal info!'
        }
      },
      {
        component: SlideTwoComponent,
        thumbComponent: TabComponent,
        data: {
          index: 2,
          title: 'Travel',
          subtitle: 'Which Suits You Best?'
        }
      },
      {
        component: SlideThreeComponent,
        thumbComponent: TabComponent,
        data: {
          index: 3,
          title: 'Summary',
          subtitle: 'Get lottery code!'
        }
      }
    ];
  }`;
