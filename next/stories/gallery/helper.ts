import { ArgTypes } from 'storybook/internal/csf';
import { Gallery } from 'ng-gallery';

export const galleryArgTypes: ArgTypes<Partial<Gallery>> = {
  initialIndex: {
    control: false,
    table: {
      defaultValue: { summary: "0" },
    }
  },
  gap: {
    control: { type: 'number', min: 0, step: 1 },
    table: {
      defaultValue: { summary: "1" },
    }
  },
  itemsPerView: {
    control: { type: 'number', min: 1, step: 1 },
    table: {
      defaultValue: { summary: "1" },
    }
  },
  itemSize: {
    control: { type: 'text' },
    table: {
      defaultValue: { summary: null },
    }
  },
  steps: {
    control: { type: 'text' },
    table: {
      defaultValue: { summary: null },
    }
  },
  scrollBehavior: {
    control: 'radio',
    options: ['smooth', 'auto'],
    table: {
      defaultValue: { summary: "smooth" },
    }
  },
  resizeDebounceTime: {
    control: { type: 'number', min: 0, step: 50 },
    table: {
      defaultValue: { summary: "468" },
    }
  },
  scrollDuration: {
    control: { type: 'number', min: 0, step: 50 },
    table: {
      defaultValue: { summary: "268" },
    }
  },
  scrollEase: {
    control: false,
    table: {
      defaultValue: { summary: "{ x1: 0.42, y1: 0, x2: 0.58, y2: 1 }" },
    }
  },
  loop: {
    control: 'boolean',
    table: {
      defaultValue: { summary: "false" },
    }
  },
  disableScroll: {
    control: 'boolean',
    table: {
      defaultValue: { summary: "false" },
    }
  },
  disableMouseScroll: {
    control: 'boolean',
    table: {
      defaultValue: { summary: "false" },
    }
  },
  snapAlign: {
    control: 'radio',
    options: ['center', 'start', 'end'],
    table: {
      type: { summary: "'center' | 'start' | 'end'" },
      defaultValue: { summary: "'center'" },
    }
  },
  forceSnap: {
    control: 'boolean',
    table: {
      defaultValue: { summary: "false" },
    }
  },
  orientation: {
    control: 'radio',
    options: ['horizontal', 'vertical'],
    table: {
      type: { summary: "'horizontal' | 'vertical'" },
      defaultValue: { summary: "'horizontal'" },
    }
  },
  activeIndexChange: {
    type: 'function',
    action: 'activeIndexChange',
    table: { category: 'Outputs' } // Maps directly to standard outputs grouping block
  },
  anchorIndexChange: {
    type: 'function',
    action: 'anchorIndexChange',
    table: { category: 'Outputs' }
  },
  hasNext: {
    type: 'function',
    table: {
      defaultValue: { summary: null }
    }
  },
  hasPrev: {
    type: 'function',
    table: {
      defaultValue: { summary: null }
    }
  },
  renderedItems: {
    type: 'function',
    table: {
      defaultValue: { summary: null }
    }
  },
  itemsCount: {
    type: 'function',
    table: {
      defaultValue: { summary: null }
    }
  },
  next: {
    type: 'function',
    table: {
      type: { summary: "NavigationIntent" },
    }
  },
  prev: {
    type: 'function',
    table: {
      type: { summary: "NavigationIntent2" },
    }
  },
  goTo: {
    type: 'function',
    table: {
      type: { summary: "NavigationIntent2" },
    }
  },
  visibleEntries: {
    type: 'function',
    table: {
      defaultValue: null,
    }
  },
  isOneItemPerView: {
    type: 'function',
    table: {
      defaultValue: null,
    }
  },
  anchorIndex: {
    type: 'function',
    table: {
      defaultValue: null,
    }
  },
  activeIndex: {
    type: 'function',
    table: {
      defaultValue: null,
    }
  },
  hasVisibleItems: {
    type: 'function',
    table: {
      defaultValue: null,
    }
  },
  activeItem: {
    type: 'function',
    table: {
      defaultValue: null,
    }
  },
}
