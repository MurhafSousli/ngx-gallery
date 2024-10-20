import { Component, Signal, viewChild } from '@angular/core';
import { GalleryComponent, GalleryItem, GalleryItemDef, ImageItem, ImgRecognizer } from 'ng-gallery';

@Component({
  standalone: true,
  imports: [GalleryComponent, GalleryItemDef, ImgRecognizer],
  template: `
    <gallery [items]="items" [style.width.px]="width" [style.height.px]="height">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItem[] = [
    new ImageItem({
      src: 'https://loremflickr.com/200/200?random=1',
    }),
    new ImageItem({
      src: 'https://loremflickr.com/200/200?random=2',
    }),
    new ImageItem({
      src: 'https://loremflickr.com/200/200?random=3',
    })
  ];
  width: number = 500;
  height: number = 300;

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);
}

export async function afterTimeout(timeout: number): Promise<void> {
  // Use await with a setTimeout promise
  await new Promise<void>((resolve) => setTimeout(resolve, timeout));
}
