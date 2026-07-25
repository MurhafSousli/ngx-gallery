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
import { GalleryItemState } from '../models/config.model';
import { GalleryItemData } from '../models/item.model';
import { GalleryItemContext } from '../directives/gallery-item-def';
import { GalleryA11yOptions } from '../a11y/a11y.model';
import { GALLERY_A11Y_OPTIONS } from '../a11y/a11y.token';

@Component({
  selector: 'li[sliderItem]',
  host: {
    '[attr.role]': '!isThumb() && a11y?.itemRole || null',
    '[attr.aria-roledescription]': '!isThumb() && a11y?.itemRoleDescription || null',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-current]': 'ariaCurrent()',
    '[attr.inert]': '!visible() ? "" : null',
    '[attr.state]': 'state()',
    '[attr.galleryIndex]': 'index()',
    '[class.g-slider-item]': 'true',
    '[class.g-active-item]': 'active()',
    '[class.g-anchor-item]': 'anchor()',
    '[class.g-visible-item]': 'visible()'
  },
  template: `
    <ng-container [ngTemplateOutlet]="template()"
                  [ngTemplateOutletContext]="itemContext()"
                  [ngTemplateOutletInjector]="injector"/>

    @if (state() === 'loading' && loaderTemplate()) {
      <div class="g-item-loader">
        <ng-container [ngTemplateOutlet]="loaderTemplate()"/>
      </div>
    }

    @if (state() === 'error' && errorTemplate()) {
      <div class="g-item-error">
        <ng-container [ngTemplateOutlet]="errorTemplate()!"/>
      </div>
    }
  `,
  styleUrl: 'slider-item.scss',
  imports: [NgTemplateOutlet]
})
export class SliderItem implements AfterViewInit {

  readonly injector: Injector = inject(Injector);

  protected readonly a11y: GalleryA11yOptions = inject(GALLERY_A11Y_OPTIONS);

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  /** Item's index in the gallery */
  readonly index: InputSignal<number> = input<number>();

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  readonly data: InputSignal<GalleryItemData> = input<GalleryItemData>();

  /** The number of total items */
  readonly count: InputSignal<number> = input<number>();

  readonly template: InputSignal<TemplateRef<GalleryItemContext<GalleryItemData>>> = input<TemplateRef<GalleryItemContext<GalleryItemData>>>();

  readonly loaderTemplate: InputSignal<TemplateRef<GalleryItemContext<GalleryItemData>>> = input<TemplateRef<GalleryItemContext<GalleryItemData>>>();

  readonly errorTemplate: InputSignal<TemplateRef<GalleryItemContext<GalleryItemData>>> = input<TemplateRef<GalleryItemContext<GalleryItemData>>>();

  readonly active: Signal<boolean> = input<boolean>();

  readonly anchor: Signal<boolean> = input<boolean>();

  readonly visible: Signal<boolean> = input<boolean>();

  readonly isThumb: Signal<boolean> = input<boolean>();

  readonly itemContext: Signal<GalleryItemContext<GalleryItemData>> = computed(() => {
    return {
      $implicit: this.data(),
      index: this.index(),
      count: this.count(),
      state: this.state(),
      active: this.active(),
      anchor: this.anchor(),
      visible: this.visible(),
      first: this.index() === 0,
      last: this.index() === this.count() - 1
    };
  });

  /** A signal that indicates that current state if it's 'ready', 'loading' or 'error' */
  readonly state: WritableSignal<GalleryItemState> = signal<GalleryItemState>('loading');

  protected readonly ariaLabel: Signal<string | null> = computed(() => {
    return (!this.isThumb() && this.a11y?.itemLabel(this.index(), this.count())) || null;
  });

  protected readonly ariaCurrent: Signal<string | null> = computed(() => {
    return !this.isThumb() && this.a11y && this.active() ? "true" : null
  });

  /** A flag that indicates if the item's' type is an image, it can be a custom template by the user,
   * The img recognizer directive will set it to true*/
  containsImage: boolean;

  ngAfterViewInit(): void {
    // If the item does not contain an image, then set the state to DONE
    if (!this.containsImage) {
      this.state.set('ready');
    }
  }
}

