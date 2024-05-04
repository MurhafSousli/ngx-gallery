import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  CounterPosition,
  BulletsPosition,
  GalleryComponent,
  ImageSize,
  LoadingAttr,
  LoadingStrategy,
  Orientation,
  ThumbnailsPosition
} from 'ng-gallery';
import { getHDImages } from '../pixabay/pixabay.service';

import 'hammerjs';


const meta: Meta<GalleryComponent> = {
  title: 'Documentations/Gallery',
  component: GalleryComponent,
  tags: ['autodocs'],
  render: (args: GalleryComponent) => ({
    props: {
      ...args,
    },
  }),
  decorators: [
    applicationConfig({
      providers: [provideAnimations()]
    })
  ],
  args: {
    id: 'root',
    scrollBehavior: 'smooth',
    imageSize: ImageSize.Contain,
    thumbImageSize: ImageSize.Cover,
    bulletPosition: BulletsPosition.Bottom,
    counterPosition: CounterPosition.Top,
    orientation: Orientation.Horizontal,
    loadingAttr: LoadingAttr.Lazy,
    loadingStrategy: LoadingStrategy.Default,
    thumbPosition: ThumbnailsPosition.Bottom,
    scrollEase: {
      x1: 0.42,
      y1: 0,
      x2: 0.58,
      y2: 1
    },
    bulletSize: 6,
    thumbWidth: 120,
    thumbHeight: 90,
    autoplayInterval: 3000,
    scrollDuration: 468,
    resizeDebounceTime: 0,
    nav: true,
    bullets: true,
    disableBullets: false,
    loop: true,
    debug: false,
    thumbs: true,
    counter: true,
    autoplay: false,
    autoHeight: false,
    itemAutosize: false,
    disableThumbs: false,
    detachThumbs: false,
    thumbAutosize: false,
    disableScroll: false,
    thumbCentralized: false,
    disableThumbScroll: false,
    disableMouseScroll: false,
    disableThumbMouseScroll: false,
  },
  // Disables the long useless control description
  argTypes: {
    scrollBehavior: {
      control: 'radio',
      options: ['smooth', 'auto'],
      table: {
        defaultValue: { summary: 'smooth' }
      }
    },
    imageSize: {
      table: {
        defaultValue: { summary: 'contain' }
      }
    },
    thumbImageSize: {
      table: {
        defaultValue: { summary: 'cover' }
      }
    },
    bulletPosition: {
      table: {
        defaultValue: { summary: 'bottom' }
      }
    },
    counterPosition: {
      table: {
        defaultValue: { summary: 'top' }
      }
    },
    orientation: {
      table: {
        defaultValue: { summary: 'horizontal' }
      }
    },
    loadingAttr: {
      table: {
        defaultValue: { summary: 'lazy' }
      }
    },
    loadingStrategy: {
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    thumbPosition: {
      table: {
        defaultValue: { summary: 'bottom' }
      }
    },
    thumbCentralized: {
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    scrollEase: {
      table: {
        defaultValue: { summary: '{ x1: 0.42, y1: 0, x2: 0.58, y2: 1 }' }
      }
    },
    nav: {
      table: {
        defaultValue: { summary: true }
      }
    },
    thumbs: {
      table: {
        defaultValue: { summary: true }
      }
    },
    loop: {
      table: {
        defaultValue: { summary: true }
      }
    },
    counter: {
      table: {
        defaultValue: { summary: true }
      }
    },
    bulletSize: {
      table: {
        defaultValue: { summary: 6 }
      }
    },
    thumbWidth: {
      table: {
        defaultValue: { summary: 120 }
      }
    },
    thumbHeight: {
      table: {
        defaultValue: { summary: 90 }
      }
    },
    autoplayInterval: {
      table: {
        defaultValue: { summary: 3000 }
      }
    },
    scrollDuration: {
      table: {
        defaultValue: { summary: 468 }
      }
    },
    resizeDebounceTime: {
      table: {
        defaultValue: { summary: 0 }
      }
    },
    error: {
      control: false
    },
    indexChange: {
      control: false
    },
    itemsChange: {
      control: false
    },
    itemClick: {
      control: false
    },
    thumbClick: {
      control: false
    },
    playingChange: {
      control: false
    },
    galleryRef: {
      control: false
    },
    load: {
      control: false
    },
    add: {
      control: false
    },
    addImage: {
      control: false
    },
    addVideo: {
      control: false
    },
    addIframe: {
      control: false
    },
    addYoutube: {
      control: false
    },
    remove: {
      control: false
    },
    next: {
      control: false
    },
    prev: {
      control: false
    },
    set: {
      control: false
    },
    reset: {
      control: false
    },
    play: {
      control: false
    },
    stop: {
      control: false
    }
  }
};

export default meta;
type Story = StoryObj<GalleryComponent>;


/** First Example for gallery */
export const Lab: Story = {
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: {
      ...args,
      items,
    },
    template: `
      <gallery [items]="items"
               [orientation]="orientation"
               [scrollBehavior]="scrollBehavior"
               [scrollDuration]="scrollDuration"
               [disableScroll]="disableScroll"
               [disableMouseScroll]="disableMouseScroll"
               [autoHeight]="autoHeight"
               [itemAutosize]="itemAutosize"
               [thumbs]="thumbs"
               [thumbImageSize]="thumbImageSize"
               [thumbPosition]="thumbPosition"
               [thumbCentralized]="thumbCentralized"
               [thumbWidth]="thumbWidth"
               [thumbHeight]="thumbHeight"
               [disableThumbs]="disableThumbs"
               [detachThumbs]="detachThumbs"
               [thumbAutosize]="thumbAutosize"
               [disableThumbScroll]="disableThumbScroll"
               [disableThumbMouseScroll]="disableThumbMouseScroll"
               [bullets]="bullets"
               [bulletPosition]="bulletPosition"
               [bulletSize]="bulletSize"
               [disableBullets]="disableBullets"
               [resizeDebounceTime]="resizeDebounceTime"
               [nav]="nav"
               [loop]="loop"
               [debug]="debug"
               [counter]="counter"
               [counterPosition]="counterPosition"
               [autoplay]="autoplay"
               [autoplayInterval]="autoplayInterval"
               [imageSize]="imageSize"
               [loadingAttr]="loadingAttr"
               [loadingStrategy]="loadingStrategy"/>
    `,
  }),
  loaders: [
    async () => ({
      items: await getHDImages('jet fighter')
    }),
  ]
};


