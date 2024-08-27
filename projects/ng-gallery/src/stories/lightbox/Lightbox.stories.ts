import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LightboxModule } from 'ng-gallery/lightbox';
import { getHDImages } from '../pixabay/pixabay.service';
import { LightboxExampleComponent } from './lightbox-example';

import 'hammerjs';

const meta: Meta<LightboxExampleComponent> = {
  title: 'Documentations/Lightbox',
  component: LightboxExampleComponent,
  decorators: [
    moduleMetadata({
      imports: [LightboxModule],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<LightboxExampleComponent>;

export const LightboxExample: Story = {
  parameters: {
    docs: {
      source: {
        code: `
          <div class="container">
            <img *ngFor="let item of items; index as i"
               class="grid-image"
               [src]="item.data.thumb"
               [lightbox]="i"
               [gallery]="galleryId"/>
          </div>
        `,
      },
    },
  },
  render: (args: LightboxExampleComponent, { loaded: { items } }) => ({
    props: { ...args, items },
  }),
  loaders: [async () => ({ items: await getHDImages('ship') })],
};

export const GallerizeExample: Story = {
  render: (args: LightboxExampleComponent, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <div class="container" gallerize>
        <img *ngFor="let item of items"
             [src]="item.data.thumb"
             [attr.imageSrc]="item.data.src">
      </div>
    `,
    styles: [
      `
      .container {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
        margin: 0 auto;
        padding: 20px;
        max-width: 768px;
      }
      img {
        height: 90px;
        width: 125px;
        object-fit: cover;
      }
    `,
    ],
  }),
  loaders: [async () => ({ items: await getHDImages('ship') })],
};

export const GallerizeGalleryExample: Story = {
  render: (args: LightboxExampleComponent, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items" gallerize />
    `,
  }),
  loaders: [async () => ({ items: await getHDImages('ship') })],
};
