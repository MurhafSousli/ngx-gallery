import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef, ImageItem, VideoItem, YoutubeItem } from '@ngx-gallery/core';

@Component({
  selector: 'mixed-example',
  templateUrl: './mixed-example.component.html',
  styleUrls: ['./mixed-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MixedComponent implements OnInit {

  galleryRef: GalleryRef = this.gallery.ref('mixed');
  code: any;

  arr: any = [
    {
      type: 'image',
      src: 'assets/img/img13.jpg',
      thumb: 'assets/img/thumb/img13.jpg'
    },
    {
      type: 'image',
      src: 'assets/img/img11.jpg',
      thumb: 'assets/img/thumb/img11.jpg'
    },
    {
      type: 'video',
      src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      thumb: 'assets/img1.jpg'
    },
    {
      type: 'youtube',
      src: '-OvvpsfU3NQ'
    },
    {
      type: 'image',
      src: 'assets/img/img3.jpg',
      thumb: 'assets/img/thumb/img3.jpg'
    },
    {
      type: 'image',
      src: 'assets/img/img4.jpg',
      thumb: 'assets/img/thumb/img4.jpg'
    }
  ];

  constructor(private gallery: Gallery) {
    this.code = code;
  }

  ngOnInit() {
    const switchItem = (item) => {
      switch (item.type) {
        case 'image':
          return new ImageItem(item.src, item.thumb);
        case 'video':
          return new VideoItem(item.src, item.thumb);
        case 'youtube':
          return new YoutubeItem(item.src);
      }
    };
    this.arr.map(item => {
      this.galleryRef.add(switchItem(item));
    });
  }

}

const code = {
  load: `import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef, ImageItem, VideoItem, YoutubeItem } from '@ngx-gallery/core';

@Component({
  template: '<gallery id="{{galleryId}}"></gallery>',
  styles: [\`
    gallery {
      height: 500px; // The gallery must have a height
    }
  \`]
})
export class AppComponent implements OnInit {

  galleryId = 'mixed';
  galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

  constructor(private gallery: Gallery) { }

  ngOnInit() {
    const switchItem = (item) => {
      switch (item.type) {
        case 'image':
          return new ImageItem(item.src, item.thumb);
        case 'video':
          return new VideoItem(item.src, item.thumb);
        case 'youtube':
          return new YoutubeItem(item.src);
      }
    };
    data.map(item => {
      this.galleryRef.add(switchItem(item));
    });
  }
}`,
  itemsData: `data = [
  {
    type: 'image',
    src: 'assets/img/img1.jpg',
    thumb: 'assets/img/thumb/img1.jpg'
  },
  {
    type: 'video',
    src:  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    thumb: 'assets/img1.jpg'
  },
  {
    type: 'youtube',
    src: 'GlIzuTQGgzs'   // youtube video id
  }
];`
};
