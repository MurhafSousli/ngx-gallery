import { ArgTypes } from 'storybook/internal/csf';

export interface CSSVariablesArgs {
  'content-alignment': 'start' | 'center' | 'end';
  'layout-gap': string;
  'size-transition-ease': string;
  'nav-filter': string;
  'nav-offset': string;
  'button-size': string;
  'button-icon-size': string;
  'item-cursor': string;
  'item-loader-text-color': string;
  'item-loader-background-color': string;
  'item-error-text-color': string;
  'item-error-background-color': string;
  'item-image-transition': string;
  'item-image-size': string;
  'thumb-cursor': string;
  'thumb-image-size': string;
  'autoplay-spinner-size': string;
  'autoplay-spinner-offset': string;
  'autoplay-thickness': string;
  'autoplay-background-color': string;
  'autoplay-stroke-color': string;
  'scroll-snap-stop': string;
}

export const defaultStylingArgs: CSSVariablesArgs = {
  'content-alignment': 'center',
  'layout-gap': '1px',
  'size-transition-ease': '',
  'nav-filter': '',
  'nav-offset': '',
  'button-size': '40px',
  'button-icon-size': '24px',
  'item-cursor': '',
  'item-loader-text-color': '',
  'item-loader-background-color': '',
  'item-error-text-color': '',
  'item-error-background-color': '',
  'item-image-transition': '',
  'item-image-size': 'cover',
  'thumb-cursor': '',
  'thumb-image-size': 'cover',
  'autoplay-spinner-size': '',
  'autoplay-spinner-offset': '',
  'autoplay-thickness': '',
  'autoplay-background-color': '',
  'autoplay-stroke-color': '',
  'scroll-snap-stop': 'always',
};

