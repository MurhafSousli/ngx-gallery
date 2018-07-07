# Changelog

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

 **Added features:**
- feature(GalleryPlayer): Add progressbar color option.
- feature(GalleryPlayer): Add progressbar thickness option.
- feature(GalleryPlayer): Add position option `top` and `bottom`.
- feature(GalleryActions): Add gallery events
- feature(GalleryNav): Add `prevClass` and `nextClass` options to customize navigation icons
- feature(classNames) Add `className` option to container, thumbnails, bullets

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
