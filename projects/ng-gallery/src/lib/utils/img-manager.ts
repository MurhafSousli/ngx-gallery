import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, filter, map, switchMap, EMPTY } from 'rxjs';
import { GalleryState } from '../models/gallery.model';
import { ItemState } from '../components/templates/items.model';

interface ImageRegistry {
  state: Observable<ItemState>;
  target: HTMLImageElement;
}

@Injectable()
export class ImgManager {

  private readonly trigger$: BehaviorSubject<void> = new BehaviorSubject<void>(null);

  private readonly images: Map<number, ImageRegistry> = new Map<number, ImageRegistry>();

  getActiveItem(state$: Observable<GalleryState>): Observable<HTMLImageElement> {
    return this.trigger$.pipe(
      switchMap(() => state$.pipe(
        switchMap((state: GalleryState) => {
          const img: ImageRegistry = this.images.get(state.currIndex);
          if (img) {
            return img.state.pipe(
              filter((state: ItemState) => state !== 'loading'),
              map(() => img.target)
            )
          }
          return EMPTY;
        })
      ))
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
