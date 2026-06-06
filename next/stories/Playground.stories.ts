import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular';
import { Gallery, GalleryModule, GalleryOptions, } from 'ng-gallery';
import { getHDImages } from '#.storybook/mocks/pixabay.service';

type GalleryArgs = GalleryOptions & {
  imageSize: 'cover' | 'contain';
  thumbImageSize: 'cover' | 'contain';
  thumbs: boolean;
  nav: boolean;
  bullets: boolean;
};

const meta = preview.type<{ args: GalleryArgs }>().meta({
  title: 'Documentations/Playground',
  component: Gallery,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
  ],
  args: {
    debug: true,
    thumbs: true,
    thumbPosition: 'bottom',
    loop: false,
    disableScroll: false,
    disableMouseScroll: false,
    itemSize: null,
    itemsPerView: 1,
    orientation: 'horizontal',
    snapAlign: 'center',
    forceSnap: false,
    scrollEase: { x1: 0.42, y1: 0, x2: 0.58, y2: 1 },
    scrollDuration: 468,
    resizeTransitionDuration: 468,
    thickness: 90,
    bullets: true,
    nav: true,
    imageSize: 'contain',
    thumbImageSize: 'cover',
    thumbsPerView: 5,
    thumbSize: 120,
    thumbSnapAlign: 'center',
    thumbForceSnap: false,
    thumbDisabled: false,
    disableThumbScroll: false,
    disableThumbMouseScroll: false,
    counterAlign: 'bottom',
    scrollBehavior: 'smooth',
    // thumbScrollBehavior: 'smooth',
    thumbFloating: false
  },
  argTypes: {
    items: {
      control: false,
      table: {
        defaultValue: { summary: "[]" },
      }
    },
    initialIndex: {
      control: false,
      table: {
        defaultValue: { summary: "0" },
      }
    },
    gap: {
      control: { type: 'number', min: 0, step: 1 },
      table: {
        defaultValue: { summary: "1" },
      }
    },
    itemsPerView: {
      control: { type: 'number', min: 1, step: 1 },
      table: {
        defaultValue: { summary: "1" },
      }
    },
    itemSize: {
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'null' },
      }
    },
    scrollBehavior: {
      control: 'radio',
      options: ['smooth', 'auto'],
      table: {
        defaultValue: { summary: "smooth" },
      }
    },
    resizeDebounceTime: {
      control: { type: 'number', min: 0, step: 50 },
      table: {
        defaultValue: { summary: "468" },
      }
    },
    scrollDuration: {
      control: { type: 'number', min: 0, step: 50 },
      table: {
        defaultValue: { summary: "468" },
      }
    },
    scrollEase: {
      control: false,
      table: {
        defaultValue: { summary: "{ x1: 0.42, y1: 0, x2: 0.58, y2: 1 }" },
      }
    },
    loop: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    },
    disableScroll: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    },
    disableMouseScroll: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    },
    snapAlign: {
      control: 'radio',
      options: ['center', 'start', 'end'],
      table: {
        type: { summary: "'center' | 'start' | 'end'" },
        defaultValue: { summary: "'center'" },
      }
    },
    forceSnap: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: "'horizontal'" },
      }
    },
    thumbPosition: {
      control: 'radio',
      options: ['top', 'bottom', 'start', 'end'],
      table: {
        type: { summary: "'top' | 'bottom' | 'start' | 'end'" },
        defaultValue: { summary: "'bottom'" },
      }
    },
    hasNext: {
      table: { disable: true }
    },
    hasPrev: {
      table: { disable: true }
    },
    renderedItems: {
      table: { disable: true }
    },
    itemsCount: {
      table: { disable: true }
    },
    next: {
      table: { disable: true }
    },
    prev: {
      table: { disable: true }
    },
    goTo: {
      table: { disable: true }
    },
    visibleEntries: {
      table: { disable: true }
    },
    isOneItemPerView: {
      table: { disable: true }
    },
    anchorIndex: {
      table: { disable: true }
    },
    activeIndex: {
      table: { disable: true }
    },
    hasVisibleItems: {
      table: { disable: true }
    },
    activeItem: {
      table: { disable: true }
    }
  },
});

export const Playground = meta.story({
  loaders: [
    async () => ({
      items: await getHDImages('Boat'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [style.--g-item-image-size]="imageSize"
             [items]="items"
             [itemSize]="itemSize"
             [itemsPerView]="itemsPerView"
             [snapAlign]="snapAlign"
             [forceSnap]="forceSnap"
             [resizeDebounceTime]="resizeDebounceTime"
             [loop]="loop"
             [orientation]="orientation"
             [scrollDuration]="scrollDuration"
             [scrollBehavior]="scrollBehavior"
             [disableScroll]="disableScroll"
             [disableMouseScroll]="disableMouseScroll">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"
             [alt]="item.alt"/>

        @if (nav) {
          <gallery-nav/>
        }

        @if (counter) {
          <gallery-counter [align]="counterAlign"/>
        }

        @if (thumbs) {
          <gallery-thumbs [style.--g-thumb-image-size]="thumbImageSize"
                          [snapAlign]="thumbSnapAlign"
                          [forceSnap]="thumbForceSnap"
                          [itemsPerView]="thumbsPerView"
                          [itemSize]="thumbSize"
                          [thickness]="thickness"
                          [disableScroll]="disableThumbScroll"
                          [disableMouseScroll]="disableThumbMouseScroll"
                          [position]="thumbPosition"
                          [floating]="thumbFloating">
            <button *galleryItemDef="let item" galleryThumbClick>
              <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
            </button>
          </gallery-thumbs>
        }

        @if (debug) {
          <gallery-debug/>
        }
      </gallery>
    `,
  })
});

export const BasicExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({
      items: await getHDImages('newyork'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    `,
  }),
});

export const AutoHeightExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({
      items: await getHDImages('newyork'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items" autoHeight>
        <gallery-nav/>
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    `,
  }),
});
