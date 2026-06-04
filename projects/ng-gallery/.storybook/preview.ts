import { componentWrapperDecorator, definePreview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import addonDocs from '@storybook/addon-docs';
import addonA11y from '@storybook/addon-a11y';
import { themes } from 'storybook/theming';
import { initialize, mswLoader } from 'msw-storybook-addon';

import docJson from '../documentation.json';
import { pixabayHandler } from '#.storybook/mocks/pixabay.handler';
import { versionsHandler } from '#.storybook/mocks/versions.handler';

setCompodocJson(docJson);

// Initialize MSW globally
initialize({
  onUnhandledRequest: 'bypass',
});

// --- Dynamic Release Version Resolution ---
const currentPath = window.location.pathname; // e.g., "/ngx-gallery/v13-alpha/"
const pathSegments = currentPath.split('/').filter(Boolean);
const repoName = pathSegments[0] || 'ngx-gallery';
const activeFolderOnServer = pathSegments[1] || 'next';

// Default: show only the currently active version (used locally and as safe fallback)
let dynamicVersionItems: { value: string; displayLabel: string; actualVersion: string }[] = [
  { value: activeFolderOnServer, displayLabel: activeFolderOnServer, actualVersion: activeFolderOnServer }
];

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

// Load dynamic versions asynchronously without blocking preview initialization
// IIFE ensures versions are fetched after MSW is initialized
(async () => {
  if (!isLocalhost) {
    try {
      const response = await fetch(`/${repoName}/versions.json`, {
        signal: AbortSignal.timeout(4000),
      });
      if (response.ok) {
        const manifest = await response.json();
        if (Array.isArray(manifest) && manifest.length > 0) {
          dynamicVersionItems = manifest;
          console.log('Dynamic versions loaded:', dynamicVersionItems);
        }
      }
    } catch (error) {
      console.warn('Version manifest unavailable, falling back to active version:', error);
    }
  }
})();

// Build toolbar items using displayLabel from manifest
const versionToolbarItems = dynamicVersionItems.map(item => ({
  value: item.value,
  title: item.displayLabel
}));

// Create a map for quick lookup of actual version by value
const versionMap = Object.fromEntries(
  dynamicVersionItems.map(item => [item.value, item.actualVersion])
);

// --- Define CSF Next Preview Configuration ---
export default definePreview({
  loaders: [mswLoader],
  addons: [
    addonDocs(),
    addonA11y()
  ],
  parameters: {
    docs: {
      theme: themes.dark,
      source: {
        /**
         * Cleans the code snippet before it is displayed in the "Docs" tab.
         * It removes the wrapper we added in the decorator below.
         */
        transform: (code: string) => {
          return code
            .replace(/^@if\s*\(true\)\s*\{\s*/, '') // Remove opening
            .replace(/\s*\}$/, '')                 // Remove closing
            .trim();
        },
      },
    },
    msw: {
      handlers: [pixabayHandler, versionsHandler],
    },
    options: {
      storySort: {
        order: [
          'Documentations',
          ['Introduction', 'Getting Started', 'Defining Template', 'Layout', 'Alignment', 'Item Templates', 'Using Images', 'Styling', 'a11y', 'i18n'],
          'Addons',
          ['Autoplay', 'Autoheight'],
          '*'
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Change theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true
      }
    },
    // Dynamic versions fed from server-side json file
    releaseVersion: {
      description: 'Switch Library Releases',
      defaultValue: activeFolderOnServer, // Autofocus dropdown value onto the active directory path
      toolbar: {
        title: `Version: ${versionMap[activeFolderOnServer] || activeFolderOnServer}`,
        icon: 'book',
        items: versionToolbarItems,
        dynamicTitle: true,
      },
    },
    initialGlobals: {
      theme: 'dark',
      releaseVersion: activeFolderOnServer // Dynamically balance context key assignments
    },
    decorators: [
      // 1. Version Swapping Safe Route Decoupler
      (storyFn, context) => {
        const selectedVersion = context.globals['releaseVersion'];
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        if (!isLocalhost && selectedVersion) {
          const segments = window.location.pathname.split('/').filter(Boolean);
          const currentRepo = segments[0];
          const activeFolder = segments[1];

          // Route breaking check to completely decouple string matching traps
          if (activeFolder && activeFolder !== selectedVersion) {
            window.top.location.href = `/${ currentRepo }/${ selectedVersion }/`;
            return storyFn();
          }
        }

        return storyFn();
      },
      // 2. Core Color/Theme Global Strategy Decorator with Dynamic Version Display
      (storyFn, context) => {
        const theme: string = context.globals['theme'] || 'dark';
        const selectedVersion = context.globals['releaseVersion'];
        const actualVersion = versionMap[selectedVersion] || selectedVersion;

        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.style.colorScheme = theme;

        // Update the toolbar title dynamically when selection changes
        // This is handled by Storybook's dynamicTitle: true, but we ensure version map is accurate
        return storyFn();
      },
      // 3. Gallery-thumbs override bug mitigation workaround
      componentWrapperDecorator((story) => `@if(true) { ${ story } }`),
    ],
  }
});
