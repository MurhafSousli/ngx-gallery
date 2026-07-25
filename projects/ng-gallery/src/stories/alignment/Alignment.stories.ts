import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { Gallery, GalleryModule } from 'ng-gallery';
import { getSlides } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Documentations/Alignment',
  component: Gallery,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule]
    }),
  ]
});

export const CenterAlingmentExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `,
  }),
});

export const StartAlingmentExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              snapAlign="start"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `,
  }),
});

export const EndAlingmentExample = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
     <gallery class="gallery-example"
              [items]="items"
              gap="32"
              itemSize="150"
              snapAlign="end"
              forceSnap>
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav/>
      </gallery>
    `,
  }),
});