export const stylingArgTypes: ArgTypes<CSSVariablesArgs> = {
  // --- Layout & Positioning ---
  'content-alignment': {
    name: 'content-alignment',
    description: 'Controls the positioning of the track within the viewport (start, center, end). Automatically falls back to safe bounds on overflow.',
    control: 'select',
    options: ['start', 'center', 'end'],
    table: {
      category: 'Layout',
      defaultValue: { summary: 'center' }
    },
  },
  'layout-gap': {
    name: 'layout-gap',
    description: 'Sets the gap between the slider track and other docked areas (like thumbnails).',
    control: 'text',
    table: {
      category: 'Layout',
      defaultValue: { summary: '1px' }
    },
  },
  'size-transition-ease': {
    name: 'size-transition-ease',
    description: 'Defines the CSS transition easing function for the slider’s width and height adjustments.',
    control: 'text',
    table: {
      category: 'Layout',
      defaultValue: { summary: 'cubic-bezier(0.42, 0, 0.58, 1)' }
    },
  },
  'scroll-snap-stop': {
    name: 'scroll-snap-stop',
    description: 'Forces the scroll container to stop on elements (always vs normal).',
    control: 'select',
    options: ['normal', 'always'],
    table: { category: 'Layout' },
  },

  // --- Navigation & Buttons ---
  'nav-filter': {
    name: 'nav-filter',
    description: 'Applies a CSS filter (backdrop-filter) to the default navigation button icons.',
    control: 'text',
    table: { category: 'Navigation' },
  },
  'nav-offset': {
    name: 'nav-offset',
    description: 'Adjusts the distance of the navigation buttons from the edges of the gallery.',
    control: 'text',
    table: {
      category: 'Navigation',
      defaultValue: { summary: '1rem' }
    },
  },
  'button-size': {
    name: 'button-size',
    description: 'Sets the width and height of all gallery buttons (including nav).',
    control: 'text',
    table: {
      category: 'Navigation',
      defaultValue: { summary: '40px' }
    },
  },
  'button-icon-size': {
    name: 'button-icon-size',
    description: 'Sets the size of the SVG/icons inside the gallery buttons.',
    control: 'text',
    table: {
      category: 'Navigation',
      defaultValue: { summary: '24px' }
    },
  },

  // --- Items & Thumbnails ---
  'item-image-size': {
    name: 'item-image-size',
    description: 'Sets the object-fit sizing for the main item images (e.g., cover, contain).',
    control: 'select',
    options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
    table: {
      category: 'Items & Thumbs',
      defaultValue: { summary: 'contain' }
    },
  },
  'item-image-transition': {
    name: 'item-image-transition',
    description: 'Sets the transition effect when the main image changes or loads.',
    control: 'text',
    table: {
      category: 'Items & Thumbs',
      defaultValue: { summary: 'filter 0.4s ease-out' }
    },
  },
  'item-cursor': {
    name: 'item-cursor',
    description: 'Sets the CSS cursor property when hovering over a main gallery item.',
    control: 'text',
    table: { category: 'Items & Thumbs' },
  },
  'thumb-image-size': {
    name: 'thumb-image-size',
    description: 'Sets the object-fit sizing for the thumbnail images.',
    control: 'select',
    options: ['cover', 'contain'],
    table: {
      category: 'Items & Thumbs',
      defaultValue: { summary: 'cover' }
    },
  },
  'thumb-cursor': {
    name: 'thumb-cursor',
    description: 'Sets the CSS cursor property when hovering over a thumbnail.',
    control: 'text',
    table: {
      category: 'Items & Thumbs',
      defaultValue: { summary: 'pointer' }
    },
  },

  // --- Loader & Error States ---
  'item-loader-background-color': {
    name: 'item-loader-background-color',
    description: 'Background color of the loader overlay before the item resolves.',
    control: 'color',
    table: {
      category: 'States',
      defaultValue: { summary: 'CanvasText' }
    },
  },
  'item-loader-text-color': {
    name: 'item-loader-text-color',
    description: 'Color of the loading spinner or text.',
    control: 'color',
    table: {
      category: 'States',
      defaultValue: { summary: 'Canvas' }
    },
  },
  'item-error-background-color': {
    name: 'item-error-background-color',
    description: 'Background color displayed when an item fails to load.',
    control: 'color',
    table: {
      category: 'States',
      defaultValue: { summary: 'CanvasText' }
    },
  },
  'item-error-text-color': {
    name: 'item-error-text-color',
    description: 'Color of the error icon or text.',
    control: 'color',
    table: {
      category: 'States',
      defaultValue: { summary: 'Canvas' }
    },
  },

  // --- Autoplay Spinner ---
  'autoplay-spinner-size': {
    name: 'autoplay-spinner-size',
    description: 'Sets the diameter of the circular autoplay progress spinner.',
    control: 'text',
    table: {
      category: 'Autoplay',
      defaultValue: { summary: '32px' }
    },
  },
  'autoplay-spinner-offset': {
    name: 'autoplay-spinner-offset',
    description: 'Sets the distance of the autoplay spinner from the edge of the gallery.',
    control: 'text',
    table: {
      category: 'Autoplay',
      defaultValue: { summary: '8px' }
    },
  },
  'autoplay-thickness': {
    name: 'autoplay-thickness',
    description: 'Sets the stroke width/thickness of the autoplay spinner.',
    control: 'text',
    table: {
      category: 'Autoplay',
      defaultValue: { summary: '3px' }
    },
  },
  'autoplay-background-color': {
    name: 'autoplay-background-color',
    description: 'Sets the background track color of the autoplay spinner.',
    control: 'color',
    table: {
      category: 'Autoplay',
      defaultValue: { summary: 'white' }
    },
  },
  'autoplay-stroke-color': {
    name: 'autoplay-stroke-color',
    description: 'Sets the active progress stroke color of the autoplay spinner.',
    control: 'color',
    table: {
      category: 'Autoplay',
      defaultValue: { summary: 'white' }
    },
  },
};


// Helper function to map args to CSS variables
export function mapToGalleryStyles(args: Partial<CSSVariablesArgs>): Record<string, string> {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(args)) {
    if (value) {
      styles[`--g-${ key }`] = value;
    }
  }
  return styles;
}
