import { moduleMetadata } from '@storybook/angular-vite';
import { GallerySlot, GalleryModule } from 'ng-gallery';
import preview from '#.storybook/preview';
import { getSlides } from '#.storybook/mocks/pixabay.service';

const meta = preview.meta({
  title: 'Documentations/Slot',
  component: GallerySlot,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
  ],
  args: {
    position: 'center',
    align: 'center',
    justify: 'center'
  },
  argTypes: {
    position: {
      name: 'gallerySlot',
      control: 'select',
      options: ['center', 'top', 'bottom', 'start', 'end'],
      table: {
        type: { summary: "'center' | 'top' | 'bottom' | 'start' | 'end'" },
        defaultValue: { summary: "'center'" },
      }
    },
    align: {
      name: 'gallerySlotAlign',
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      table: {
        type: { summary: "'start' | 'end' | 'center' | 'stretch'" },
        defaultValue: { summary: "'center'" },
      }
    },
    justify: {
      name: 'gallerySlotJustify',
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      table: {
        type: { summary: "'start' | 'end' | 'center' | 'stretch'" },
        defaultValue: { summary: "'center'" },
      }
    },
  },
});


export const Slot = meta.story({
  name: 'Slot',
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

        <div class="static-panel"
             [gallerySlot]="position"
             [gallerySlotAlign]="align"
             [gallerySlotJustify]="justify">
          Static Content
        </div>
      </gallery>
    `,
    styles: [`
      .gallery-example {
        height: 300px !important;
      }
      .static-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0 0 0 / 0.5);
        border: 1px solid black;
        font-size: 20px;
        font-family: monospace, monospace;
        width: 250px;
        height: 75px;
        color: coral;
      }
    `]
  })
});
