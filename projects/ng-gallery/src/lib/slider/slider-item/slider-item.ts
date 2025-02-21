import {
  Component,
  inject,
  signal,
  computed,
  input,
  Signal,
  Injector,
  ElementRef,
  InputSignal,
  TemplateRef,
  AfterViewInit,
  WritableSignal,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { GalleryItemContext } from '../../directives/gallery-item-def.directive';
import { GalleryItemData, } from '../../templates/items.model';
import { GalleryRef } from '../../services/gallery-ref';
import { ItemState } from '../../models/item.model';

@Component({
  selector: 'slider-item',
  host: {
    '[attr.itemState]': 'state()',
    '[attr.galleryIndex]': 'index()',
    '[class.g-active-item]': 'active()',
    // TODO: need to make a linkedSignal to determine the visible flag visibleThumb from visibleItems with the index
    '[class.g-visible-item]': 'visible()'
  },
  template: `
    <ng-container [ngTemplateOutlet]="template()"
                  [ngTemplateOutletContext]="itemContext()"
                  [ngTemplateOutletInjector]="injector"/>
  `,
  styleUrl: './slider-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class SliderItem implements AfterViewInit {

  readonly injector: Injector = inject(Injector);

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  /** Item's index in the gallery */
  index: InputSignal<number> = input<number>();

  visible: InputSignal<boolean> = input<boolean>();

  // readonly visible: Signal<boolean> = computed(() => {
  //   return !!this.galleryRef.visibleItems()[this.index()]
  // });

  /** A stream that indicates that the height was emitted after the image is loaded, used only for gallery image types */
  state: WritableSignal<ItemState> = signal<ItemState>('loading');

  readonly state$: Observable<ItemState> = toObservable(this.state);
  /** The number of total slider-item */
  count: InputSignal<number> = input<number>();

  template: InputSignal<TemplateRef<GalleryItemContext<GalleryItemData>>> = input<TemplateRef<GalleryItemContext<GalleryItemData>>>();

  /** Gallery current index */
  currIndex: InputSignal<number> = input<number>();

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  data: InputSignal<GalleryItemData> = input<GalleryItemData>();

  active: Signal<boolean> = computed(() => this.index() === this.currIndex());

  itemContext: Signal<GalleryItemContext<GalleryItemData>> = computed(() => {
    return {
      $implicit: this.data(),
      index: this.index(),
      active: this.active(),
      count: this.count(),
      first: this.index() === 0,
      last: this.index() === this.count() - 1
    };
  });

  /** A flag that indicates if the item is type of image, it can be a custom template by the user,
   * The img recognizer directive will set it to true*/
  isItemContainImage: boolean;

  ngAfterViewInit(): void {
    // If item does not contain an image, then set the state to DONE
    if (!this.isItemContainImage) {
      this.state.set('success');
    }
  }
}

