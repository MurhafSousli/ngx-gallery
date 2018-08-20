# Changelog

## 3.1.0

- feat(Gallery): Add auto-play option, in [e7fc03f](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/e7fc03f3abc8c516634231ff42750806d54d22f0).
- feat(Gallery): Add support for error handling, closes [#154](https://github.com/MurhafSousli/ngx-gallery/issues/154) in [12f6e5e](https://github.com/MurhafSousli/ngx-gallery/pull/177/commits/12f6e5eddd5a9c7607778b5af1f77ef782327930).
- refactor(Gallery): Remove opacity transition from `gallery-item`, in [a5b227e](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/a5b227eb72f9531d1884c07329b65b3c95fc0228).
- refactor(Gallery): Use `imageSize` as an attribute, in [96c5c07](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/96c5c075bf41d765b7c4667abcb374c7a6f80f1a).
- refactor(Gallery): Rename `(player)` output to `(playingChange)`, in [e209493](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/e2094937c4303fcc00f223155f2ad3d9cee29e17).
- enhance(Gallery): Use default cursor when thumbnails are disabled, in [3582e95](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/3582e95b0f3458c451f76580adda12f72220affb).
- fix(Gallery): fix vertical sliding direction, in [cba5d59](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/cba5d59074fbd37be9ee22abbef2f181364d2267).
- fix(Gallery): fix thumbClick Output, in [a730116](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/a730116e5d2154910d9a16c6a464e58b59f2e7dd).

## 3.1.0-beta.0

#### Gallery

- feat(Gallery): Add `thumbMode` option on thumbnails' slider (free scroll thumbnails), closes [#135](https://github.com/MurhafSousli/ngx-gallery/issues/135) in [8c6c99d](https://github.com/MurhafSousli/ngx-gallery/pull/159/commits/8c6c99db551a3ee31f5ab203babba6464acc7b83).
- feat(Gallery): Add slide show player option, closes [#152](https://github.com/MurhafSousli/ngx-gallery/issues/152) in [a331f46](https://github.com/MurhafSousli/ngx-gallery/pull/165/commits/a331f466ad4a2834a8de7f908d5e63fe1d3d5b41).
- enhance(Gallery): Ability to Import gallery styles individually [#144](https://github.com/MurhafSousli/ngx-gallery/issues/144) in [ebb6667](https://github.com/MurhafSousli/ngx-gallery/pull/162/commits/ebb6667955299df1f41690a4f4b587a9196bb4bf).
- enhance(Gallery): Run HammerJS gestures outside angular zone [6fabf6c](https://github.com/MurhafSousli/ngx-gallery/commit/6fabf6ca2d421ea1cc478c1f6cd9a3b432ddd0da).
- enhance(Gallery): Put SCSS and CSS each in its own folder, close [#153](https://github.com/MurhafSousli/ngx-gallery/issues/153) in [9783fc3](https://github.com/MurhafSousli/ngx-gallery/pull/170/commits/9783fc3a614e2258c9363d316ea042fce8c86913).
- enhance(Gallery): Check if loadingSvg is defined before embedding it, close [#150](https://github.com/MurhafSousli/ngx-gallery/issues/150) in [5286640](https://github.com/MurhafSousli/ngx-gallery/pull/171/commits/5286640de7ac3a5326d2d2c3d352a085b6dbc308).
- fix(Gallery): fix wrong `(thumbClick)` emitter.
- fix(Gallery): fix gallery slider width which is set to 0 at the beginning, closes [#151](https://github.com/MurhafSousli/ngx-gallery/issues/151) in [c26a286](https://github.com/MurhafSousli/ngx-gallery/commit/c26a286551aef4f0313295822f5a381a31479bcb).
- refactor(Gallery): Set `loop` option to **true** by default.
- refactor(Gallery): Remove `fluid` option from gallery config and use it as an attribute instead. fixed in [ecf3f88](https://github.com/MurhafSousli/ngx-gallery/pull/169/commits/ecf3f88f59ee0c2eaae68ebf1b93e580fc869a3a).

#### Lightbox

- feat(Lightbox): Close the lightbox when the location is changed, closes [#108](https://github.com/MurhafSousli/ngx-gallery/issues/108) in [1543374](https://github.com/MurhafSousli/ngx-gallery/commit/1543374c99b8d539f4e5df381ba9a7a60f3ccfa7).


### Breaking changes:

#### Gallery

- Fluid option is now used as an attribute, not as an input. 

**Before:**

```html
<gallery [fluid]="true"></gallery>
```

**After:**

```html
<gallery fluid></gallery>
```

- Scss and css styles are put each in its own folder

**Before:**

```scss
@import '~@ngx-gallery/core/styles/gallery';
```

**After:**

```scss
@import '~@ngx-gallery/core/styles/scss/gallery';
// or for css
@import '~@ngx-gallery/core/styles/css/gallery';
```

## 3.0.2

- refactor(Lightbox): fix the close button small size on iphone browser.
- refactor(Lightbox): use `<i>` tag instead of `<button>` tag for the close button.
- fix(Gallery): Check if loadingIcon is defined in `<gallery-image>`, closes [#133](https://github.com/MurhafSousli/ngx-gallery/issues/133) and [#132](https://github.com/MurhafSousli/ngx-gallery/issues/132) in [24e6e26](https://github.com/MurhafSousli/ngx-gallery/commit/24e6e26fb2123b2db26e471f608efde86da553ff).

## 3.0.1

- feat(Gallery): Allow using custom gallery item with custom template, closes [#125](https://github.com/MurhafSousli/ngx-gallery/issues/125) in [7e4c302](https://github.com/MurhafSousli/ngx-gallery/commit/7e4c3025276dd222f8592bc56694f5d278c8a6d6).

## 3.0.0

- fix(Lightbox): Close the lightbox when the active route is changed [#108](https://github.com/MurhafSousli/ngx-gallery/issues/108) in [d099abd](https://github.com/MurhafSousli/ngx-gallery/commit/d099abdf3b6a888c78dd3aa348c8b706ce43c8de).

## 3.0.0-beta.1

- refactor(Gallery): add the `loop` input to gallery component, closes [#98](https://github.com/MurhafSousli/ngx-gallery/issues/98) in [727a4ca](https://github.com/MurhafSousli/ngx-gallery/commit/727a4ca7104db0ca62b03fa0fee66be0ee530fa0).

## 3.0.0-beta.0

### Features:

- Support Angular 6 and RxJS 6, closes [#91](https://github.com/MurhafSousli/ngx-gallery/issues/91).
- feat(Gallery): Add helper functions to add different gallery items on `<gallery>` and `GalleryRef`.
- feat(Gallery): Add `fluid` option to gallery for full width size.
- feat(Gallery): Add `navIcon` option to gallery config to set a custom nav icon.
- feat(Gallery): Add`loadingStrategy` option to gallery which accepts one of the following: 'preload', 'lazy' or 'default', closes [#87](https://github.com/MurhafSousli/ngx-gallery/issues/87).
- feat(Gallery): Add `itemClick` output which emits when an item is clicked, closes [#106](https://github.com/MurhafSousli/ngx-gallery/pull/106/files).
- feat(Gallery): Support custom template inside the default item templates, add `itemTemplate` and `thumbTemplate` to gallery options.
- feat(Gallery): Multiple video sources support.
- feat(Gallery): Pause Video and Youtube items when active item changes.
- feat(Gallerize): Add support to detect Gallery component.
- feat(Gallerize): Add support to detect DOM background images.

### Bug fixes:

- fix(Gallery): Skip re-setting the config from `<gallery>` input in lightbox mode, closes [#104](https://github.com/MurhafSousli/ngx-gallery/issues/104).
- fix(Gallery): Fix wrong thumbnail position when `[thumbPosition]` is changed.

### Improvements:

- refactor(Gallery): Improve icon rendering, use svg element instead of background-image to render the nav icon in `<gallery-nav>`.
- refactor(Gallery): Add `.g-active-item` on current item and `.g-active-thumb` on current thumbnail.
- refactor(Gallery): Add `.g-image-loaded` class on `<gallery-image>` to indicates that the image has been loaded.
- refactor(Gallery): Replace `loading` output with `loaded`, which emits the image path after it loads.
- refactor(Gallery): Set an initial height of `500px`.
- refactor(Gallery): Replace `ImageItem` `VideoItem` `YoutubeItem` and `IframeItem` constructor parameters with a single data parameter.
- refactor(Gallery, Lightbox): Set `aria-label` on all buttons.
- refactor(Gallerize): Remove `forClass` input and replace it for `selector` input.
- refactor(Gallerize): Remove `CommonModule` as it is not needed.
- refactor(Styles): Add a prefix to all classes used in the plugin.
- refactor(Styles): Add a transition for animate the opacity on current item and thumbnail.


### Breaking changes:

#### Gallery

- Before, To Create an image item, we used to pass the src and the thumbnail separate parameters.

```ts
const item: GalleryItem = new ImageItem('IMAGE_SRC', 'THUMB_SRC');
```

- After, The parameters are replaced with a single data object.

```ts
const item: GalleryItem = new ImageItem({ src: 'IMAGE_SRC', thumb: 'THUMB_SRC' });
```

#### Gallerize

- Before, Limiting auto-detection to a specific class used to be done as in the following code:
 
```html
<div class="grid" gallerize forClass="my-img-class">
  <img class="my-img-class" src="{{item.src}}">
</div>
```

- After, Now `forClass` input has been replaced with `selector` input.

```html
<div class="grid" gallerize selector=".my-img-class">
  <img class="my-img-class" src="{{imgSource1}}">
  <div class="my-img-class" [style.background]="'url(' + imgSource2 + ')'">
</div>
```

## 2.1.1

- refactor(Lightbox Style): Clean up.
- fix(HammerJS): Don't throw an error if hammer is not defined, just fallback to default.
- feat(VideoItem): add a 3rd parameter to `VideoItem` to set custom poster.

```ts
const viewItem = new VideoItem(video.src, video.thumb, video.poster);
```

- refactor(Gallery templates): rename `thumbSrc` to `thumb`.

### Breaking Changes

This won't effect the usage, but you might need to update 

`GalleryItem` data object has changed the name of the thumbnail source property from `thumbSrc` to `thumb`

This would only effect your app if you display the thumbnails list of your gallery items

Before

```html
<div class="grid">
  <div  class="grid-item"
        *ngFor="let item of galleryItems$ | async; let i = index"
        (click)="lightbox.open(i)">
    <img class="grid-image" [src]="item.data.thumbSrc">
  </div>
</div>
```

After

```html
<div class="grid">
  <div  class="grid-item"
        *ngFor="let item of galleryItems$ | async; let i = index"
        (click)="lightbox.open(i)">
    <img class="grid-image" [src]="item.data.thumb">
  </div>
</div>
```

## 2.0.4

- feat(GalleryConfig): add `loadingIcon` to GalleryConfig that accepts inline image.

## 2.0.3

- fix(Lightbox): Exit animation, closes [#73](https://github.com/MurhafSousli/ngx-gallery/issues/73).
- fix(Lightbox): close button is clicking behind, closes [#54](https://github.com/MurhafSousli/ngx-gallery/issues/54).
- refactor(Lightbox): Use the button tag instead of div for close button.

## 2.0.2

- enhancement(Gallerize): Use `MutationObserver` instead of `ngAfterContentChecked` to prevent infinite loop in default change detection strategy, closes [#70](https://github.com/MurhafSousli/ngx-gallery/issues/70).

## 2.0.1

- feat(GallerySlider): Rearrange slider on window resize, closes [#67](https://github.com/MurhafSousli/ngx-gallery/issues/67).

## 2.0.0

- fix(Swiping): Remove ngZone, closes [#64](https://github.com/MurhafSousli/ngx-gallery/issues/64).

## 2.0.0-beta.4

- feat(LightboxConfig): Adds fullscreen option to the lightbox, closes [#43](https://github.com/MurhafSousli/ngx-gallery/issues/43).

By default fullscreen is obtained on small screen (mobile) but now you can make it as default for all screens

```ts
GalleryModule.forRoot()
LightboxModule.forRoot({
  panelClass: 'fullscreen'
})
```

- feat(Lightbox): Ability to define lightbox config using `lightbox.open()` method

```ts
openLightbox() {
  this.lightbox.open(0, 'lightbox', {
    panelClass: 'fullscreen'
  });
}
```

## 2.0.0-beta.3

- Prevents native click event bubbling, closes [#57](https://github.com/MurhafSousli/ngx-gallery/issues/57)

## 2.0.0-beta

### Written from scratch

## 1.0.1

- fix double click on thumbnails and bullets, closes [#45](https://github.com/MurhafSousli/ng-gallery/issues/45).

## 1.0.0

**Fixes:**

- fix(GalleryNav): Hide navigation on panning.
- fix(GalleryPlayer): Wait until image is loaded before starting the timer.

 **Features:**
- feat(GalleryPlayer): Add progressbar color option.
- feat(GalleryPlayer): Add progressbar thickness option.
- feat(GalleryPlayer): Add position option `top` and `bottom`.
- feat(GalleryActions): Add gallery events
- feat(GalleryNav): Add `prevClass` and `nextClass` options to customize navigation icons
- feat(classNames) Add `className` option to container, thumbnails, bullets

**Performance Improvements:**

- refactor(GalleryThumbnail) improve performance

**Breaking Changes:**

- refactor(GalleryConfig): rename `config.thumbnails.space` to `config.thumbnails.margin`
- refactor(GalleryBullets): remove vertical positioning `right` and `left`

## 1.0.0-beta.8

- fix(keyboard listener in lightbox) closes [#24](https://github.com/MurhafSousli/ng-gallery/issues/24), [#33](https://github.com/MurhafSousli/ng-gallery/issues/33).
- refactor(Gallerize directive) Use MutationObserver instead of DOMSubtreeModified, closes [#26](https://github.com/MurhafSousli/ng-gallery/issues/26).
- fix(Universal support), closes [#9](https://github.com/MurhafSousli/ng-gallery/issues/9).
- fix Angular 5 warning, closes [#21](https://github.com/MurhafSousli/ng-gallery/issues/21).
- Improve gallery lightbox, closes [#20](https://github.com/MurhafSousli/ng-gallery/issues/20).
- Improve gallery lightbox slide animation, closes [#8](https://github.com/MurhafSousli/ng-gallery/issues/8).
- Use Angular CDK for the gallery lightbox.
- refactor(GalleryConfig)
- Remove image transition animation option because it was not implemented properly.

## 0.7.1

- General refactor
- fix(GalleryDirective) apply gallerize only once when content changes
- decode gallery nav icons and close button from base64 to decrease the size

## 0.7.0

- feat(LazyLoad) emit only last selected image.
- fix(GalleryImage) fade animation is working properly with image load.
- refactor(GalleryConfig)

## 0.6.3

- fix(GalleryModal) close button is hidden on mobile, closes [#9](https://github.com/MurhafSousli/ng-gallery/issues/9)
- fix umd bundle for systemjs, closes [#10](https://github.com/MurhafSousli/ng-gallery/issues/10)

## 0.6.2

- fix(gestures) remove navigation element on mobile which was blocking gestures events
- fix(gestures) enable/disable gestures using `config.gestures`
- refactor(config) interfaces

## 0.6.0 beta

- Add popup animation for gallery modal
- Remove incorrect slide animation
- Make gestures optional, closes [#2](https://github.com/MurhafSousli/ng-gallery/issues/2)
- Remove thumbnail vertical position (right and left) positions, closes [#3](https://github.com/MurhafSousli/ng-gallery/issues/3)

## 0.5.2 beta

- (feat) gestures support
- (refactor) gallery config 

## 0.5.0 beta

- Initial release 
