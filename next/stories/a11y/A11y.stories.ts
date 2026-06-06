import { Meta, StoryObj } from '@storybook/angular';

/**
 * Technical reference for Gallery Accessibility (A11y) properties.
 * This table documents the ARIA contract for the component.
 */
const meta: Meta = {
  title: 'Documentations/Accessibility',
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  argTypes: {
    liveRegion: {
      description: 'Enables/disables live region announcements.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
    rangeLabel: {
      description: 'Callback to generate the range label.',
      table: {
        type: { summary: '(start: number, end: number, total: number) => string' },
        defaultValue: { summary: 'Slide ${ start } of ${ total }' },
      },
      control: false,
    },
    containerRole: {
      description: 'ARIA role for the gallery container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'region'" },
      },
      control: 'text',
    },
    containerLabel: {
      description: 'ARIA label for the gallery container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Gallery'" },
      },
      control: 'text',
    },
    containerRoleDescription: {
      description: 'ARIA role description for the gallery container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'carousel'" },
      },
      control: 'text',
    },
    itemLabel: {
      description: 'Callback to generate the ARIA label for each gallery item.',
      table: {
        type: { summary: '(item: any) => string' },
        defaultValue: { summary: '${ index + 1 } / ${ total }' },
      },
      control: false,
    },
    itemRole: {
      description: 'ARIA role for each gallery item.',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    itemRoleDescription: {
      description: 'ARIA role description for each gallery item.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'slide'" },
      },
      control: 'text',
    },
    thumbContainerLabel: {
      description: 'ARIA label for the thumbnails container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Gallery thumbnails'" },
      },
      control: 'text',
    },
    thumbContainerRole: {
      description: 'ARIA role for the thumbnails container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'group'" },
      },
      control: 'text',
    },
    thumbContainerRoleDescription: {
      description: 'ARIA role description for the thumbnails container.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'carousel'" },
      },
      control: 'text',
    },
    thumbLabel: {
      description: 'Callback to generate the ARIA label for each thumbnail item.',
      table: {
        type: { summary: '(item: any) => string' },
        defaultValue: { summary: 'Go to slide ${ index + 1 }' },
      },
      control: false,
    },
    thumbRole: {
      description: 'ARIA role for each thumbnail item.',
      table: {
        type: { summary: 'string' },
      },
      control: 'text',
    },
    thumbRoleDescription: {
      description: 'ARIA role description for each thumbnail item.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'thumbnail'" },
      },
      control: 'text',
    },
    prevItemLabel: {
      description: 'ARIA label for screen readers for previous button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Go to previous slide'" },
      },
      control: 'text',
    },
    nextItemLabel: {
      description: 'ARIA label for screen readers for next button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Go to next slide'" },
      },
      control: 'text',
    },
    firstItemLabel: {
      description: 'ARIA label for screen readers for previous button when swiper is on first slide.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Go to first slide'" },
      },
      control: 'text',
    },
    lastItemLabel: {
      description: 'ARIA label for screen readers for next button when swiper is on last slide.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Go to last slide'" },
      },
      control: 'text',
    },
    lightboxLabel: {
      description: 'ARIA label for screen readers for the lightbox dialog.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Close gallery'" },
      },
      control: 'text',
    },
    lightboxCloseButtonLabel: {
      description: 'ARIA label for screen readers for the lightbox close button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Close gallery'" },
      },
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj;

/**
 * This story renders an empty template.
 * The purpose is to trigger the 'Autodocs' table above.
 */
export const APIReference: Story = {
  tags: ['!dev'],
  render: () => ({
    template: ``,
  }),
};
