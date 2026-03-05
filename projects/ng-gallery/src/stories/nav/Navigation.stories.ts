import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular';
import { GalleryModule, GalleryNav } from 'ng-gallery';
import { getSlides } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Documentations/Navigation',
  component: GalleryNav,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
  ],
  args: {
    showDisabledButtons: false,
    outside: false
  },
  argTypes: {
    outside: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    },
    showDisabledButtons: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "false" },
      }
    }
  },
});


export const NavigationExample = meta.story({
  name: 'Navigation',
  loaders: [
    async () => ({
      items: await getSlides(),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery class="gallery-example" [items]="items">
        <div *galleryItemDef="let item; index as i" class="slide">
          <span>{{ i + 1 }}</span>
        </div>
        <gallery-nav [showDisabledButtons]="showDisabledButtons" [outside]="outside"/>
      </gallery>
    `,
  })
});

export const OutsideNavExample = meta.story({
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
        <gallery-nav outside showDisabledButtons/>
      </gallery>
    `,
  }),
});
