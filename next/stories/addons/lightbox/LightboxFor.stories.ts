import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular';
import { LightboxModule, LightboxFor } from 'ng-gallery/lightbox';
import { getHDImages } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Addons/Lightbox',
  component: LightboxFor,
  decorators: [
    moduleMetadata({
      imports: [LightboxModule],
    }),
  ]
});


export const LightboxForGridExample = meta.story({
  name: 'LightboxForGrid',
  loaders: [
    async () => ({
      items: await getHDImages('Nature'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <ng-template lightbox #lightbox="lightbox" panelClass="g-glass-theme">
        <gallery [items]="items" gap="48">
          <img *galleryItemDef="let item"
               galleryImage
               [src]="item.src"
               [alt]="item.alt"
               [style.object-fit]="'cover'"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <div class="grid">
        @for (item of items; track i; let i = $index) {
          <div class="grid-item"
               [lightboxFor]="lightbox"
               [lightboxIndex]="i">
            <img class="grid-image" loading="lazy" [src]="item.thumb"/>
          </div>
        }
      </div>
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


export const LightboxForGalleryExample = meta.story({
  name: 'LightboxForGallery',
  loaders: [
    async () => ({
      items: await getHDImages('Ship'),
    }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: { ...args, items },
    template: `
      <ng-template lightbox #lightbox="lightbox" panelClass="g-glass-theme">
        <gallery [items]="items">
          <img *galleryItemDef="let item"
               galleryImage
               [src]="item.src"
               [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <gallery [items]="items">
        <button *galleryItemDef="let item" [lightboxFor]="lightbox">
          <img galleryImage
               [src]="item.src"
               [alt]="item.alt"/>
        </button>

        <gallery-nav/>

        <gallery-counter/>

        <gallery-thumbs>
          <button *galleryItemDef="let item" galleryThumbClick>
            <img galleryImage
                 [src]="item.thumb"
                 [alt]="item.alt + '_thumb'"/>
          </button>
        </gallery-thumbs>
    </gallery>
    `
  }),
});
