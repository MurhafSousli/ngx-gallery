import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { GalleryAutoplay, GalleryModule } from 'ng-gallery';
import { getHDImages } from '#.storybook/mocks/pixabay.service';

interface DemoArgs {
  showSpinner: boolean;
  showProgressbar: boolean;
  uiColor: string;
  uiBgColor: string;
};

const meta = preview.meta<GalleryAutoplay & DemoArgs>({
  title: 'Addons/Autoplay',
  component: GalleryAutoplay,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
    }),
    // Custom decorator to set the CSS variable dynamically without modifying template source code
    (storyFn, context) => {
      const story = storyFn();
      const uiColor = context.args['uiColor'];
      const uiBgColor = context.args['uiBgColor'];

      if (uiColor) {
        // Set CSS variable on story container or gallery wrapper after frame renders
        requestAnimationFrame(() => {
          const galleryEl: HTMLElement = document.querySelector('gallery');
          galleryEl?.style.setProperty('--g-autoplay-stroke-color', uiColor);
          console.log(`Set ${uiColor}`);
          if (uiBgColor) {
            galleryEl?.style.setProperty('--g-autoplay-background-color', uiBgColor);
          }
        });
      }

      return story;
    },
  ],
  args: {
    autoplay: true,
    autoplayInterval: 3000,
    autoplayScrollBehavior: 'smooth',
    autoplayDirection: 'forward',
    autoplayPause: 'hover',
    // Demo-only defaults
    showSpinner: true,
    showProgressbar: true,
    uiColor: '#3b78ff'
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
    autoplayDirection: {
      control: 'radio',
      options: ['forward', 'backward', 'ping-pong'],
      table: {
        type: { summary: "forward | backward | ping-pong" },
        defaultValue: { summary: "forward" },
      }
    },
    autoplayPause: {
      control: 'radio',
      options: ['hover', 'click', 'never'],
      table: {
        type: { summary: "hover | click | never" },
        defaultValue: { summary: "hover" },
      }
    },
    autoplayChange: {
      type: 'function',
      action: 'autoplayChange',
      table: { category: 'Outputs' }
    },
    // Demo Controls
    showSpinner: {
      control: 'boolean',
      table: { disable: true }
    },
    showProgressbar: {
      control: 'boolean',
      table: { disable: true }
    },
    uiColor: {
      control: 'color',
      // table: { disable: true }
    },
    uiBgColor: {
      control: 'color',
      // table: { disable: true }
    }
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
      <gallery loop
               [items]="items"
               [autoplay]="autoplay"
               [autoplayInterval]="autoplayInterval"
               [autoplayScrollBehavior]="autoplayScrollBehavior"
               [autoplayDirection]="autoplayDirection"
               [autoplayPause]="autoplayPause"
               (autoplayChange)="autoplayChange($event)">
        <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>

        @if (showSpinner) {
          <gallery-autoplay gallerySlot gallerySlotJustify="end" gallerySlotAlign="start"/>
        }
        @if (showProgressbar) {
          <gallery-autoplay gallerySlot gallerySlotAlign="end" mode="progressbar"/>
        }
      </gallery>
    `,
  })
});
