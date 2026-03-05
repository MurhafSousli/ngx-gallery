import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { getHDImages } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Addons/Lightbox',
  component: Lightbox,
  decorators: [
    moduleMetadata({
      imports: [LightboxModule],
    }),
  ]
});


export const LightboxExample = meta.story({
  name: 'Lightbox',
  loaders: [
    async () => ({
      items: await getHDImages('Boat'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <ng-template lightbox #lightbox="lightbox">
        <gallery [items]="items">
          <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <button (click)="lightbox.showModal()">Open Lightbox</button>
    `
  }),
  decorators: [(story) => ({
    ...story(),
    styles: [`
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      .grid-item {
        position: relative;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
        background-color: #f0f0f0;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .grid-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
      }

      .grid-item:hover .grid-image {
        transform: scale(1.08);
      }
    `],
  })],
});

