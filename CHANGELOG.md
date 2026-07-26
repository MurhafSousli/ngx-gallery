# Changelog

## 13.0.0-next.1

- Upgrade to Angular 22.
- Update storybook with modern fast build system (angular vite).
- Update @compodoc to v2

## 13.0.0-next.0

The library has been rewritten from scratch to support modern, zoneless Angular 21 architecture and high-performance native web APIs.

### New features

- **Modern Stack Upgrade:** Migrated to Angular 21 and replaced the testing environment with Vitest.
- **Performance Boost:** Completely removed dependencies on `zone.js`, `hammerjs` (closes [#449](https://github.com/MurhafSousli/ngx-gallery/issues/449)), and `@angular/animations`.
- **Template Flexibility:** 
  - Added `gallerySlot` attribute directive for static custom templates.
  - Added `*galleryItemDef` structural directive to define main and thumbnail item templates.
  - Added `*galleryItemLoaderDef` and `*galleryItemErrorDef` structural directives for custom loading/error states (closes [#626](https://github.com/MurhafSousli/ngx-gallery/issues/626)).
- **Navigation & Layout Enhancements:**
  - `GalleryNav` component can now be used directly on thumbnails (closes [#448](https://github.com/MurhafSousli/ngx-gallery/issues/448), [#591](https://github.com/MurhafSousli/ngx-gallery/issues/591)).
  - Added `GalleryNavButton` for custom navigation buttons within `GalleryNav`.
  - Introduced new layout configurations: `itemsPerView="3"`, `itemSize="auto"`, and `itemSize="200"`.
  - Added a `steps` option to `next()` and `prev()` navigation methods (closes [#281](https://github.com/MurhafSousli/ngx-gallery/issues/281)).
  - Added `initialIndex` input to set the starting gallery index (closes [#638](https://github.com/MurhafSousli/ngx-gallery/issues/638)).
  - Added `snapAlign` input to define item alignment in the viewport.
- **Reactivity & Events:** Added `activeIndexChange` and `anchorIndexChange` outputs.
- **Styling:** Added SASS functions `ng-gallery-overrides()` and `ng-lightbox-overrides()` to easily customize gallery and lightbox CSS variables.
- **Accessibility (A11Y):** Added native accessibility support via `provideGalleryA11yOptions()`.
- **Core Optimization:** 
  - Ability to use `NgOptimizedImage` for lazy loading images and thumbnails (closes [#546](https://github.com/MurhafSousli/ngx-gallery/issues/546)).
  - Lightbox now uses the native HTML `<dialog>` element instead of `@angular/cdk/dialog` (closes [#596](https://github.com/MurhafSousli/ngx-gallery/issues/596)).
  - Added native gesture support for sliding one image at a time (closes [#616](https://github.com/MurhafSousli/ngx-gallery/issues/616)).
  - Enabled hooking click events directly on gallery images (closes [#603](https://github.com/MurhafSousli/ngx-gallery/issues/603)).

### Bug fixes

- Replaced `@angular/animations` with native web animations (closes [#639](https://github.com/MurhafSousli/ngx-gallery/issues/639), [#637](https://github.com/MurhafSousli/ngx-gallery/issues/637)).
- Fixed Lightbox focus trap and restored focus to the previously active element upon closing (closes [#642](https://github.com/MurhafSousli/ngx-gallery/issues/642)).
- Migrated Lightbox close button to a native `<button>` element (closes [#643](https://github.com/MurhafSousli/ngx-gallery/issues/643)).
- Resolved issue where the wrong image opened in the lightbox when using a custom `imageTemplate` (closes [#606](https://github.com/MurhafSousli/ngx-gallery/issues/606)).
- Allowed arbitrary attributes (including `crossorigin`) to be set on images (closes [#613](https://github.com/MurhafSousli/ngx-gallery/issues/613)).
- Fixed layout issues occurring in RTL mode (closes [#631](https://github.com/MurhafSousli/ngx-gallery/issues/631)).
- Resolved SSR compatibility issues inherited from v12 (closes [#634](https://github.com/MurhafSousli/ngx-gallery/issues/634)).

### Breaking changes

> ⚠️ **Note:** There is no migration guide. Please consult the updated documentation for full integration details.

- `GalleryRef` service has been removed.
- `GalleryBullets` component has been removed (use `GalleryThumbs` instead).
- `itemWidth` and `itemHeight` inputs have been removed (use `itemSize` and `thickness` instead).
- `centralized` renamed to `forceSnap`.
- `thumbCentralized` renamed to `thumbForceSnap`.
- `gallery.currIndex` renamed to `activeIndex`.
- `autosize` removed (replaced by `itemSize="auto"`).


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
