import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { NgOptimizedImage } from '@angular/common';
import { GalleryModule, GalleryThumbs } from 'ng-gallery';
import { getHDImages, getSlides } from '#.storybook/mocks/pixabay.service';
import { galleryArgTypes } from '#src/stories/gallery/helper';
import { fn } from 'storybook/test';

const meta = preview.meta({
  title: 'Documentations/Thumbnails',
  component: GalleryThumbs,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule, NgOptimizedImage],
    }),
  ],
  args: {
    position: 'bottom',
    itemSize: 120,
    thickness: 90,
    itemsPerView: 1,
    gap: 1,
    scrollBehavior: 'smooth',
    scrollDuration: 268,
    steps: 'page',
    loop: false,
    detach: false,
    floating: false,
    snapAlign: 'center',
    forceSnap: false,
    disableScroll: false,
    disableMouseScroll: false,
    activeIndexChange: fn() as any,
    anchorIndexChange: fn() as any,
  },
  argTypes: {
    ...galleryArgTypes,
    thickness: {
      control: { type: 'number', min: 0, step: 10 },
      table: {
        defaultValue: { summary: "90" },
      }
    },
    detach: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    },
    floating: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    },
    position: {
      control: 'radio',
      options: ['top', 'bottom', 'start', 'end'],
      table: {
        type: { summary: "'top' | 'bottom' | 'start' | 'end'" },
        defaultValue: { summary: "'bottom'" },
      }
    },
    orientation: {
      control: false,
      table: {
        type: { summary: "signal<'horizontal' | 'vertical'>" },
        defaultValue: { summary: null },
      }
    },
    resizeDebounceTime: {
      control: false,
      table: { disable: true }
    },
    scrollEase: {
      control: false,
      table: { disable: true }
    },
  },
});

export const Thumbnails = meta.story({
  loaders: [
    async () => ({ items: await getHDImages('Diamond') }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs [position]="position"
                        [gap]="gap"
                        [initialIndex]="initialIndex"
                        [thickness]="thickness"
                        [itemSize]="itemSize"
                        [itemsPerView]="itemsPerView"
                        [snapAlign]="snapAlign"
                        [forceSnap]="forceSnap"
                        [scrollBehavior]="scrollBehavior"
                        [scrollDuration]="scrollDuration"
                        [disableMouseScroll]="disableMouseScroll"
                        [disableScroll]="disableScroll"
                        [detach]="detach"
                        [loop]="loop"
                        [floating]="floating">
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    `,
  })
});


export const BasicThumbExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide" [style.background]="item.src">Slide {{ i + 1 }}</div>

        <gallery-thumbs floating itemSize="6" thickness="6" gap="6">
          <button *galleryItemDef="let item; index as i" class="dot-thumb"></button>
        </gallery-thumbs>
      </gallery>
    `,
    styles: [`
      gallery-thumbs {
        margin: 20px;
      }
    `],
  }),
});


export const ThumbDotsExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" style="gap: 10px" [items]="items" orientation="vertical" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <gallery-thumbs position="end" itemSize="10" thickness="10" gap="6">
          <button *galleryItemDef="let item" galleryThumbClick class="slide dot-thumb"></button>
        </gallery-thumbs>
      </gallery>
    `,
    styles: [`
      .dot-thumb {
        background: #4b5659;
        border-radius: 50%;
        opacity: 0.5; /* Slightly dimmer when inactive */
        transition: opacity 0.2s ease;
        overflow: hidden;
      }

      .g-slider-item.g-active-item .dot-thumb {
        color: Canvas;
        background: #b4e900;
        background: linear-gradient(0deg, #87de1d, #b4e900);
      }
    `]
  }),
});


export const ThumbPositionExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items" gap="32">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <gallery-thumbs position="start" itemSize="100">
          <button *galleryItemDef="let item; index as i"  galleryThumbClick>
            <div class="slide-thumb">{{ i + 1 }}</div>
          </button>
        </gallery-thumbs>
      </gallery>
    `,
    styles: [`
      .gallery-example {
        height: 300px !important;
      }
    `]
  }),
});

export const ThumbAutosizeExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({
      items: await getHDImages('flowers'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs itemSize="auto">
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    `,
  }),
});


export const ThumbDetachedExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getHDImages('rocket') }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        <gallery-thumbs detach>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [src]="item.thumb" [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
      </gallery>
    `,
  }),
});


export const ThumbNavExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getHDImages('rocket') }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="g-glass-theme" [items]="items">
        <img *galleryItemDef="let item" galleryImage [ngSrc]="item.src" [placeholder]="item.placeholder" fill [alt]="item.alt"/>

        <gallery-nav/>

        <gallery-thumbs>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage [ngSrc]="item.thumb" [placeholder]="item.placeholder"  fill [alt]="item.alt + '_thumb'"/>
          </button>
          <gallery-nav/>
        </gallery-thumbs>
      </gallery>
    `,
  }),
});
