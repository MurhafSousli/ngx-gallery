import { Component, Signal, viewChild } from '@angular/core';
import { GalleryComponent, GalleryItem, GalleryItemDef, ImgRecognizer } from 'ng-gallery';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { toObservable } from '@angular/core/rxjs-interop';

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
    {
      src: 'https://loremflickr.com/200/200?random=1',
    },
    {
      src: 'https://loremflickr.com/200/200?random=2',
    },
    {
      src: 'https://loremflickr.com/200/200?random=3',
    }
  ];
  width: number = 500;
  height: number = 300;

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);
}

export async function afterTimeout(timeout: number): Promise<void> {
  // Use await with a setTimeout promise
  await new Promise<void>((resolve) => setTimeout(resolve, timeout));
}

export function getObservableFromContext<T = unknown>(signal: Signal<T>): Observable<T> {
  let obs;
  TestBed.runInInjectionContext(() => {
    obs = toObservable(signal);
  });
  return obs;
}
