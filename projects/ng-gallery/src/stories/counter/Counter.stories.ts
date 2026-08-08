import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { GalleryCounter, GalleryModule } from 'ng-gallery';
import { getSlides } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Documentations/Counter',
  component: GalleryCounter,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
  ],
  args: {
    align: 'top',
  },
  argTypes: {
    align: {
      control: 'radio',
      options: ['top', 'bottom'],
      table: {
        type: { summary: "'top' | 'bottom'" },
        defaultValue: { summary: "'top'" },
      }
    },
  },
});


export const Counter = meta.story({
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
        <gallery-counter [align]="align"/>
      </gallery>
    `,
  })
});


export const CustomCounter = meta.story({
  tags: ['!dev'],
  loaders: [
    async () => ({ items: await getSlides() }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery #gallery="gallery" class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>

        <div class="g-panel custom-counter" gallerySlot gallerySlotAlign="start">
          Slide {{ gallery.activeIndex() + 1 }} of {{ gallery.itemsCount() }}
        </div>
      </gallery>
    `,
    styles: [`
      .custom-counter {
        margin-top: 0.4rem;
        padding: 0.3rem 0.6rem ;
        border-radius: 16px;
        font-size: 14px;
      }
    `]
  })
});
