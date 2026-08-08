import {
  Component,
  input,
  inject,
  computed,
  viewChildren,
  contentChildren,
  booleanAttribute,
  Signal,
  InputSignalWithTransform
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { GalleryRef } from '../gallery-ref';
import { GalleryAlign, GalleryOptions, GalleryPosition } from '../models/config.model';
import { GallerySlot } from '../directives/gallery-slot';
import { GALLERY_OPTIONS } from '../models/gallery.token';
import { GalleryNavButton } from './gallery-nav-button';

@Component({
  host: {
    '[attr.dir]': 'dir.valueSignal()',
    '[attr.orientation]': 'galleryRef.orientation()',
  },
  selector: 'gallery-nav',
  template: `
    <ng-template #icon>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 5L15.5 12L8.5 19"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"/>
      </svg>
    </ng-template>

    <div [gallerySlot]="prevSlot()"
         [gallerySlotAlign]="prevAlignSlot()"
         [gallerySlotJustify]="prevJustifySlot()"
         [style.visibility]="prevVisible()">
      @if (!prevNavButton()) {
        <button galleryNavButton="prev" class="g-panel g-button">
          <ng-container *ngTemplateOutlet="icon"/>
        </button>
      } @else {
        <ng-content select="button[galleryNavButton='prev']"/>
      }
    </div>
    <div [gallerySlot]="nextSlot()"
         [gallerySlotAlign]="nextAlignSlot()"
         [gallerySlotJustify]="nextJustifySlot()"
         [style.visibility]="nextVisible()">
      @if (!nextNavButton()) {
        <button galleryNavButton="next" class="g-panel g-button">
          <ng-container *ngTemplateOutlet="icon"/>
        </button>
      } @else {
        <ng-content select="button[galleryNavButton='next']"/>
      }
    </div>
  `,
  styleUrl: 'gallery-nav.scss',
  imports: [NgTemplateOutlet, GalleryNavButton, GallerySlot]
})
export class GalleryNav {

  private readonly defaultConfig: GalleryOptions = inject(GALLERY_OPTIONS);

  protected readonly dir: Directionality = inject(Directionality);

  protected readonly galleryRef: GalleryRef = inject(GalleryRef);

  /* v8 ignore start */
  protected readonly navButtons: Signal<readonly GalleryNavButton[]> = contentChildren(GalleryNavButton);

  protected readonly nextNavButton: Signal<GalleryNavButton> = computed(() =>
    this.navButtons().find((btn: GalleryNavButton) => btn.type() === 'next')
  );

  protected readonly prevNavButton: Signal<GalleryNavButton> = computed(() =>
    this.navButtons().find((btn: GalleryNavButton) => btn.type() === 'prev')
  );

  /** @ignore */
  readonly buttons: Signal<readonly GallerySlot[]> = viewChildren(GallerySlot);
  /* v8 ignore stop */

  /**
   * Whether to keep the navigation buttons visible when they are disabled.
   */
  readonly showDisabledButtons: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultConfig.showNavDisabledButtons, {
    transform: booleanAttribute
  });

  /**
   * Whether to place the buttons on the outer edges of the gallery.
   */
  readonly outside: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultConfig.navOutside, {
    transform: booleanAttribute
  });

  protected readonly prevVisible: Signal<'visible' | 'hidden'> = computed(() => {
    return (this.showDisabledButtons() || this.galleryRef.loop() || this.galleryRef.hasPrev()) ? 'visible' : 'hidden';
  });

  protected readonly nextVisible: Signal<'visible' | 'hidden'> = computed(() => {
    return (this.showDisabledButtons() || this.galleryRef.loop() || this.galleryRef.hasNext()) ? 'visible' : 'hidden';
  });

  protected readonly prevSlot: Signal<GalleryPosition> = computed(() => {
    return prevSlotRules[this.galleryRef.orientation()][this.outside() ? 'outside' : 'inside'].area;
  });

  protected readonly prevAlignSlot: Signal<GalleryAlign> = computed(() => {
    return prevSlotRules[this.galleryRef.orientation()][this.outside() ? 'outside' : 'inside'].align;
  });

  protected readonly prevJustifySlot: Signal<GalleryAlign> = computed(() => {
    return prevSlotRules[this.galleryRef.orientation()][this.outside() ? 'outside' : 'inside'].justify;
  });

  protected readonly nextSlot: Signal<GalleryPosition> = computed(() => {
    return nextSlotRules[this.galleryRef.orientation()][this.outside() ? 'outside' : 'inside'].area;
  });

  protected readonly nextAlignSlot: Signal<GalleryAlign> = computed(() => {
    return nextSlotRules[this.galleryRef.orientation()][this.outside() ? 'outside' : 'inside'].align;
  });

  protected readonly nextJustifySlot: Signal<GalleryAlign> = computed(() => {
    return nextSlotRules[this.galleryRef.orientation()][this.outside() ? 'outside' : 'inside'].justify;
  });

}

interface SlotRules {
  area: GalleryPosition;
  justify: GalleryAlign;
  align: GalleryAlign;
}

const prevSlotRules: Record<string, Record<string, SlotRules>> = {
  horizontal: {
    outside: {
      area: 'start',
      justify: 'center',
      align: 'center'
    },
    inside: {
      area: 'center',
      justify: 'start',
      align: 'center'
    }
  },
  vertical: {
    outside: {
      area: 'top',
      justify: 'center',
      align: 'center'
    },
    inside: {
      area: 'center',
      justify: 'center',
      align: 'start'
    }
  }
};

const nextSlotRules: Record<string, Record<string, SlotRules>> = {
  horizontal: {
    outside: {
      area: 'end',
      justify: 'center',
      align: 'center'
    },
    inside: {
      area: 'center',
      justify: 'end',
      align: 'center'
    }
  },
  vertical: {
    outside: {
      area: 'bottom',
      justify: 'center',
      align: 'center'
    },
    inside: {
      area: 'center',
      justify: 'center',
      align: 'end'
    }
  }
};
