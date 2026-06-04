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

// --- Context and Path Resolution ---
const currentPath = window.location.pathname; // e.g., "/ngx-gallery/v13-alpha/"
const pathSegments = currentPath.split('/').filter(Boolean);
const repoName = pathSegments[0] || 'ngx-gallery';
const activeFolderOnServer = pathSegments[1] || 'Local';

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

const swUrl = isLocalhost
  ? '/mockServiceWorker.js'
  : `/${ repoName }/${ activeFolderOnServer }/mockServiceWorker.js`;

initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: swUrl },
});

// Seed the baseline array with your safe active server directory fallback
const dynamicVersionItems = [
  { value: activeFolderOnServer, title: activeFolderOnServer }
];

// Completely non-blocking background fetch operation via your async IIFE pattern
(async () => {
  if (!isLocalhost) {
    try {
      const response = await fetch(`/${ repoName }/versions.json`, {
        signal: AbortSignal.timeout(4000),
      });
      if (response.ok) {
        const manifest = await response.json();
        if (Array.isArray(manifest) && manifest.length > 0) {
          // Clear the baseline item without breaking the array reference pointer
          dynamicVersionItems.length = 0;

          // Push the fresh values directly into the stable array reference
          manifest.forEach(item => {
            dynamicVersionItems.push({
              value: item.value,       // e.g., "v13-alpha"
              title: item.displayLabel  // e.g., "v13 Alpha"
            });
          });
        }
      }
    } catch (error) {
      console.warn('Version manifest unavailable, falling back to active version:', error);
    }
  }
})();

// --- Define CSF Next Preview Configuration ---
export default definePreview({
  addons: [
    addonDocs(),
    addonA11y()
  ],
  loaders: [mswLoader],
  parameters: {
    docs: {
      theme: themes.dark,
      source: {
        transform: (code: string) => {
          return code
            .replace(/^@if\s*\(true\)\s*\{\s*/, '')
            .replace(/\s*\}$/, '')
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
    releaseVersion: {
      description: 'Switch Library Releases',
      defaultValue: activeFolderOnServer,
      toolbar: {
        title: 'Version',
        icon: 'book',
        // Passes the live-mutated array reference directly
        items: dynamicVersionItems,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
    releaseVersion: activeFolderOnServer
  },
  decorators: [
    // 1. Version Swapping Router Handler (Only reads from stable, existing context properties)
    (storyFn, context) => {
      const selectedVersion = context.globals['releaseVersion'];

      if (!isLocalhost && selectedVersion) {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const currentRepo = segments[0];
        const activeFolder = segments[1];

        if (activeFolder && activeFolder !== selectedVersion) {
          window.top.location.href = `/${ currentRepo }/${ selectedVersion }/`;
          return storyFn();
        }
      }
      return storyFn();
    },

    // 2. Global Style & Theme Strategy Decorator
    (storyFn, context) => {
      const theme: string = context.globals['theme'] || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      return storyFn();
    },

    // 3. Structural template hack wrapper mitigation
    componentWrapperDecorator((story) => `@if(true) { ${ story } }`),
  ],
});
