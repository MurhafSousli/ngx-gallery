import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GalleryModule } from 'ng-gallery';
import { CustomTemplateComponent } from './custom-template.component';
import {
  getHDImages,
  getHDImagesForCustomTemplate,
} from '../pixabay/pixabay.service';

import 'hammerjs';

const meta: Meta<CustomTemplateComponent> = {
  title: 'Documentations/CustomTemplates',
  component: CustomTemplateComponent,
  // tags: ['autodocs'],
  render: (args: CustomTemplateComponent) => ({
    props: {
      ...args,
    },
  }),
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;
type Story = StoryObj<CustomTemplateComponent>;

export const ImageTemplateExample: Story = {
  render: (args: CustomTemplateComponent, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items">
        <div *galleryImageDef="let item" class="my-image-overlay">
          {{ item?.alt }}
        </div>
      </gallery>
    `,
  }),
  loaders: [async () => ({ items: await getHDImages('sea') })],
};

export const ItemTemplateExample: Story = {
  render: (args: CustomTemplateComponent, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items">
        <div *galleryItemDef="let item" class="my-item-template">
          <img [src]="item?.src">
        </div>
      </gallery>
    `,
    styles: [
      `
      img {
        object-fit: cover;
        border: 10px white solid;
        width: 400px;
        height: 400px;
      }
    `,
    ],
  }),
  loaders: [
    async () => ({ items: await getHDImagesForCustomTemplate('sand') }),
  ],
};

export const ThumbTemplateExample: Story = {
  render: (args: CustomTemplateComponent, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items" thumbs>
        <div *galleryThumbDef="let thumb" class="my-thumb-overlay">
          {{ thumb?.alt }}
        </div>
      </gallery>
    `,
  }),
  loaders: [async () => ({ items: await getHDImages('sea') })],
};

export const BoxTemplateExample: Story = {
  render: (args: CustomTemplateComponent, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <gallery [items]="items">
        <div *galleryBoxDef="let state; config" class="my-box">
          <div>This is fixed overlay template</div>
          <img src="https://user-images.githubusercontent.com/8130692/36171173-ad0da54c-1112-11e8-85bf-843c5f70efdc.png">
        </div>
      </gallery>
    `,
    styles: [
      `
      .my-box {
        width: 200px;
        height: 50px;
        color: white;
      }
      img {
        position: absolute;
        z-index: 999;
        width: 40px;
        height: 40px;
        top: 20px;
        left: 20px;
      }
    `,
    ],
  }),
  loaders: [async () => ({ items: await getHDImages('sea') })],
};
