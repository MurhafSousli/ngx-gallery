import { Component, Signal, viewChild } from '@angular/core';
import { GalleryComponent, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  standalone: true,
  imports: [GalleryComponent],
  template: `
    <gallery [items]="items"/>
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

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);
}
