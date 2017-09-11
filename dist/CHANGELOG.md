# Changelog

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