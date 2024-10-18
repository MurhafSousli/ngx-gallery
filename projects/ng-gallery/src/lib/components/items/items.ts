import { Directive, ElementRef, inject, signal, WritableSignal } from '@angular/core';
import { ItemState } from 'ng-gallery';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Directive()
export abstract class SliderItem {
  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  /** A stream that indicates that the height was emitted after the image is loaded, used only for gallery image types */
  readonly state: WritableSignal<ItemState> = signal<ItemState>('loading');

  readonly state$: Observable<ItemState> = toObservable(this.state);

  /** A flag that indicates if the item is type of image, it can be a custom template by the user,
   * The img recognizer directive will set it to true*/
  isItemContainImage: boolean;
}
