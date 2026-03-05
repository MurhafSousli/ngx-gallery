import { NgModule } from '@angular/core';
import { Gallery } from './gallery';
import { GalleryItemDef, GalleryItemLoaderDef, GalleryItemErrorDef } from './directives/gallery-item-def';
import { GallerySlot } from './directives/gallery-slot';
import { GalleryAutoplay } from './autoplay/gallery-autoplay';
import { GalleryAutoplayUI } from './autoplay/gallery-autoplay-ui';
import { GalleryThumbs } from './thumbs/gallery-thumbs';
import { GalleryThumbClick } from './thumbs/gallery-thumb-click';
import { GalleryNav } from './nav/gallery-nav';
import { GalleryNavButton } from './nav/gallery-nav-button';
import { GalleryCounter } from './counter/gallery-counter';
import { GalleryImage } from './image/gallery-image';
import { GalleryAutoHeight } from './auto-height/auto-height';
import { GalleryDebug } from './debug/debug';

const GALLERY = [
  Gallery,
  GalleryAutoplay,
  GalleryAutoplayUI,
  GalleryItemDef,
  GalleryItemLoaderDef,
  GalleryItemErrorDef,
  GallerySlot,
  GalleryThumbs,
  GalleryNav,
  GalleryNavButton,
  GalleryCounter,
  GalleryItemDef,
  GalleryImage,
  GalleryAutoHeight,
  GalleryThumbClick,
  GalleryDebug
]

@NgModule({
  imports: GALLERY,
  exports: GALLERY
})
export class GalleryModule {
}
