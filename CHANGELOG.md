# Changelog

## 13.0.0-next.0

The library has been written from scratch.


- feat: Upgrade to Angular 21.
- feat: Migrate to Vitest testing environment.
- feat: Remove `zone.js` dependency.
- feat: Remove `hammerjs` dependency.
- feat: `gallerySlot` attribute directive for static custom templates.
- feat: `*galleryItemDef` structural directive to define main and thumb item templates.
- feat: `*galleryItemLoaderDef` structural directive to define main and thumb item loader templates.
- feat: `*galleryItemErrorDef` structural directive to define main and thumb item error templates.
- feat: `GalleryNav` component can be used on thumbnails.
- feat: `GalleryNavButton` allows custom navigation buttons `GalleryNav`.
- feat: New layout configuration such as `itemsPerView="3"`, `itemSize="auto"` and `itemSize="200"`.
- feat: Navigation has new parameter `steps` in next and prev methods, e.g. `gallery.next({ steps: 2 })`.
- feat: Add SASS function to customize the gallery CSS variables `ng-gallery-overrides()`.
- feat: Add SASS function to customize the lightbox CSS variables `ng-lightbox-overrides()`.
- feat: Add `initialIndex` input to set the initial gallery index.
- feat: Add `snapAlign` input to set the items' alignment in the viewport.
- feat: Add `liveIndex` signal to Gallery API.
- feat: Add `steps` option to `next()` and `prev()` methods, extends navigation feature.
- feat: (A11Y) Accessibility support using `provideGalleryA11yOptions()`

### Changelog:

There is no migration guide, please check the docs for more info.

- `GalleryRef` service has been removed.
- `GalleryBullets` component has been removed, use `GalleryThumbs` instead.
- `itemWidth` and `itemHeight` inputs have been removed, use `itemSize` and `thickness` instead.
- `centralized` has been renamed to `forceSnap` and `thumbCentralized` to `thumbForceSnap`.
- `gallery.currIndex` has been renamed to `activeIndex`.
- `autosize` has been replaced with `itemSize="auto"`.

## 12.0.0-beta.5

- feat: Add `provideGalleryOptions` and `provideLightboxOptions` to set global options.
- refactor: Use `useFactory` function to set the default options for `GALLERY_CONFIG` and `LIGHTBOX_CONFIG` token.
- Add vimeo support in [#575](https://github.com/MurhafSousli/ngx-gallery/pull/575).

## 12.0.0-beta.4

> See the [storybook documentation](https://ngx-gallery-next.netlify.app/)

- feat: Add RTL support, closes [#540](https://github.com/MurhafSousli/ngx-gallery/issues/540).
- All boolean inputs of `<gallery>` components can be used as string attributes
  - e.g. `<gallery autoHeight>`, `<gallery autoHeight="true">` and `<gallery [autoHeight]="true">` sets the option's value to true.
  - e.g. `<gallery autoHeight="false">` and `<gallery [autoHeight]="false">` sets the option's value to false.
- All number inputs of `<gallery>` components can be used as string attributes
  - e.g. `<gallery playerInterval="2000">` and `<gallery [playerInterval]="2000">` sets the option's value to 2000

**Improved performance**

- refactor: Replace the scroll event with intersection observer to detect the active item while scrolling.

**ItemAutoSize, ThumbAutoSize features**

- enhance: Toggling `itemAutoSize` option is now reactive.
- fix: `[thumbAutosize]` causes random invalid starting thumbnail scroller position when scrolling possible, closes [#521](https://github.com/MurhafSousli/ngx-gallery/issues/521)
- fix: `[ItemAutosize]` in website/safari browsers do not work as expected, closes [#543](https://github.com/MurhafSousli/ngx-gallery/issues/543)

**AutoHeight feature**

- enhance: Auto-height feature is not more precise and works well with or without height transition
- fix: Auto-height issue when screen size changes

**Autoplay feature**

- fix: `autoplay` resets the timer after navigated.
- fix: `autoplay` only start the timer after the image is loaded.

**Bullets (previously named 'Dots')**

- feat: `disableBullets` disable bullets' clicks

**Custom template**

- feature: Introduce `galleryImage` directive within `galleryItemDef`, to allow recognizing the img element in your custom item template.

### Breaking changes

#### Options renamed:

**Core**
- `slidingDirection` → `orientation`
- `slidingEase` → `scrollEase`
- `slidingDuration` → `scrollDuration`
- `slidingDisabled` → `disableScroll`
- `mouseSlidingDisabled` → `disableMouseScroll`
- `autoPlay` → `autoplay`

**Thumbs**
- `thumb` → `thumbs`
- `thumbMode` → `thumbCentralized`
- `thumbMode` → `thumbCentralized`
- `thumbDetached` → `detachThumbs`
- `thumbSlidingDisabled` → `disableThumbMouseScroll`
- `thumbMouseSlidingDisabled` → `disableThumbMouseScroll`

**Bullets**
- `dots` → `bullets`
- `dotSize` → `bulletSize`
- `dotPosition` → `bulletPosition`

#### Input removed (no longer exist)

- `navScrollBehavior` the option is now removed, use `scrollBehavior` instead.


***

## 11.0.0

- feat: Add `galleryThumbDef`, `galleryImageDef`, `galleryItemDef`, `galleryBoxDef` to set custom templates, closes [#487](https://github.com/MurhafSousli/ngx-gallery/issues/487).
- feat: Add `imageTemplate` property to `GalleryConfig`.
- feat: Add `args` property in case need to attach extra data with the gallery item.
- enhance: Improve overall typings.

### Breaking changes

- Usage of setting custom template has been changed! see the [wiki page](https://github.com/MurhafSousli/ngx-gallery/wiki) for more info.
- The inputs `itemTemplate`, `thumbTemplate` and `boxTemplate` has been removed from the gallery component, however they still exist in `GalleryConfig`


## 10.0.0

- feat: Migrate to standalone components.

### Breaking Changes

- Both `GalleryModule` and `LightboxModule` no longer provide the `withConfig()` method.

## 9.0.1

- Remove `bezier-easing` package from dependencies, closes [#525](https://github.com/MurhafSousli/ngx-gallery/issues/525) and [#551](https://github.com/MurhafSousli/ngx-gallery/issues/551) in [6c47ecb](https://github.com/MurhafSousli/ngx-gallery/pull/556/commits/6c47ecb59185909186f10a9860d1a98b326ad2d0).

## 9.0.0

- Upgrade to Angular 16