export const ThumbPositionExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" thumbs thumbPosition="bottom"/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('street') }),
  ]
};


export const ThumbAutosizeExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" thumbs thumbAutosize/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('roads') }),
  ]
};

export const ThumbDetachedExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" thumbs detachThumbs/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('flowers') }),
  ]
};

export const ThumbViewExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" thumbs thumbCentralized/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('landscape') }),
  ]
};


export const AutoplayExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" autoplay />`
  }),
  loaders: [
    async () => ({ items: await getHDImages('airplane') }),
  ]
};


export const BulletExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" bullets />`
  }),
  loaders: [
    async () => ({ items: await getHDImages('football') }),
  ]
};

export const CounterExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" counter />`
  }),
  loaders: [
    async () => ({ items: await getHDImages('basketball') }),
  ]
};

export const NavExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items"/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('lions') }),
  ]
};

export const SliderExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items"/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('chips') }),
  ]
};

export const SliderBehaviorExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" scrollBehavior="auto"/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('chips') }),
  ]
};

export const NavWithLoopExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" loop/>`
  }),
  loaders: [
    async () => ({ items: await getHDImages('tigers') }),
  ]
};

export const SliderDirectionExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" orientation="vertical" />`
  }),
  loaders: [
    async () => ({ items: await getHDImages('tigers') }),
  ]
};

export const ImageSizeExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" imageSize="cover" />`
  }),
  loaders: [
    async () => ({ items: await getHDImages('tigers') }),
  ]
};

export const AutoHeightExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" autoHeight />`
  }),
  loaders: [
    async () => ({ items: await getHDImages('tigers') }),
  ]
};

export const ItemAutosizeExample: Story = {
  parameters:{ controls:{ exclude:/.*/g } },
  render: (args: GalleryComponent, { loaded: { items } }) => ({
    props: { ...args, items, },
    template: `<gallery [items]="items" itemAutosize loadingStrategy="preload" loadingAttr="eager" />`
  }),
  loaders: [
    async () => ({ items: await getHDImages('ship') }),
  ]
};

