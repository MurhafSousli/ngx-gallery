import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { getHDImages } from '#.storybook/mocks/pixabay.service';
import { LightboxCSSVariablesArgs, defaultStylingArgs, mapToLightboxStyles, stylingArgTypes } from '#src/stories/addons/lightbox/helper';
import { Gallery } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

const meta = preview.type<{ args: LightboxCSSVariablesArgs }>().meta({
  title: 'Addons/Lightbox/Styling',
  component: Gallery,
  decorators: [
    moduleMetadata({
      imports: [LightboxModule],
    }),
  ],
  parameters: {
    controls: {
      // This will only show the controls for the variables you defined in args
      include: Object.keys(defaultStylingArgs),
    },
  },
  args: defaultStylingArgs,
  argTypes: stylingArgTypes
});

export const StylingExample = meta.story({
  name: 'Styling',
  loaders: [
    async () => ({ items: await getHDImages('Boat') }),
  ],
  render: (args, { loaded: { items } }) => ({
    props: {
      ...args,
      items,
      // The helper function cleanly maps everything to '--g-key'
      galleryStyle: mapToLightboxStyles(args),
    },
    template: `
      <ng-template lightbox #lightbox="lightbox">
        <gallery [items]="items">
          <img *galleryItemDef="let item" galleryImage [src]="item.src" [alt]="item.alt"/>
          <gallery-nav/>
          <gallery-counter/>
        </gallery>
      </ng-template>

      <button (click)="lightbox.showModal()">Open Lightbox</button>
    `,
  })
});
