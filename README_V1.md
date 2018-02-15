<p align="center">
  <img height="150px" width="150px" src="https://rawgit.com/MurhafSousli/ng-gallery/master/src/assets/logo.svg" style="max-width:100%;">
</p>
<h1 align="center">Angular Gallery</h1>

Angular gallery simplifies the process of creating beautiful image gallery for the web and mobile devices.


[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ngx-gallery/)
[![npm](https://img.shields.io/npm/v/ngx-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-gallery)
[![npm](https://img.shields.io/npm/dt/ngx-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ngx-gallery)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)


Please support the plugin

[![npm](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/bePatron?u=5594898)


## Table of contents

- Installation
- Usage
  - Basic
  - Mixed
  - Lightbox
  - Advanced
- API
  - Gallery Config
  - Lightbox Config
  - Gallery Component
  - Gallery Service
  - Lightbox Service
  - GalleryRef Class
- Issues
- Author  
  
## Installation

Install it with npm

`$ npm install --save @angular/cdk ng-gallery`

This plugin depends on Angular CDK for the lightbox feature, you don't need to import anything from the CDK, just make sure that it is installed in the project.

### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, `map` needs to tell the System loader where to look for `cdk` and `ng-gallery`:

```js
map: {
  '@angular/cdk': 'node_modules/@angular/cdk/bundles/cdk.umd.js',
  '@angular/cdk/bidi': 'node_modules/@angular/cdk/bundles/cdk-bidi.umd.js',
  '@angular/cdk/coercion': 'node_modules/@angular/cdk/bundles/cdk-coercion.umd.js',
  '@angular/cdk/keycodes': 'node_modules/@angular/cdk/bundles/cdk-keycodes.umd.js',
  '@angular/cdk/platform': 'node_modules/@angular/cdk/bundles/cdk-platform.umd.js',
  '@angular/cdk/portal': 'node_modules/@angular/cdk/bundles/cdk-portal.umd.js',
  '@angular/cdk/overlay': 'node_modules/@angular/cdk/bundles/cdk-overlay.umd.js',
  '@angular/cdk/scrolling': 'node_modules/@angular/cdk/bundles/cdk-scrolling.umd.js',
  'ng-gallery': 'node_modules/ng-gallery/bundles/ng-gallery.umd.js',
}
```

## Usage

#### 1. Import `GalleryModule` in the root module

```ts
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';

@NgModule({
 imports: [
    // ...
    BrowserAnimationsModule,
    GalleryModule.forRoot(config)
 ]
})
```

#### 2. Import gallery styles `src/styles.scss`

```scss
@import '~ng-gallery/styles/ng-gallery';
```

#### 3. Load images into the gallery



## Basic Usage

```ts
import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({...})
export class AppComponent implements OnInit {

  items: GalleryItem[];

  // Assume your data looks like this
  imageData = [
    {
      srcUrl: 'https://example.com/images/twins_960.jpg',
      previewUrl: 'https://example.com/images/twins_250.jpg'
    }
    // ... more items
  ];

  ngOnInit() {
    this.items = this.imageData.map(item => {
      return new ImageItem({
        src: item.srcUrl,
        thumbSrc: item.previewUrl
      });
    });
  }
}
```
See [Basic Example](http://localhost:4200/#/basic).

## Mixed Usage

```ts
import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryRef, ImageItem, VideoItem, YoutubeItem } from '../../gallery';

@Component({
  template: '<gallery id="{{galleryId}}"></gallery>'
})
export class AppComponent implements OnInit {

  galleryId = 'mixed';
  galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

  // Assume your data looks like this
  arr = [
    {
      type: 'image',
      src: 'assets/img/img1.jpg',
      thumbSrc: 'assets/img/thumb/img1.jpg'
    },
    {
      type: 'video',
      src:  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
      thumbSrc: 'assets/img1.jpg'
    },
    {
      type: 'youtube',
      src: 'GlIzuTQGgzs'   // youtube video id
    }
  ];

  constructor(private gallery: Gallery) { }

  ngOnInit() {
    const switchItem = (item) => {
      switch (item.type) {
        case 'image':
          return new ImageItem(item.src, item.thumbSrc);
        case 'video':
          return new VideoItem(item.src, item.thumbSrc);
        case 'youtube':
          return new YoutubeItem(item.src);
      }
    };
    this.arr.map(item => {
      this.galleryRef.addItem(switchItem(item));
    });
  }
}
```

See [Mixed Content Example](http://localhost:4200/#/mixed).

## Lightbox Usage

```ts
import { Component, OnInit } from '@angular/core';
import { Gallery, Lightbox, GalleryItem } from 'ng-gallery';

@Component({
  template: `
    <div class="grid">
      <div class="grid-item" *ngFor="let item of items; let i = index" (click)="lightbox.open(i)">
        <img [src]="item.data.thumbnail">
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {

  items: GalleryItem[];

  constructor(public lightbox: Lightbox, public gallery: Gallery) { }

  ngOnInit() {
    this.gallery.ref('lightbox').load(items);
  }
}
```

See [Lightbox Example](http://localhost:4200/#/lightbox).

## Advanced Usage

```ts 
import { Component, OnInit } from '@angular/core';
import { GalleryItem } from 'ng-gallery';

import { SlideOneComponent } from './steps/slide-one';
import { SlideTwoComponent } from './steps/slide-two';
import { SlideThreeComponent } from './steps/slide-three';
import { TabComponent } from './steps/tab';

@Component({
  template: `
    <gallery id="slides"
             [thumbPosition]="'top'"
             [thumbWidth]="200"
             [items]="slides"
             [gestures]="false"
             [nav]="false"
             [counter]="false"
             [disableThumb]="true">
    </gallery>
  `
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
  }
}
```

See [Advanced Example](http://localhost:4200/#/advanced).

## API

### Gallery Config

| Name                   | Default       | Description                                             |
| ---------------------- |-------------- | ------------------------------------------------------- |
| **gestures**           | true          | Use touch events (require hammer.js)                    |
| **loop**               | false         | loop for `next()` and `prev()` functions                |
| **panSensitivity**     | 25            | Sliding sensitivity                                     |
| **sliderDirection**    | `horizontal`  | Reset gallery to `horizontal` | `vertical`              |
| **zoomOut**            | 0             | Zoom out for the main slider                            |
| **counter**            | true          | Show counter                                            |
| **dots**               | false         | Show dots navigation                                    |
| **thumb**              | true          | Show thumbnails navigation                              |
| **thumbWidth**         | 120           | Thumbnail width                                         |
| **thumbHeight**        | 90            | Thumbnail height                                        |
| **thumbPosition**      | `top`         | Thumbnails position `top` | `left` | `right` | `bottom` |
| **disableThumb**       | false         | Disable Thumbnails clicks                               |

### Lightbox Config

| Name                   | Default       | Description                                             |
| ---------------------- |-------------- | ------------------------------------------------------- |
| **backdropClass**      | `g-backdrop`  | Lightbox backdrop class                                 |
| **panelClass**         | `g-overlay`   | Lightbox panel class                                    |
| **hasBackdrop**        | true          | Lightbox hasBackdrop                                    |
| **keyboardShortcuts**  | true          | Navigation keyboard shortcuts `right`, `left`, `escape` |


### Gallery Component

| Name                   | Default       | Description                                             |
| ---------------------- |-------------- | ------------------------------------------------------- |
| **gestures**           | true          | Use touch events (require hammer.js)                    |
| **panSensitivity**     | 25            | Sliding sensitivity                                     |
| **imageSize**          | `cover`       | Image size 'cover' | 'contain'                          |
| **sliderDirection**    | `horizontal`  | Reset gallery to `horizontal` | `vertical`              |
| **showBullets**        | false         | Show bullets navigation                                 |
| **showThumb**          | true          | Show thumbnails navigation                              |
| **thumbWidth**         | 120           | Thumbnail width                                         |
| **thumbHeight**        | 90            | Thumbnail height                                        |
| **thumbPosition**      | `top`         | Thumbnails position `top` | `left` | `right` | `bottom` |
| **backdropClass**      | `g-backdrop`  | Lightbox backdrop class                                 |
| **panelClass**         | 'g-overlay`   | Lightbox panel class                                    |
| **hasBackdrop**        | true          | Lightbox hasBackdrop                                    |

### Gallery Service

| Name                        | Description                                         |
| --------------------------- | --------------------------------------------------- |
| **ref(id?)**                | Get `GalleryRef` by id                              |
| **resetAll()**              | Reset all gallery instances                         |
| **destroy(id?)**            | Destroy gallery instance by Id                      |
| **destroyAll()**            | Destroy all galleries instances                     |

### GalleryRef

| Name                        | Description                                            |
| --------------------------- | ------------------------------------------------------ |
| **setConfig(config)**       | Set gallery config                                     |
| **load(items)**             | Load new items and reset the state                     |
| **set(index)**              | Set active item                                        |
| **next()**                  | Set next item                                          |
| **prev()**                  | Set prev item                                          |
| **open(index?)**            | Open gallery lightbox                                  |
| **close()**                 | Close gallery lightbox                                 |
| **reset()**                 | Reset gallery to initial state                         |
| **initialized()**           | Stream that emits when gallery is initialized/reset    |
| **indexChanged()**          | Stream that emits when current index is changed        |
| **itemsChanged()**          | Stream that emits when loaded items index is changed   |

## Gesture Support (optional)

Gallery Module relies on HammerJS for gestures, make sure it is loaded into the application.

*You can add HammerJS to your application via [npm](https://www.npmjs.com/package/hammerjs), a CDN (such as the [Google CDN](https://developers.google.com/speed/libraries/#hammerjs)), or served directly from your app.*

To install via npm, use the following command:

`$ npm install --save hammer.js`

After installing, import it on your app's root module

```ts
import 'hammerjs';
```

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng-gallery/issues). I am excited to see what the community thinks of this project, and I would love your input!

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

- [github/murhafsousli](https://github.com/MurhafSousli)
- [twitter/murhafsousli](https://twitter.com/MurhafSousli)
