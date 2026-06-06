import { ArgTypes } from 'storybook/internal/csf';

export interface LightboxCSSVariablesArgs {
  'container-shape': string;
  'container-elevation-shadow': string;
  'backdrop-color': string;
  'backdrop-filter': string;
  'backdrop-filter-start': string;
  'duration-in': string;
  'duration-out': string;
  'opacity-start': string;
  'scale-start': string;
  'translate-start': string;
  'rotate-start': string;
  'timing-in': string;
  'timing-out': string;
}

export const defaultStylingArgs: LightboxCSSVariablesArgs = {
  'container-shape': '26px',
  'container-elevation-shadow': '',
  'backdrop-color': 'rgba(0, 0, 0, 0.4)',
  'backdrop-filter': 'blur(0px) saturate(100%)',
  'backdrop-filter-start': 'blur(0px) saturate(100%)',
  'duration-in': '300ms',
  'duration-out': '300ms',
  'opacity-start': '0',
  'scale-start': '0.95',
  'translate-start': '0, 20px',
  'rotate-start': '0deg',
  'timing-in': 'ease',
  'timing-out': 'ease',
};

export const stylingArgTypes: ArgTypes<LightboxCSSVariablesArgs> = {
  'container-shape': {
    name: 'container-shape',
    control: 'text',
    description: 'Dialog border radius',
    table: {
      category: 'Appearance',
      defaultValue: { summary: '26px' }
    },
  },
  'container-elevation-shadow': {
    name: 'container-elevation-shadow',
    control: 'text',
    description: 'Dialog box shadow (elevation effect)',
    table: {
      category: 'Appearance',
      defaultValue: { summary: 'light-dark(...)' }
    },
  },
  'backdrop-color': {
    name: 'backdrop-color',
    control: 'color',
    description: 'Final overlay background color',
    table: {
      category: 'Backdrop',
      defaultValue: { summary: 'rgba(0, 0, 0, 0.4)' }
    },
  },
  'backdrop-filter': {
    name: 'backdrop-filter',
    control: 'text',
    description: 'Final backdrop filter effects (blur, saturate, etc.)',
    table: {
      category: 'Backdrop',
      defaultValue: { summary: 'blur(0px) saturate(100%)' }
    },
  },
  'backdrop-filter-start': {
    name: 'backdrop-filter-start',
    control: 'text',
    description: 'Initial backdrop filter effects (before animation)',
    table: {
      category: 'Backdrop',
      defaultValue: { summary: 'blur(0px) saturate(100%)' }
    },
  },
  'duration-in': {
    name: 'duration-in',
    control: 'text',
    description: 'Opening/enter animation duration',
    table: {
      category: 'Animation Duration',
      defaultValue: { summary: '300ms' }
    },
  },
  'duration-out': {
    name: 'duration-out',
    control: 'text',
    description: 'Closing/exit animation duration',
    table: {
      category: 'Animation Duration',
      defaultValue: { summary: '300ms' }
    }
  },
  'opacity-start': {
    name: 'opacity-start',
    control: 'text',
    description: 'Initial opacity (0-1)',
    table: {
      category: 'Initial Transform State',
      defaultValue: { summary: '0' }
    }
  },
  'scale-start': {
    name: 'scale-start',
    control: 'text',
    description: 'Initial scale transformation',
    table: {
      category: 'Initial Transform State',
      defaultValue: { summary: '0.95' }
    }
  },
  'translate-start': {
    name: 'translate-start',
    control: 'text',
    description: 'Initial translation (X Y format)',
    table: {
      category: 'Initial Transform State',
      defaultValue: { summary: '0, 20px' }
    }
  },
  'rotate-start': {
    name: 'rotate-start',
    control: 'text',
    description: 'Initial rotation angle',
    table: {
      category: 'Initial Transform State',
      defaultValue: { summary: '0deg' }
    }
  },
  'timing-in': {
    name: 'timing-in',
    control: 'text',
    description: 'Easing function for opening animation (ease, ease-out, cubic-bezier, etc.)',
    table: {
      category: 'Animation Timing',
      defaultValue: { summary: 'ease' }
    }
  },
  'timing-out': {
    name: 'timing-out',
    control: 'text',
    description: 'Easing function for closing animation',
    table: {
      category: 'Animation Timing',
      defaultValue: { summary: 'ease' }
    }
  }
};


// Helper function to map args to CSS variables
export function mapToLightboxStyles(args: Partial<LightboxCSSVariablesArgs>): Record<string, string> {
  const styles: Record<string, string> = {};
  for (const [key, value] of Object.entries(args)) {
    if (value) {
      styles[`--lb-${key}`] = value;
    }
  }
  return styles;
}
