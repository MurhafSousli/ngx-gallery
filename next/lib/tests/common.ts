import { Component, signal, viewChild, Signal, WritableSignal } from '@angular/core';
import { Dir, Direction } from '@angular/cdk/bidi';
import { Gallery, GalleryItemData, GalleryModule, GallerySnapAlign, GalleryOrientation } from 'ng-gallery';
import { img1, img2, img3 } from './test-images';

@Component({
  imports: [GalleryModule, Dir],
  template: `
    <gallery [style.width.px]="width()"
             [style.height.px]="height()"
             [dir]="dir()"
             [items]="items()"
             [gap]="0"
             [itemSize]="itemSize()"
             [itemsPerView]="itemsPerView()"
             [scrollBehavior]="scrollBehavior()"
             [orientation]="orientation()"
             [snapAlign]="snapAlign()"
             [forceSnap]="forceSnap()"
             [disableMouseScroll]="disableMouseScroll()"
             [disableScroll]="disableScroll()"
             [loop]="loop()"
             [steps]="steps()">
      <div *galleryItemDef="let item">
        <img  galleryImage [src]="item.src"/>
      </div>
      @if (debug()) {
        <gallery-debug/>
      }
    </gallery>
  `
})
export class TestComponent {
  items: WritableSignal<GalleryItemData[]> = signal([
    { src: img1 },
    { src: img2 },
    { src: img3 },
    { src: img1 },
    { src: img2 }
  ]);
  width: WritableSignal<number> = signal(400);
  height: WritableSignal<number> = signal(300);
  dir: WritableSignal<Direction> = signal('ltr');
  orientation: WritableSignal<GalleryOrientation> = signal('horizontal');
  snapAlign: WritableSignal<GallerySnapAlign> = signal('center');
  disableMouseScroll: WritableSignal<boolean> = signal(false);
  itemSize: WritableSignal<number | 'auto'> = signal(null);
  itemsPerView: WritableSignal<number> = signal(1);
  forceSnap: WritableSignal<boolean> = signal(false);
  disableScroll: WritableSignal<boolean> = signal(false);
  loop: WritableSignal<boolean> = signal(false);
  debug: WritableSignal<boolean> = signal(false);
  scrollBehavior: WritableSignal<ScrollBehavior> = signal('smooth');
  steps: WritableSignal<number | 'page'> = signal(1);

  gallery: Signal<Gallery> = viewChild(Gallery);
}

export async function afterTimeout(timeout: number): Promise<void> {
  // Use await with a setTimeout promise
  await new Promise<void>((resolve) => setTimeout(resolve, timeout));
}

@Component({
  imports: [GalleryModule],
  template: `
    <gallery [style.width.px]="width()"
             [style.height.px]="height()"
             [items]="items"
             [gap]="0">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>

      <div *galleryItemLoaderDef>Loading...</div>
      <div *galleryItemErrorDef>Error</div>
    </gallery>
  `
})
export class TestItemStateComponent {
  items: GalleryItemData[] = [{ src: img1 }];
  width: WritableSignal<number> = signal(400);
  height: WritableSignal<number> = signal(300);
  gallery: Signal<Gallery> = viewChild(Gallery);
}
