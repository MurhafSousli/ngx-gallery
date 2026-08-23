import { Meta, StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Documentations/Global options',
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  argTypes: {
    // --- Slider Config ---
    itemSize: {
      description: 'Size of each item.',
      table: { category: 'Slider', type: { summary: "number | 'auto'" }, defaultValue: { summary: 'null' } },
      control: 'text'
    },
    itemsPerView: {
      description: 'Number of items visible at once.',
      table: { category: 'Slider', type: { summary: 'number' }, defaultValue: { summary: '1' } },
      control: 'number'
    },
    gap: {
      description: 'Space between items in pixels.',
      table: { category: 'Slider', type: { summary: 'number' }, defaultValue: { summary: '1' } },
      control: 'number'
    },
    steps: {
      description: 'Number of items to scroll per move.',
      table: { category: 'Slider', type: { summary: "number | 'page'" }, defaultValue: { summary: '1' } },
      control: 'text'
    },
    loop: {
      description: 'Enable infinite looping.',
      table: { category: 'Slider', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },
    orientation: {
      description: 'Gallery scrolling direction.',
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      table: { category: 'Slider', type: { summary: 'GalleryOrientation' }, defaultValue: { summary: 'horizontal' } }
    },
    snapAlign: {
      description: 'Snap position of items.',
      options: ['start', 'center', 'end'],
      control: { type: 'select' },
      table: { category: 'Slider', type: { summary: 'GallerySnapAlign' }, defaultValue: { summary: 'center' } }
    },
    scrollDuration: {
      description: 'Duration of scroll animation in ms.',
      table: { category: 'Slider', type: { summary: 'number' }, defaultValue: { summary: '268' } },
      control: 'number'
    },
    scrollEase: {
      description: 'Cubic-bezier easing for scrolling.',
      table: { category: 'Slider', type: { summary: 'BezierEasingOptions' }, defaultValue: { summary: '{ x1: 0.42, y1: 0, x2: 0.58, y2: 1 }' } },
      control: 'object'
    },

    // --- Thumbnails Config ---
    thumbPosition: {
      description: 'Position of the thumbnails container.',
      options: ['top', 'bottom', 'start', 'end'],
      control: { type: 'select' },
      table: { category: 'Thumbnails', type: { summary: 'GalleryDock' }, defaultValue: { summary: 'bottom' } }
    },
    thumbSize: {
      description: 'Height/Width of thumbnails.',
      table: { category: 'Thumbnails', type: { summary: "number | 'auto'" }, defaultValue: { summary: '120' } },
      control: 'text'
    },
    thumbPerView: {
      description: 'Number of thumbnails visible.',
      table: { category: 'Thumbnails', type: { summary: 'number' }, defaultValue: { summary: '5' } },
      control: 'number'
    },
    thumbThickness: {
      description: 'Thickness of the thumbnail track.',
      table: { category: 'Thumbnails', type: { summary: 'number' }, defaultValue: { summary: '90' } },
      control: 'number'
    },
    thumbDisabled: {
      description: 'Hide thumbnails entirely.',
      table: { category: 'Thumbnails', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },
    detachThumbs: {
      description: 'Detach thumbnails from the main gallery.',
      table: { category: 'Thumbnails', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },

    // --- Autoplay Config ---
    autoplay: {
      description: 'Enable automatic slide transitions.',
      table: { category: 'Autoplay', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },
    autoplayInterval: {
      description: 'Interval between transitions in ms.',
      table: { category: 'Autoplay', type: { summary: 'number' }, defaultValue: { summary: '3000' } },
      control: 'number'
    },
    autoplayScrollBehavior: {
      description: 'Scroll behavior during autoplay.',
      options: ['auto', 'smooth', 'instant'],
      control: { type: 'select' },
      table: { category: 'Autoplay', type: { summary: 'ScrollBehavior' }, defaultValue: { summary: 'smooth' } }
    },
    autoplayPause: {
      description: 'Pause mode for the autoplay feature.',
      options: ['hover', 'click', 'never'],
      control: { type: 'select' },
      table: { category: 'Autoplay', type: { summary: 'GalleryAutoplayPause' }, defaultValue: { summary: 'hover' } }
    },
    autoplayReversed: {
      description: 'Play slides in reverse order.',
      table: { category: 'Autoplay', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },

    // --- Navigation & Counter ---
    navOutside: {
      description: 'Place navigation buttons outside the container.',
      table: { category: 'Navigation', type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
      control: 'boolean'
    },
    counterAlign: {
      description: 'Alignment of the counter text.',
      options: ['top', 'bottom'],
      control: { type: 'radio' },
      table: { category: 'Counter', type: { summary: 'GalleryCounterPosition' }, defaultValue: { summary: 'top' } }
    },
    counterText: {
      description: 'Function to format the counter string.',
      table: { category: 'Counter', type: { summary: '(active, total) => string' }, defaultValue: { summary: '`${active} / ${total}`' } },
      control: false
    }
  },
};

export default meta;

type Story = StoryObj;

export const APIReference: Story = {
  tags: ['!dev', 'hidden'], // Both tags to ensure it's hidden in v10
  render: () => ({
    template: ``,
  }),
};
