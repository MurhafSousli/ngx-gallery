import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular';
import { GalleryAutoplay, GalleryModule } from 'ng-gallery';
import { getHDImages } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Addons/Autoplay',
  component: GalleryAutoplay,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
  ],
  args: {
    autoplay: true,
    autoplayInterval: 3000,
    autoplayScrollBehavior: 'smooth'
  },
  argTypes: {
    autoplay: {
      control: 'boolean',
      table: {
        defaultValue: { summary: "true" },
      }
    },
    autoplayInterval: {
      control: { type: 'number', min: 0, step: 500 },
      table: {
        defaultValue: { summary: "3000" },
      }
    },
    autoplayScrollBehavior: {
      control: 'radio',
      options: ['smooth', 'auto'],
      table: {
        defaultValue: { summary: "smooth" },
      }
    },
  },
});


export const Autoplay = meta.story({
  loaders: [
    async () => ({
      items: await getHDImages('Boat'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items"
               [autoplay]="autoplay"
               [autoplayInterval]="autoplayInterval"
               [autoplayScrollBehavior]="autoplayScrollBehavior">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
      </gallery>
    `,
  })
});
