<p align="center">
  <img height="150px" width="150px" src="https://rawgit.com/MurhafSousli/ng-gallery/master/assets/logo.svg" style="max-width:100%;">
</p>
<h1 align="center">Angular Image Gallery</h1>

Angular image gallery simplifies the process of creating beautiful image gallery for the web and mobile devices.


[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://murhafsousli.github.io/ng-gallery/)
[![npm](https://img.shields.io/npm/v/ng-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-gallery)
[![Travis branch](https://travis-ci.org/MurhafSousli/ng-gallery.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng-gallery)
[![npm](https://img.shields.io/npm/dt/ng-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-gallery)
[![npm](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](/LICENSE)

<p align="center">
  <img src="assets/screenshot.png" style="max-width:100%;">
</p>

## Installation

Install it with npm

`$ npm install --save @angular/cdk ng-gallery`


This plugin depends on Angular CDK for the lightbox feature, you don't need to import anything from the CDK, just make sure that it is installed in the project.


### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, `map` needs to tell the System loader where to look for `ng-gallery`:

```js
map: {
  'ng-gallery': 'node_modules/ng-gallery/bundles/ng-gallery.umd.js',
}
```
Here is a [stackblitz](https://stackblitz.com/edit/angular-material2-issue-d3efjs)

## Usage

1. Import `GalleryModule.forRoot(...)` in the root module

Import `GalleryModule` and set the gallery configuration in your root module

```ts
  import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
  import { GalleryModule } from 'ng-gallery';
  
  export const config : GalleryConfig = {
    // ...
  }
  
  @NgModule({
   imports: [
      // ...
      BrowserAnimationsModule,
      GalleryModule.forRoot(config)
   ]
  })
```

2. Load images into the gallery

 Add images into the gallery by using the service `Gallery.load(...)`, see [basic example](https://murhafsousli.github.io/ng-gallery/#/basic).

 Alternatively, you can automatically add images using the directive `[gallerize]`, see [auto-detect example](https://murhafsousli.github.io/ng-gallery/#/auto-detect).


 After that use will be able to use `<gallery></gallery>` component to display the gallery in the template.

 Or if you want to open the gallery in an overlay, use the service `Gallery.open()`, see [gallery lightbox example](https://murhafsousli.github.io/ng-gallery/#/lightbox).
 
 
 ### Load image
 
 Use the service `Gallery` to load images

```js
import { Gallery, GalleryItem } from 'ng-gallery';

export class AppComponent implements OnInit {
  
  constructor(public gallery: Gallery) { }
  
  ngOnInit() {
    const images: GalleryItem[] = [
      {
        src: 'assets/clouds.jpg',
        thumbnail: 'assets/clouds.jpg',
        text: 'Sky & Clouds'
      },
      // ...
    ];
    
    this.gallery.load(images);
  }
}
```

### Auto-detect


The directive `[gallerize]` will automatically detect all images inside the host element and hook them with the gallery lightbox

```html
<div gallerize>
  <img src="assets/img/img3.jpg" alt="Spring">
  <img src="assets/img/img4.jpg" alt="Fire">
  <img src="assets/img/img5.jpg" alt="Peacock">
</div>
```

You can also detect images using their class, `[gallerize]="'class-name'"`

```html
<div gallerize="cars">
  <img class="cars" src="assets/img/img3.jpg" alt="BMW">
  <img class="cars" src="assets/img/img4.jpg" alt="Toyota">
  <img class="bikes" src="assets/img/img5.jpg" alt="S800">
</div>
```

### Gesture Support (optional)

Gallery Module relies on HammerJS for gestures, make sure it is loaded into the application.

*You can add HammerJS to your application via [npm](https://www.npmjs.com/package/hammerjs), a CDN (such as the [Google CDN](https://developers.google.com/speed/libraries/#hammerjs)), or served directly from your app.*

To install via npm, use the following command:

`$ npm install --save hammer.js`

After installing, import it on your app's root module

```ts
import 'hammerjs';
```

## Support

[![npm](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/bePatron?u=5594898)


## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng-gallery/issues). I am excited to see what the community thinks of this project, and I would love your input!


## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)
