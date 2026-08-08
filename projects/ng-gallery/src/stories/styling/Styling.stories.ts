import preview from '#.storybook/preview';
import { moduleMetadata } from '@storybook/angular-vite';
import { Gallery, GalleryModule } from 'ng-gallery';
import { getHDImages } from '#.storybook/mocks/pixabay.service';
import { CSSVariablesArgs, defaultStylingArgs, mapToGalleryStyles, stylingArgTypes } from '#src/stories/styling/helper';

const meta = preview.type<{ args: CSSVariablesArgs }>().meta({
  title: 'Documentations/Styling',
  component: Gallery,
  decorators: [
    moduleMetadata({
      imports: [GalleryModule],
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
      galleryStyle: mapToGalleryStyles(args),
    },
    template: `
      <gallery [style]="galleryStyle" [items]="items">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"
             [alt]="item.alt"/>

        <gallery-nav/>
      </gallery>
    `,
  })
});
