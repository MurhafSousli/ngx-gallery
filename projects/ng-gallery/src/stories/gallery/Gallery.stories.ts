import preview from '#.storybook/preview';
import { fn } from 'storybook/test';
import { moduleMetadata } from '@storybook/angular';
import { NgOptimizedImage } from '@angular/common';
import { Gallery, GalleryModule } from 'ng-gallery';
import { getHDImages, getSlides } from '#.storybook/mocks/pixabay.service';
import { galleryArgTypes } from '#src/stories/gallery/helper';

const meta = preview.meta({
  title: 'Documentations/Gallery',
  component: Gallery,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule, NgOptimizedImage],
    }),
  ],
  args: {
    loop: false,
    snapAlign: 'center',
    forceSnap: false,
    disableScroll: false,
    disableMouseScroll: false,
    itemsPerView: 1,
    gap: 1,
    steps: 1,
    itemSize: null,
    orientation: 'horizontal',
    scrollBehavior: 'smooth',
    scrollDuration: 468,
    resizeDebounceTime: 468,
    scrollEase: { x1: 0.42, y1: 0, x2: 0.58, y2: 1 },
    activeIndexChange: fn() as any,
    anchorIndexChange: fn() as any,
  },
  argTypes: {
    items: {
      control: false,
      table: {
        defaultValue: { summary: "[]" },
      }
    },
    ...galleryArgTypes
  },
});

export const GalleryExample = meta.story({
  name: 'Gallery',
  loaders: [
    async () => ({ items: await getHDImages('Boat'), }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items"
               [loop]="loop"
               [gap]="gap"
               [itemsPerView]="itemsPerView"
               [itemSize]="itemSize"
               [steps]="steps"
               [snapAlign]="snapAlign"
               [forceSnap]="forceSnap"
               [resizeDebounceTime]="resizeDebounceTime"
               [orientation]="orientation"
               [scrollDuration]="scrollDuration"
               [scrollBehavior]="scrollBehavior"
               [disableScroll]="disableScroll"
               [disableMouseScroll]="disableMouseScroll"
               (activeIndexChange)="activeIndexChange($event)"
               (anchorIndexChange)="anchorIndexChange($event)">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"
             [alt]="item.alt"/>

        <gallery-nav/>
      </gallery>
    `,
  })
});


export const BasicExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `,
  }),
});


export const GapExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="1.4" forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `,
  }),
});

export const MultipleExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items" gap="32" itemsPerView="3">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `,
  }),
});


export const AutoHeightExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getHDImages('newyork') }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items" autoHeight>
        <div *galleryItemDef="let item; index as i"
             class="slide"
             [style.height.px]="i % 2 == 1 ? 150 : 200">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav outside/>
      </gallery>
    `,
    styles: [`
      gallery.gallery-example {
        height: unset !important;
      }
    `]
  }),
});
