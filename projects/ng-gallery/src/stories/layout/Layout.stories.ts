import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { Gallery, GalleryModule } from 'ng-gallery';
import { getHDImages, getSlides } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Documentations/Layout',
  component: Gallery,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule]
    }),
  ]
});

export const DefaultItemsPerViewExample = meta.story({
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
        <gallery-nav/>
      </gallery>
    `,
  }),
});

export const MutlipleItemsPerViewExample = meta.story({
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

export const FrictionItemsPerViewExample = meta.story({
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

export const FixedItemSizeExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items" gap="32" itemSize="150">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `,
  }),
});

export const AutoItemSizeExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getHDImages('Flowers') }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items" gap="32" itemSize="auto" forceSnap>
          <img *galleryItemDef="let item"
                galleryImage
                [src]="item.src"
                [alt]="item.alt"/>
        <gallery-nav/>
      </gallery>
    `,
  }),
});
