import { Meta, StoryObj } from '@storybook/angular-vite';

/**
 * Technical reference for Lightbox Addon Options.
 */
const meta: Meta = {
  title: 'Addons/Lightbox/Global options',
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true },
    },
  },
  argTypes: {
    panelClass: {
      description: 'Custom CSS classes to apply to the dialog element.',
      table: {
        type: { summary: 'string | string[]' }
      },
      control: 'text'
    },
    hasBackdrop: {
      description: 'Whether the lightbox has a backdrop.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      },
      control: 'boolean'
    },
    hideCloseButton: {
      description: 'Whether to hide the close button in the lightbox.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      },
      control: 'boolean'
    },
    closedBy: {
      description: 'The policy for closing the lightbox (click on backdrop, escape key, etc.).',
      options: ['any', 'closerequest', 'none'],
      control: { type: 'radio' },
      table: {
        type: { summary: 'DialogClosePolicy' },
        defaultValue: { summary: "'any'" }
      }
    },
    disableAnimation: {
      description: 'Whether to disable the open/close animations.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      },
      control: 'boolean'
    }
  },
};

export default meta;

type Story = StoryObj;

export const APIReference: Story = {
  tags: ['!dev', 'hidden'],
  render: () => ({
    template: ``,
  }),
};
