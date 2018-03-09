import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import { SharedService } from '../../service/shared.service';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'basic-example',
  templateUrl: './basic-example.component.html',
  styleUrls: ['./basic-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicComponent {

  code: any;
  lions$ = this.shared.getImages('lion');
  tigers$ = this.shared.getImages('tiger');

  media$;

  constructor(public shared: SharedService, public media: ObservableMedia) {
    this.code = code;
    this.media$ = media.asObservable().pipe(
      map((res: any) => res.mqAlias)
    );
  }

}

const code = {
  ex1: '<gallery id="ex1" [items]="items" thumbPosition="left"></gallery>',
  ex2: '<gallery id="ex2" [items]="items" thumbPosition="right" slidingDirection="vertical"></gallery>',
  load: `import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  styles: [\`
    gallery {
      height: 500px; // The gallery must have a height
    }
  \`]
})
export class AppComponent implements OnInit {

  items: GalleryItem[];

  ngOnInit() {
    this.items = imageData.map(item => new ImageItem(item.srcUrl, item.previewUrl));
  }
}`,
  imageData: `imageData = [
  {
    srcUrl: 'https://example.com/images/twins_960.jpg',
    previewUrl: 'https://example.com/images/twins_250.jpg'
  }
  // ... more items
];`
};
