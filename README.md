[![npm](https://img.shields.io/npm/v/ng-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-gallery) [![Travis branch](https://travis-ci.org/MurhafSousli/ng-gallery.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng-gallery) [![npm](https://img.shields.io/npm/dt/ng-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-gallery)

<h1 align="center">Angular Image Gallery</h1>

Angular Image Gallery | [live demo](https://murhafsousli.github.io/ng-gallery/)

## Installation

Install it with npm

`npm install --save ng-gallery`

### SystemJS

If you are using SystemJS, you should also adjust your configuration to point to the UMD bundle.

In your systemjs config file, `map` needs to tell the System loader where to look for `ng-gallery`:

```js
map: {
  'ng-gallery': 'node_modules/ng-gallery/bundles/ng-gallery.umd.js',
}
```

## Usage

Import `GalleryModule` and set the gallery configuration in your root module

```ts
  import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';
  import { GalleryModule } from 'ng-gallery';
  
  export const galleryConfig : GalleryConfig = {
    // ...
  }
  
  @NgModule({
   imports: [
      // ...
      BrowserAnimationsModule,
      GalleryModule.forRoot(galleryConfig)
   ]
  })
```

After that you will be able to use Gallery's components and there is two options:
 
 - `<gallery></gallery>` : to insert the gallery right in the template, see [basic example](https://murhafsousli.github.io/ng-gallery/#/basic)
 - `<gallery-modal></gallery-modal>` : to open the gallery in a modal, see [modal example](https://murhafsousli.github.io/ng-gallery/#/modal)


 One final step is to fill the gallery with images and there is two options:
 
 - Using GalleryService

```ts
constructor(private gallery: GalleryService) { }

ngOnInit() {
    this.gallery.load(images);
}
```
- Using `[gallerize]` directive

```html
<div [gallerize] class="content">
    <img src="assets/img/img3.jpg" alt="Spring">
    <img src="assets/img/img4.jpg" alt="Fire">
    <img src="assets/img/img5.jpg" alt="Peacock">
</div>
```

### Gesture Support (optional)

Gallery Module relies on HammerJS for gestures, make sure it is loaded into the application.

*You can add HammerJS to your application via npm, a CDN (such as the Google CDN), or served directly from your app.*

To install via npm, use the following command:

`$ npm install --save hammer.js`

After installing, import it on your app's root module

```ts
import 'hammerjs';
```

## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng-gallery/issues). I am excited to see what the community thinks of this project, and I would love your input!

## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)