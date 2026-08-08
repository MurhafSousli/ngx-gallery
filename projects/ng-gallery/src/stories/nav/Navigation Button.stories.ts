import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { GalleryModule, GalleryNavButton } from 'ng-gallery';
import { getSlides } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  // title: 'Documentations/Navigation',
  component: GalleryNavButton,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
  ],
  args: {
  },
  argTypes: {
    type: {
      name: 'galleryNavButton',
      table: {
        defaultValue: { summary: null },
      }
    }
  },
});

export const CustomNavTemplateExample = meta.story({
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
        <gallery-nav>
          <button galleryNavButton="prev">◀ Previous</button>
          <button galleryNavButton="next">Next ▶</button>
        </gallery-nav>
      </gallery>
    `,
  }),
});


export const CustomNavPositionExample = meta.story({
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
        <div gallerySlot gallerySlotAlign="end" gallerySlotJustify="end">
          <button galleryNavButton="prev">◀ Previous</button>
          <button galleryNavButton="next">Next ▶</button>
        </div>
      </gallery>
    `,
  }),
});
