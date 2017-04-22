[![npm](https://img.shields.io/npm/v/ng-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-gallery) [![Travis branch](https://travis-ci.org/MurhafSousli/ng-gallery.svg?branch=master)](https://travis-ci.org/MurhafSousli/ng-gallery) [![npm](https://img.shields.io/npm/dt/ng-gallery.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-gallery)
     
<p align="center">
  <img height="300px" width="500px" src="./assets/screenshot.png" style="max-width:100%;">
</p>

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

Here is a working [plunker]()

## Usage

Import `GalleryModule` and set the gallery configuration in your root module

```ts
import { GalleryModule } from 'ng-gallery';
  
  export const galleryConfig : GalleryConfig = {
    // ...
  }
  
  @NgModule({
   imports: [
      // ...
      GalleryModule.forRoot(galleryConfig)
   ]
  })
```

After that you will be able to use Gallery's components and there is two options:
 
 - `<gallery></gallery>` : to insert the gallery right in the template, see [basic example](https://murhafsousli.github.io/ng-gallery/basic)
 - `<gallery-modal></gallery-modal>` : to open the gallery in a modal, see [modal example](https://murhafsousli.github.io/ng-gallery/modal)


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

### Options scheme


 - **animation** animate images transition (string)

 - **width** gallery's width [any units] (string)

 - **height** gallery's height [any units] (string)

 - **description** add description bar (GalleryDescriptionConfig | false)

    - **position** description's position before or after the main image [top, bottom] (string)

    - **overlay** description's overlay enable (boolean)

    - **text** description's text (boolean)

    - **counter** slides' counter (boolean)

 - **thumbnails**

    add thumbnail carousel (GalleryThumbnailsConfig | false)

    - **width** thumbnails' width [px] (number)

    - **height** thumbnails' height [px] (number)

    - **position**  thumbnails' container position [top, left, right, bottom] (string)

 - **loader**

    add loader for lazy load image (GalleryLoaderConfig | false)

    - **width** loader's width [any units] (string)

    - **height** loader's height [any units] (string)

    - **position** loader's position [center, topLeft, topRight, bottomLeft, bottomRight] (string)

 - **icon** loader's icon [source url] (string)


## Author

 **[Murhaf Sousli](http://murhafsousli.com)**

 - [github/murhafsousli](https://github.com/MurhafSousli)
 - [twitter/murhafsousli](https://twitter.com/MurhafSousli)

## Issues

If you identify any errors in this module, or have an idea for an improvement, please open an [issue](https://github.com/MurhafSousli/ng-gallery/issues). I am excited to see what the community thinks of this project, and I would love your input!

## License

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)