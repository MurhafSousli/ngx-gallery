import {
  Directive,
  inject,
  signal,
  computed,
  input,
  Signal,
  Injector,
  ElementRef,
  InputSignal,
  WritableSignal
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { GalleryRef } from '../../services/gallery-ref';
import { ItemState } from '../../models/item.model';

@Directive()
export abstract class SliderItem {

  readonly injector: Injector = inject(Injector);

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  /** Item's index in the gallery */
  index: InputSignal<number> = input<number>();

  /** A stream that indicates that the height was emitted after the image is loaded, used only for gallery image types */
  readonly state: WritableSignal<ItemState> = signal<ItemState>('loading');

  readonly visible: Signal<boolean> = computed(() => {
    return !!this.galleryRef.visibleItems()[this.index()]
  });

  readonly state$: Observable<ItemState> = toObservable(this.state);

  /** A flag that indicates if the item is type of image, it can be a custom template by the user,
   * The img recognizer directive will set it to true*/
  isItemContainImage: boolean;
}
