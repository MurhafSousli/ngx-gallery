# Changelog

## 8.0.3

- fix(core): SSR error, closes [532](https://github.com/MurhafSousli/ngx-gallery/issues/532) in [#533](https://github.com/MurhafSousli/ngx-gallery/pull/533).

## 8.0.2

- feat(core): Add `loadingAttr` option to img and iframe elements, closes [#513](https://github.com/MurhafSousli/ngx-gallery/issues/513) in [093789b](https://github.com/MurhafSousli/ngx-gallery/pull/517/commits/093789b42cff86da957a09632c96705d42820085).
- fix(core): Videos are unplayable if type not specified, closes [#515](https://github.com/MurhafSousli/ngx-gallery/issues/515) in [11ba153](https://github.com/MurhafSousli/ngx-gallery/pull/516/commits/11ba153401c9c87f2983b99b047cf57849399117).

## 8.0.1

- fix(core): Gallery nav icons are not alignment properly, in [d4dca8b](https://github.com/MurhafSousli/ngx-gallery/pull/506/commits/d4dca8b4f68b4439471ed7f90ea4e23c27ff0c41).
- fox(core): Gallery dots is not horizontally centralized, in [f2d6910](https://github.com/MurhafSousli/ngx-gallery/pull/506/commits/f2d691083350adb64ea4b9c205e6fa3c31f6c0a3).
- fix(core): Fix lib's angular peerDependencies version to >=15 in [9ea5ea3](https://github.com/MurhafSousli/ngx-gallery/pull/506/commits/9ea5ea34f77e6329f9385c7db056cc637557b1bc).

## 8.0.0

- feat(core): Add `isActive` to custom gallery template context, in [0b3f8bf](https://github.com/MurhafSousli/ngx-gallery/pull/497/commits/0b3f8bf43e383a8ee3e53a3140e18b8bcf1c2d69).
- refactor(core): Fix the iframe error regarding the `allow` attribute.
- refactor(core): Change default navigation icons.
- refactor(core): Change default dots size.
- refactor(core): Change default counter styles.
- regret(core): Remove`itemLoaded` output.


## 8.0.0-beta.5

- regret(core): Remove`contentVisibilityAuto` option for version 8.
- ~~feat(core): Add `itemLoaded` output which emits after an item is loaded, for image items it emits after the image is loaded.~~
- feat(core): Add `autoHeight` option, when set to true, the gallery height will fit the active item height.
- feat(core): Add `autoItemSize` option, when set to true, the item will fit its image aspect ratio.
- feat(core): Add `autoThumbSize` option, when set to true, the thumb will fit its image aspect ratio.
- feat(core): Add `scrollBehavior` option.
- feat(core): Add `navScrollBehavior` option.
- feat(core): Add `thumbImageSize` option.
- feat(core): Add more options to the video item.
- feat(core): Add `configSnapshot` to `GalleryRef` class.
- feat(core): Add an optional parameter `behavior` to all `next(behavior?)`, `prev(behavior?)`, `set(index, behavior?)` functions, fallbacks to the `scrollBehavior` config.
- refactor(core): Only display custom item template container when `itemTemplate` is provided.

## 8.0.0-beta.4

- ~~feat(core): Add `contentVisibilityAuto` option to set the proper `content-visibility` and `contain-intrinsic-size` value on all gallery items/thumbs, in [73b20a9](https://github.com/MurhafSousli/ngx-gallery/pull/491/commits/73b20a9f996371e4a3ad52283b358263fd88546f).~~
- feat(core): Use native `loading` attribute on all `img` and `iframe` for native lazy loading.
- refactor(core): Fix loop issue when sliding with using the mouse, in [1572bea](https://github.com/MurhafSousli/ngx-gallery/pull/491/commits/1572beae2bc58792fac94243f4f3e20c0a61e549).
- refactor(core): Remove `lazy-image` directive.

## 8.0.0-beta.3

- fix(core): Set current index in sliding event does not work if slider size number has fraction, in [58e89fb](https://github.com/MurhafSousli/ngx-gallery/pull/491/commits/58e89fb3ed0e3837ca08a8111d567d992717ba7a).

## 8.0.0-beta.2

- fix(lightbox): close button is not displayed, in [506249b](https://github.com/MurhafSousli/ngx-gallery/pull/490/commits/506249bbc5877cd4ed54cf610a42b3a31abcb417).

## 8.0.0-beta.1

- feat(core): Use scrolling slider instead of transform method, allows touchpad scroll to slide the gallery as well as native sliding on mobile browser.
- feat(core): Add `resizeDebounceTime` option which is used to update the gallery on window resize event in [34a2723](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/34a27238eed6515fd748c43909c3fd0098b6a575) and [d867630](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/d86763042553a340b3a367c56c0a2549b690f751).
- feat(core): Add `slidingEase` and `slidingDuration` to customize sliding ease and duration in [4c1db03](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/4c1db03afb3a27896cd6dad5d08f91612bfa75a2).
- feat(core): Add `thumbDetached` to detach thumb slider, closes [#289](https://github.com/MurhafSousli/ngx-gallery/issues/289) in [1f47484](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/1f474847f999b2f1b0c820d50bf7336bfe6b8a3c).
- feat(core): Add `boxTemplate` to the gallery, closes [#487](https://github.com/MurhafSousli/ngx-gallery/issues/487) in [f46e33a](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/f46e33abf231ab86bd0b906e4b20e02e4bbf7bf4).
- feat(core): Add `slidingDisabled` and `thumbSlidingDisabled` options to enable/disable sliding on Mobile and Desktop using the touchpad. in [2451581](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/2451581cee382a17f3a95671cf3950910a5122d3).
- feat(core): Add `mouseSlidingDisabled` and `mouseThumbSlidingDisabled` options to enable/disable sliding on Desktop using the mouse. in [2451581](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/2451581cee382a17f3a95671cf3950910a5122d3).
- feat(core): Images not shown, when number of images get larger, closes [#484](https://github.com/MurhafSousli/ngx-gallery/issues/484) in [e819ebe](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/e819ebe3442f0cd37c1914bccf82a72d1fb2ce85).
- fix(core): `thumbView="contain"` Sliding thumbnails using gestures has an issue, closes [#417](https://github.com/MurhafSousli/ngx-gallery/issues/417) in [e819ebe](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/e819ebe3442f0cd37c1914bccf82a72d1fb2ce85).
- refactor(core): Remove `thumbMode` option from the gallery, in [18f71e3](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/18f71e3599f7af1a20f1482307a6370c0c8b6f05)
- refactor(core): Remove `tapClick` event and use native `click` event, in [3d960cc](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/3d960cca3b4954c999e10a86b0993d45d5c8462f).
- refactor(core): Remove `ng-content` from the gallery, in [63e3b6b](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/63e3b6b5110ee5eaab6452cf775c3488023bd7d9).
- refactor(core): Remove `panSensitivity` option, in [d1f8d34](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/d1f8d342a597d88afe66681b4ae099362273e03c).
- refactor(core): Remove `gestures` option, in [70cb00c](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/70cb00c5aa808ea33aba1b674666ab0f99501a9d).
- refactor(core): Remove `reserveGesturesAction` option, in [4b07fc7](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/4b07fc7ca4ef3d50e59accfe11593ee3a84ee706).
- refactor(core): Remove `zoomOut` option, in [19ba2b8](https://github.com/MurhafSousli/ngx-gallery/pull/488/commits/19ba2b8c8d4402085c0b400b3e4c0e014d2e5abb).

### Breaking changes:

HammerJs is only used for sliding using the mouse on desktop only, Sliding on mobile devices is now native scroll.

- `gestures` option has been deprecated.
- `thumbMode` option has been deprecated, sliding thumbnails is free.
- `zoomOut` has been deprecated.
- `reserveGesturesAction` has been deprecated.
- `panSensitivity` has been deprecated.
- Remove `ng-content` from the gallery, use `boxTemplate` option to add your custom layer.
- The default value for `loadingStrategy` option has changed to `LoadingStrategy.Preload`.
- Added new dependency `bezier-easing`.


## 7.1.2

- fix(core): Fix `reserveGestureAction` input and its default value in the lightbox, in [ba95036](https://github.com/MurhafSousli/ngx-gallery/pull/481/commits/ba950362b3fd5378d929ef14b56b1cb602382c9e).
- fix(core): Update gallery sliding position properly on window resize, in [f786d0a](https://github.com/MurhafSousli/ngx-gallery/pull/481/commits/f786d0a1ef44fd4a1c0a89126a57765131b5beba).
- fix(core): Slide bug with touch scroll with gallery thumbnails, related to [#465](https://github.com/MurhafSousli/ngx-gallery/issues/465) in [eb1e60c](https://github.com/MurhafSousli/ngx-gallery/pull/476/commits/eb1e60cd033d939485f4b2e4be30d95b49a3d7c5) in [a26d63f](https://github.com/MurhafSousli/ngx-gallery/pull/481/commits/a26d63fe2f04667eb6bd7e36aba960c066f95305).

## 7.1.1

- feat(core): New option `reserveGesturesAction` adds the ability to block the scrolling of page when sliding the gallery on mobile browser, closes [#477](https://github.com/MurhafSousli/ngx-gallery/issues/477) in [c105f21](https://github.com/MurhafSousli/ngx-gallery/pull/478/commits/c105f21fec747a71e849994d4e749f6e0c4b8b3f).
- fix(core): Slide bug with touch scroll, closes [#465](https://github.com/MurhafSousli/ngx-gallery/issues/465) in [eb1e60c](https://github.com/MurhafSousli/ngx-gallery/pull/476/commits/eb1e60cd033d939485f4b2e4be30d95b49a3d7c5).

## 7.1.0

- feat(core): Settings change shouldn't require restart, closes [#466](https://github.com/MurhafSousli/ngx-gallery/issues/466) in [ee71e52](https://github.com/MurhafSousli/ngx-gallery/pull/472/commits/ee71e528313f7780d82226aa1d849a6debc74ade).
- fix(core): Unable to drag thumbnails properly, closes [473](https://github.com/MurhafSousli/ngx-gallery/issues/473) in [8635701](https://github.com/MurhafSousli/ngx-gallery/pull/472/commits/86357014d140360cb110adb1d3115836c988e4c7).
- fix(core): Setting gestures to false breaks the gallery, closes [#464](https://github.com/MurhafSousli/ngx-gallery/issues/464), [#467](https://github.com/MurhafSousli/ngx-gallery/issues/467) and [#469](https://github.com/MurhafSousli/ngx-gallery/issues/469) in [a374603](https://github.com/MurhafSousli/ngx-gallery/pull/472/commits/a374603d60e82518c5b9de11309e68be365c94bc).
- fix(core): Set `alt` on gallery thumbnails and add `role="button"` to gallery nav, closes [#468](https://github.com/MurhafSousli/ngx-gallery/issues/468) in [57bebca](https://github.com/MurhafSousli/ngx-gallery/pull/471/commits/57bebca657b160e3973fd1f73daf6b655dd25fa2).
- fix(lightbox): Close icon in lightbox container being re-rendered all the time due to bug in template, closes [#307](https://github.com/MurhafSousli/ngx-gallery/issues/307) in [6bdc7a4](https://github.com/MurhafSousli/ngx-gallery/pull/472/commits/6bdc7a4add557a90043a665b73ea77f0d7d1979f).
- enhance(core, lightbox): Remove deprecated usage, in [23506eb](https://github.com/MurhafSousli/ngx-gallery/pull/472/commits/23506eb52ebd2c2e5f1d124e77dc8c8695a7eafc).

## 7.0.4

- fix(core): imageSize option when set to contain, in [3ecf94e](https://github.com/MurhafSousli/ngx-gallery/pull/462/commits/3ecf94e78d26378cc1330f2d432b59675526f63f).

## 7.0.3

- enhance(core): Use `img` element instead of div background image to display images, in [b6b5120](https://github.com/MurhafSousli/ngx-gallery/pull/460/commits/b6b512012a983699446d03481cb39f9739e1e67b).
- feat(core): Add alt property to `GalleryImage`, in [b6b5120](https://github.com/MurhafSousli/ngx-gallery/pull/460/commits/b6b512012a983699446d03481cb39f9739e1e67b).

## 7.0.2

- fix(core): Should not show sliding effect on initial state, closes [#458](https://github.com/MurhafSousli/ngx-gallery/issues/458) in [c810039](https://github.com/MurhafSousli/ngx-gallery/pull/459/commits/c8100396e711b76cf350d69e706e472f63658209).

## 7.0.1

- feat(core): Avoid triggering change detection while dragging in [8ed5948](https://github.com/MurhafSousli/ngx-gallery/pull/456/commits/8ed5948b7e6a12624bb398ce6a70536190563778).
- fix(core): Gallery thumbs vertical slider does not navigate when direction is up, closes [#454](https://github.com/MurhafSousli/ngx-gallery/issues/454) in [4eb7d2f](https://github.com/MurhafSousli/ngx-gallery/pull/455/commits/4eb7d2fda10f5b3f10a049fa955377b3afb392fd).

## 7.0.0

- Update to Angular 14 in [64d5620](https://github.com/MurhafSousli/ngx-gallery/pull/444/commits/64d5620c27ee7ea3caab8ad1cafc9eca7f0c7bf4).

## 6.0.1

- fix: Downgrade rxjs peerDependencies to v6 in [35f58fd](https://github.com/MurhafSousli/ngx-gallery/pull/429/commits/35f58fde087fa4f01916eb4dfd3ff6a10f9c62cc).

## 6.0.0

- Update to Angular 13, closes [#424](https://github.com/MurhafSousli/ngx-gallery/issues/322) in [#420](https://github.com/MurhafSousli/ngx-gallery/pull/420).

## 5.1.1

Adds a new option to the global config as well as an input called `thumbView` which is expects a value of either `default` or `contain`

- feat(core): Thumbnails should always use the available space, closes [#340](https://github.com/MurhafSousli/ngx-gallery/issues/340) in [ad3e514](https://github.com/MurhafSousli/ngx-gallery/pull/409/commits/ad3e5143e86c922d5d5927bb527f83e9a99612d8) and [5523b2e](https://github.com/MurhafSousli/ngx-gallery/pull/411/commits/5523b2e01c0a9263141854bb8b838d85ebf16cc9).
- feat(core): Add `stateSnapshot` property to `GalleryRef` to get an instant snapshot of the gallery state observable.
- fix(core): Video item displays the application instead of video, closes [#398](https://github.com/MurhafSousli/ngx-gallery/issues/398) in [f07c304](https://github.com/MurhafSousli/ngx-gallery/pull/409/commits/f07c3047a2426293bc34bcf57765642df0bcc35a).
- fix(core): Issue with gallery.remove() function, closes [#405](https://github.com/MurhafSousli/ngx-gallery/issues/405) in [f0fb1c3](https://github.com/MurhafSousli/ngx-gallery/pull/411#:~:text=removing%20an%20item-,f0fb1c3,-Merge%20state) and [6e080b4](https://github.com/MurhafSousli/ngx-gallery/pull/411/commits/6e080b43e03448ce329253918ae51c2da56eafae).

 > Special thanks to @NexGenUA for his PR

## 5.0.0

- Upgrade to Angular 10.
- feat(Lightbox): Add start/exit animation options, closes [#346](https://github.com/MurhafSousli/ngx-gallery/issues/346) in [6799a1c](https://github.com/MurhafSousli/ngx-gallery/pull/326/commits/6799a1c5e895dbc0753dfbb9f068d02807adf358).
- feat(video item): ability to disable video controls, in [f6b48b1](https://github.com/MurhafSousli/ngx-gallery/pull/326/commits/f6b48b13616d8999bc5c76bf44a6fa428191ce8b).
- feat(video item, youtube item): Ability to autoplay, closes [#304](https://github.com/MurhafSousli/ngx-gallery/issues/304) in [9caf8bf](https://github.com/MurhafSousli/ngx-gallery/pull/326/commits/9caf8bf7cbc8bf7cf580368cc5e3aefeb7d6daf5).
- feat(youtube item): Allow url parameters, closes [#302](https://github.com/MurhafSousli/ngx-gallery/issues/302) in [3760789](https://github.com/MurhafSousli/ngx-gallery/pull/326/commits/37607895da4266b2ed4c297609db99f710d92b00).
- fix(lightbox): Remove cdk styles import from the library.
- fix(video item): Cannot read property 'nativeElement' of undefined, closes [#353](https://github.com/MurhafSousli/ngx-gallery/issues/353) in [ff10363](https://github.com/MurhafSousli/ngx-gallery/pull/326/commits/ff10363e03090d8dfc88fd44674b3cb655399c58).
- fix(video item): Sanitized urls not working in <video>, closes [#346](https://github.com/MurhafSousli/ngx-gallery/issues/346) in [6799a1c](https://github.com/MurhafSousli/ngx-gallery/pull/326/commits/6799a1c5e895dbc0753dfbb9f068d02807adf358).

## 5.0.0-beta.1

- Upgrade to Angular 9.
- Combine all packages in one package.
- Remove import `HttpClientModule` from `GalleryModule`.

### Breaking changes

**Before:**

- The packages were published on `@ngx-gallery/core`, `@ngx-gallery/lightbox` and `@ngx-gallery/gallerize`.

**After:**

- All the packages are now combined in `ng-gallery` (NOTE: it is not `ngx-gallery` that is a different package).
- Import `GalleryMlodule` from `ng-gallery` and `LightboxModule` from `ng-gallery/lightbox`.
- The module `GallerizeModule` has been removed, the `[gallerize]` directive can still be used from the `LightboxModule`.

## 5.0.0-beta.0

- regret: Remove `mode=intermediate` option, closes [#309](https://github.com/MurhafSousli/ngx-gallery/issues/309) and [#297](https://github.com/MurhafSousli/ngx-gallery/issues/297) in [b1df18c](https://github.com/MurhafSousli/ngx-gallery/pull/311/commits/b1df18c6069ddabe02c0bee1e0653dd97692a96e).

### Breaking changes (There could be more breaking changes until version 5 is released which will make it compatible with Angular 9 and ivy)

- The `loadingMode` option has been removed from the gallery component's input and from the global options.

## 4.0.3

- fix(core): Fix universal error, closes [#262](https://github.com/MurhafSousli/ngx-gallery/issues/262) in [fc6c3f7](https://github.com/MurhafSousli/ngx-gallery/pull/282/commits/fc6c3f76730f90721bee99a2404a39310cccd0db).
- fix(core): clean up state subject in `<gallery-image>` component in [7796b50](https://github.com/MurhafSousli/ngx-gallery/pull/283/commits/7796b500b814bd43564e2284b2a937c9d0ec2229). 

## 4.0.2-beta.0

- feat(core): Add `thumbLoadingIcon` and `thumbLoadingError` to gallery config, in [3f8cdca](https://github.com/MurhafSousli/ngx-gallery/pull/241/commits/3f8cdca3fc84f0eef509a5c88ca3d2b5097966bf) and [f2cae92](https://github.com/MurhafSousli/ngx-gallery/pull/241/commits/f2cae9258eef599ca7821c1fb3a82179d4cf6fba).
- refactor(core): refactor the if/else logic in gallery image template, in [f7d6a22](https://github.com/MurhafSousli/ngx-gallery/pull/247/commits/f7d6a22e3cc20c0977554f8d249bef6aa2076fa5).

## 4.0.1

- **fix(core):** Encapsulate the cache interceptor to gallery images only, closes [#237](https://github.com/MurhafSousli/ngx-gallery/issues/237) in [4616eec](https://github.com/MurhafSousli/ngx-gallery/pull/239/commits/4616eeca239d46d49995adb73ea5cae849ae3de4).

## 4.0.0

- **feat(gallerize):** Scan `imageSrc` and `thumbSrc` attributes for image sources, in [4826d52](https://github.com/MurhafSousli/ngx-gallery/pull/235/commits/4826d52cbaa349a4004d63f39677b436e1fe6496).
- **enhance(core, lightbox, gallerize)**: Ability to lazy load the library.
- **enhance(core, lightbox):** Export `GALLERY_CONFIG` and `LIGHTBOX_CONFIG` tokens, in [56c704f](https://github.com/MurhafSousli/ngx-gallery/pull/235/commits/56c704f7db55d87143e949ebdfe115efca852ae9) and [9cab04b](https://github.com/MurhafSousli/ngx-gallery/pull/235/commits/9cab04ba97f916b16d9c0becd060ec0f127bdbc2).
- **fix(core, lightbox):** Add `Optional()` on injected config in gallery and lightbox services, closes [#234](https://github.com/MurhafSousli/ngx-gallery/issues/234) in [31624f9](https://github.com/MurhafSousli/ngx-gallery/pull/235/commits/31624f998ede9fef4335bb170b69b3d54d846d11).
- **refactor(core, lightbox):** Rename `forRoot(config?)` to `withConfig(config)`, in [8446c1a](https://github.com/MurhafSousli/ngx-gallery/pull/235/commits/8446c1ae1417210698a244be6d30be81fa1eed88).
- **refactor(lightbox):** Remove `providedIn: 'root'` from `Lightbox` service and provid it locally in its module, in [7ba8dd9](https://github.com/MurhafSousli/ngx-gallery/pull/235/commits/7ba8dd9c539559d036e57fb19f01f067367970e5).

### Breaking Changes

- The function `forRoot()` has been removed from `GalleryModule` and `LightboxModule`.
- Use `GalleryModule.withConfig({ ... })` to set config that applies on a module and its children (same applies on `LightboxModule`).
- To set global config across the entire app while still lazy load the library, provide the `GALLERY_CONFIG` token with the config value in the root module (same applies on `LightboxModule` with `LIGHTBOX_CONFIG`).

##### Example: Lazy load the library

In this example, will set global config without importing the library in the main bundle

- Provide `GALLERY_CONFIG` value in the root module

```ts
import { GALLERY_CONFIG } from '@ngx-gallery/core';

@NgModule({
  providers: [
    {
      provide: GALLERY_CONFIG, 
      useValue: {
        dots: true,
        imageSize: 'cover'
      }
    }
  ]
})
export class AppModule { }
```

- Import `GalleryModule` in a feature module

```ts
import { GalleryModule } from '@ngx-gallery/core';

@NgModule({
  imports: [
    GalleryModule
  ]
})
export class FeatureModule { }
```


## 4.0.0-beta.1

- **feat(core):** Add indeterminate option to the radial progress, in [df682c4](https://github.com/MurhafSousli/ngx-gallery/pull/233/commits/df682c4353f3795dd3f45f53dfa488b428fdb99f).
- **enhance(core):** Enhance thumbnails loading styles, in [f34f90a](https://github.com/MurhafSousli/ngx-gallery/pull/233/commits/f34f90a542aa437fa12b996dc77f6b7dd9fd819c).
- **fix(core):** Expose `[dotSize]`, `[dotsPosition]` and `[counterPosition]` options as inputs, in [946a856](https://github.com/MurhafSousli/ngx-gallery/pull/233/commits/946a85618acdc91692183f8f65765bbd137815cc).
- **fix(core):** Add `[loadingMode]` option to gallery images which accepts `determinate` or `indeterminate` , in [e8bdfb2](https://github.com/MurhafSousli/ngx-gallery/pull/233/commits/e8bdfb2a28d485e3d89290dda1edb595ae3efecf).
- **regression(core):** Fix undisplayed thumb image when a custom thumb template is used, in [34f2cc6](https://github.com/MurhafSousli/ngx-gallery/pull/233/commits/34f2cc6f7f5316a929a1efc2ceb6bde8d42d0551).
- **enhance(gallerize):** Run gallerize detector outside angular zone, makes opening the lightbox smoother, in [284925d](https://github.com/MurhafSousli/ngx-gallery/pull/233/commits/284925dd53a67e6a2a2d0b208a30623783db37bc) and [98901b9](https://github.com/MurhafSousli/ngx-gallery/pull/233/commits/98901b9136b4405a5d549fed08a36ec654279a26).

## 4.0.0-beta.0

- **update(core, lightbox, gallerize)**: Update peer dependencies, closes [#228](https://github.com/MurhafSousli/ngx-gallery/issues/228) in [bd8cdd3](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/bd8cdd302c55e285dc32a195e1d5f70b4312ac46).
- **feat(core):** Add `dotsPosition` option, closes [#211](https://github.com/MurhafSousli/ngx-gallery/issues/211) in [263d297](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/263d297ccc27692fc9fd9702f775dcf2b753d5de).
- **feat(core):** Add `dotsSize` option, in [e2e58b6](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/e2e58b62e4eb3cbcf5dd6f17417830bfc956f7eb).
- **feat(core):** Add `counterPosition` option, closes in [ce7a8ad](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/ce7a8ad62816b3ba344a22e6e459cfdb06ad18ab).
- **feat(core):** Use `HttpClient` to load and cache images in `[lazyImage]` directive, in [15c3e88](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/15c3e88d89434eb4860eabf3959a08ce746298e7).
- **feat(core):** Replace icon loader with a new radial progress component to report image loading progress while keeping the svg loading icon as an option, in [a1028e8](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/a1028e84ae08d1e93c599f19aab32873d3dfea41).
- **feat(core):** Add default error template to `<gallery-image>` in case if loading failed and add `loadingError` option for custom error template, in [cd258f5](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/cd258f5481a01eb8065fbbc931505ca71c421cd5) and [9dbf6c4](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/9dbf6c43e78f91dbb8b2ccbe21f4575a255cd55a).
- **enhance(core):** Enhance gallery dots styles, in [de8d22b](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/de8d22bd6296d9c6a138152223ce6bffb91b6d63).
- **enhance(core):** Allow gallery image to use unsafe URLs, closes [#218](https://github.com/MurhafSousli/ngx-gallery/issues/218) in [da1ace1](https://github.com/MurhafSousli/ngx-gallery/commit/da1ace1bd18dca476110da06627afbaaf9ec6a21).
- **enhance(core):** Use `animationFrameScheduler` for smoother sliding animation, in [38b0aa6](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/38b0aa67fd1b73cd69e85daab3d2b1ec69da2696).
- **fix(core):** Fix vertical scroll when using the gallery on touch devices, closes [#161](https://github.com/MurhafSousli/ngx-gallery/issues/161) in [a239c29](https://github.com/MurhafSousli/ngx-gallery/pull/230/commits/a239c294248e1028a79a9f99a60462131d3729fc). **(kudos goes to [@harm-less](https://github.com/harm-less))**
- **refactor(core):** `[lazyImage]` directive => `(loaded)` event no longer emits on error.

- **feat(lightbox):** Set the focus back on the previously focused element when the lightbox is closed, in [266eddb](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/266eddb5afdfe51bec533a857431ac8dca395a0f).
- **feat(lightbox):** Add `role`, `ariaLabel`, `ariaLabelledBy` and `ariaDescribedBy` attributes to the lightbox config `LightboxConfig`, in [a11d20d](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/a11d20d5d4fa1fd2dbe46c88a7aa26aab58b3d04), [5b550e7](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/5b550e7ccb6dc6515e5b6284c69e0448bf181c91).
- **enhance(lightbox):** Import overlay default styles from `@angular/cdk/overlay`, in [54c5d88](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/54c5d88b6a3639f2066fdb7e1e7f74d307f823b6).
- **enhance(lightbox):** Improve lightbox styles, in [4a52161](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/4a521618c8969edeb903b182de0b5ff235efe8cd).
- **enhance(lightbox):** Update lightbox overlay animation, closes [#224](https://github.com/MurhafSousli/ngx-gallery/issues/224) in [bec077f](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/bec077f2335d47e65d6423a8eeda782dfb485f05).
- **refactor(lightbox):** Use `disposeOnNavigation` instead of `Location` service, in [2262164](https://github.com/MurhafSousli/ngx-gallery/pull/231/commits/22621648db640905482a58480a54b693b7894272).

## 3.3.1

- **fix(core):** Remove duplicate delete execution in the destroyer function, in [ae541ca](https://github.com/MurhafSousli/ngx-gallery/pull/214/commits/ae541cafb22e6d5c976950eca2c7779a39693b77)
- **fix(core):** Check galleryRef exists before deleting, in [a2b32e2](https://github.com/MurhafSousli/ngx-gallery/pull/214/commits/a2b32e23ccffb77c50c1067f1abea2977c2f1286)
- **fix(core):** Remove duplicate config set, in [834c001](https://github.com/MurhafSousli/ngx-gallery/pull/213/commits/834c001a6cccee9955e6e9504e0a0d4cb5691d57)
- **fix(core):** Remove unnecessary `PortalModule` import from `GalleryModule`, in [46ef735](https://github.com/MurhafSousli/ngx-gallery/pull/215/commits/46ef735cf43aa51ae026a1898b02e67b5909e520)
- **refactor(core):** Use `povidedIn: 'root'` for the `Gallery` service, in [86eeaa7](https://github.com/MurhafSousli/ngx-gallery/pull/215/commits/86eeaa71203341a324c06a3555489a5c82b8eee9)
- **fix(core, lightbox):** Fix peer dependencies, in [236e540](https://github.com/MurhafSousli/ngx-gallery/pull/215/commits/236e540ceaaa906aec65af0fdb99f866b5374c8f).

## 3.3.0

- **refactor(core):** Use `Map<string, GalleryRef>` for instances holder type instead of untyped object in [ac08077](https://github.com/MurhafSousli/ngx-gallery/commit/ac080772d7d05dd395811848cef174f31eaa622d).
- **refactor(core):** Rename gallery `state$` and `config$` to `state` and `config` in [8de515b](https://github.com/MurhafSousli/ngx-gallery/commit/8de515be8a254125c0a551f25bc6ad790b1e0703) and [1e4fd06](https://github.com/MurhafSousli/ngx-gallery/commit/1e4fd069dad4dd8b8edfac8a1a9dd97db72b770e).
- **enhance(core):** Improve instance destroyer, gallery delete its instance on component destroy in [65f3358](https://github.com/MurhafSousli/ngx-gallery/commit/65f3358c035907039bf5d8199f9c14ec0e13de15).

### Breaking Changes

- Gallery can now be destroyed using its instance `galleryRef.destroy()`.
- In `Gallery` service the function `destroy()` has been removed.

## 3.2.0

- **feature(core):** Do not require importing global styles, closes [#197](https://github.com/MurhafSousli/ngx-gallery/issues/197) in [ea041a5](https://github.com/MurhafSousli/ngx-gallery/commit/ea041a5930e1ecf184028d9444b2d7fa3faf80ae).
- **feature(core):** Set the video type attribute on videos items, closes [#199](https://github.com/MurhafSousli/ngx-gallery/issues/199) in [06b3601](https://github.com/MurhafSousli/ngx-gallery/commit/06b3601d382bd51cfdae3470921bc6a74aff0af9).
- **feature(lightbox):** Add a lightbox directive, closes [#200](https://github.com/MurhafSousli/ngx-gallery/issues/200) in [ad2255b](https://github.com/MurhafSousli/ngx-gallery/commit/ad2255be4abf44fb692bf2f90e29e5737cdf9ef1).
- **fix(gallery):** fix LazyImage error event, closes [#205](https://github.com/MurhafSousli/ngx-gallery/issues/205) in [db231aa](https://github.com/MurhafSousli/ngx-gallery/commit/db231aa9b1b95da2971ed35b500edd3ae6c2f8e0)

### Breaking changes

- No need to manually import the styles anymore, they are imported internally with the components.
- Adding a video item with multiple url sources
  
  **Before:**

```ts
galleryRef.addVideo({
  src: ['MP4_URL', 'OGG_URL'],
  thumb: '(OPTIONAL)VIDEO_THUMBNAIL_URL',
  poster: '(OPTIONAL)VIDEO_POSTER_URL'
});
```

**After:**

```ts
galleryRef.addVideo({
  src: [
    { url: 'MP4_URL', type: 'video/mp4' },
    { url: 'OGG_URL', type: 'video/ogg' }
  ],
  thumb: '(OPTIONAL)VIDEO_THUMBNAIL_URL',
  poster: '(OPTIONAL)VIDEO_POSTER_URL'
});
```

## 3.1.2

- **fix(Lightbox):** Check if location is defined before subscribing, closes [#189](https://github.com/MurhafSousli/ngx-gallery/issues/189) in [169b813](https://github.com/MurhafSousli/ngx-gallery/pull/190/commits/169b813bf1483e963b930666cbae902b83f24ef4).

## 3.1.1

- **refactor(core):** Convert `imageSize` attribute to an input + add it to gallery config, this makes it possible to use it in lightbox mode, closes [#183](https://github.com/MurhafSousli/ngx-gallery/issues/183) in [1fc70c4](https://github.com/MurhafSousli/ngx-gallery/pull/184/commits/1fc70c4e12c06199e2ae4395f2d182b771561acd).
- **refactor(core):** Make `contain` as the default value for `imageSize` option, in [c7b3d39](https://github.com/MurhafSousli/ngx-gallery/pull/185/commits/c7b3d39bfc257500c133cc954c8e72bc1d2ed672).

## 3.1.0

- **feat(core):** Add auto-play option, in [e7fc03f](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/e7fc03f3abc8c516634231ff42750806d54d22f0).
- **feat(core):** Add support for error handling, closes [#154](https://github.com/MurhafSousli/ngx-gallery/issues/154) in [12f6e5e](https://github.com/MurhafSousli/ngx-gallery/pull/177/commits/12f6e5eddd5a9c7607778b5af1f77ef782327930).
- **refactor(core):** Remove opacity transition from `gallery-item`, in [a5b227e](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/a5b227eb72f9531d1884c07329b65b3c95fc0228).
- **refactor(core):** Use `imageSize` as an attribute, in [96c5c07](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/96c5c075bf41d765b7c4667abcb374c7a6f80f1a).
- **refactor(core):** Rename `(player)` output to `(playingChange)`, in [e209493](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/e2094937c4303fcc00f223155f2ad3d9cee29e17).
- **enhance(core):** Use default cursor when thumbnails are disabled, in [3582e95](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/3582e95b0f3458c451f76580adda12f72220affb).
- **fix(core):** fix vertical sliding direction, in [cba5d59](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/cba5d59074fbd37be9ee22abbef2f181364d2267).
- **fix(core):** fix thumbClick Output, in [a730116](https://github.com/MurhafSousli/ngx-gallery/pull/179/commits/a730116e5d2154910d9a16c6a464e58b59f2e7dd).

## 3.1.0-beta.0

#### Gallery

- **feat(core):** Add `thumbMode` option on thumbnails' slider (free scroll thumbnails), closes [#135](https://github.com/MurhafSousli/ngx-gallery/issues/135) in [8c6c99d](https://github.com/MurhafSousli/ngx-gallery/pull/159/commits/8c6c99db551a3ee31f5ab203babba6464acc7b83).
- **feat(core):** Add slide show player option, closes [#152](https://github.com/MurhafSousli/ngx-gallery/issues/152) in [a331f46](https://github.com/MurhafSousli/ngx-gallery/pull/165/commits/a331f466ad4a2834a8de7f908d5e63fe1d3d5b41).
- **enhance(core):** Ability to Import gallery styles individually [#144](https://github.com/MurhafSousli/ngx-gallery/issues/144) in [ebb6667](https://github.com/MurhafSousli/ngx-gallery/pull/162/commits/ebb6667955299df1f41690a4f4b587a9196bb4bf).
- **enhance(core):** Run HammerJS gestures outside angular zone [6fabf6c](https://github.com/MurhafSousli/ngx-gallery/commit/6fabf6ca2d421ea1cc478c1f6cd9a3b432ddd0da).
- **enhance(core):** Put SCSS and CSS each in its own folder, close [#153](https://github.com/MurhafSousli/ngx-gallery/issues/153) in [9783fc3](https://github.com/MurhafSousli/ngx-gallery/pull/170/commits/9783fc3a614e2258c9363d316ea042fce8c86913).
- **enhance(core):** Check if loadingSvg is defined before embedding it, close [#150](https://github.com/MurhafSousli/ngx-gallery/issues/150) in [5286640](https://github.com/MurhafSousli/ngx-gallery/pull/171/commits/5286640de7ac3a5326d2d2c3d352a085b6dbc308).
- **fix(core):** fix wrong `(thumbClick)` emitter.
- **fix(core):** fix gallery slider width which is set to 0 at the beginning, closes [#151](https://github.com/MurhafSousli/ngx-gallery/issues/151) in [c26a286](https://github.com/MurhafSousli/ngx-gallery/commit/c26a286551aef4f0313295822f5a381a31479bcb).
- **refactor(core):** Set `loop` option to **true** by default.
- **refactor(core):** Remove `fluid` option from gallery config and use it as an attribute instead. fixed in [ecf3f88](https://github.com/MurhafSousli/ngx-gallery/pull/169/commits/ecf3f88f59ee0c2eaae68ebf1b93e580fc869a3a).

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
- fix(core): Check if loadingIcon is defined in `<gallery-image>`, closes [#133](https://github.com/MurhafSousli/ngx-gallery/issues/133) and [#132](https://github.com/MurhafSousli/ngx-gallery/issues/132) in [24e6e26](https://github.com/MurhafSousli/ngx-gallery/commit/24e6e26fb2123b2db26e471f608efde86da553ff).

## 3.0.1

- feat(core): Allow using custom gallery item with custom template, closes [#125](https://github.com/MurhafSousli/ngx-gallery/issues/125) in [7e4c302](https://github.com/MurhafSousli/ngx-gallery/commit/7e4c3025276dd222f8592bc56694f5d278c8a6d6).

## 3.0.0

- fix(Lightbox): Close the lightbox when the active route is changed [#108](https://github.com/MurhafSousli/ngx-gallery/issues/108) in [d099abd](https://github.com/MurhafSousli/ngx-gallery/commit/d099abdf3b6a888c78dd3aa348c8b706ce43c8de).

## 3.0.0-beta.1

- refactor(core): add the `loop` input to gallery component, closes [#98](https://github.com/MurhafSousli/ngx-gallery/issues/98) in [727a4ca](https://github.com/MurhafSousli/ngx-gallery/commit/727a4ca7104db0ca62b03fa0fee66be0ee530fa0).

## 3.0.0-beta.0

### Features:

- Support Angular 6 and RxJS 6, closes [#91](https://github.com/MurhafSousli/ngx-gallery/issues/91).
- feat(core): Add helper functions to add different gallery items on `<gallery>` and `GalleryRef`.
- feat(core): Add `fluid` option to gallery for full width size.
- feat(core): Add `navIcon` option to gallery config to set a custom nav icon.
- feat(core): Add`loadingStrategy` option to gallery which accepts one of the following: 'preload', 'lazy' or 'default', closes [#87](https://github.com/MurhafSousli/ngx-gallery/issues/87).
- feat(core): Add `itemClick` output which emits when an item is clicked, closes [#106](https://github.com/MurhafSousli/ngx-gallery/pull/106/files).
- feat(core): Support custom template inside the default item templates, add `itemTemplate` and `thumbTemplate` to gallery options.
- feat(core): Multiple video sources support.
- feat(core): Pause Video and Youtube items when active item changes.
- feat(Gallerize): Add support to detect Gallery component.
- feat(Gallerize): Add support to detect DOM background images.

### Bug fixes:

- fix(core): Skip re-setting the config from `<gallery>` input in lightbox mode, closes [#104](https://github.com/MurhafSousli/ngx-gallery/issues/104).
- fix(core): Fix wrong thumbnail position when `[thumbPosition]` is changed.

### Improvements:

- refactor(core): Improve icon rendering, use svg element instead of background-image to render the nav icon in `<gallery-nav>`.
- refactor(core): Add `.g-active-item` on current item and `.g-active-thumb` on current thumbnail.
- refactor(core): Add `.g-image-loaded` class on `<gallery-image>` to indicates that the image has been loaded.
- refactor(core): Replace `loading` output with `loaded`, which emits the image path after it loads.
- refactor(core): Set an initial height of `500px`.
- refactor(core): Replace `ImageItem` `VideoItem` `YoutubeItem` and `IframeItem` constructor parameters with a single data parameter.
- refactor(core, Lightbox): Set `aria-label` on all buttons.
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

- refactor(core): rename `thumbSrc` to `thumb`.

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
