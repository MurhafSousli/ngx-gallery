import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, filter, map, switchMap, EMPTY } from 'rxjs';
import { ItemState } from '../components/templates/items.model';
import { GalleryRef } from '../services/gallery-ref';

interface ImageRegistry {
  state$: Observable<ItemState>;
  target: HTMLImageElement;
}

@Injectable()
export class ImgManager {

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly trigger$: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  private readonly images: Map<number, ImageRegistry> = new Map<number, ImageRegistry>();

  getActiveItem(): Observable<HTMLImageElement> {
    return this.trigger$.pipe(
      switchMap(() => {
        const img: ImageRegistry = this.images.get(this.galleryRef.currIndex());
        if (img) {
          return img.state$.pipe(
            filter((state: ItemState) => state !== 'loading'),
            map(() => img.target)
          )
        }
        return EMPTY;
      })
    );
  }

  addItem(index: number, payload: ImageRegistry): void {
    this.images.set(index, payload);
    this.trigger$.next();
  }

  deleteItem(index: number): void {
    if (this.images.has(index)) {
      this.images.delete(index);
      this.trigger$.next();
    }
  }
}
