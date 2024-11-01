import { inject, Injectable } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, Subject, EMPTY, filter, map, switchMap, merge } from 'rxjs';
import { GalleryRef } from '../services/gallery-ref';
import { ItemState } from '../models/item.model';

interface ImageRegistry {
  state$: Observable<ItemState>;
  target: HTMLImageElement;
}

@Injectable()
export class ImgManager {

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly trigger$: Subject<void> = new Subject<void>();

  private readonly currIndex$: Observable<number> = toObservable(this.galleryRef.currIndex);

  private readonly images: Map<number, ImageRegistry> = new Map<number, ImageRegistry>();

  getActiveItem(): Observable<HTMLImageElement> {
    return merge(this.currIndex$, this.trigger$).pipe(
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
