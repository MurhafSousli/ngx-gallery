import { definePreview } from '@storybook/angular-vite';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import addonDocs from '@storybook/addon-docs';
import addonA11y from '@storybook/addon-a11y';
import addonMsw from 'msw-storybook-addon';
import { setupWorker } from 'msw/browser';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/material-icons';

import '#.storybook/styles.scss';
import '#glass-theme.css';

import { pixabayHandler } from '#.storybook/mocks/pixabay.handler';

// Import your decoupled addon parameters
import {
  ThemedDocsContainer,
  withGlobalTheme,
} from '#.storybook/addons/theme-addon/theme-addon-preview';

import docJson from '../documentation.json';

setCompodocJson(docJson);

const currentPath = window.location.pathname;
const pathSegments = currentPath.split('/').filter(Boolean);
const repoName = pathSegments[0] || 'ngx-gallery';
const activeFolderOnServer = pathSegments[1] || 'Local';

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const swUrl = isLocalhost
  ? '/mockServiceWorker.js'
  : `/${repoName}/${activeFolderOnServer}/mockServiceWorker.js`;

export default definePreview({
  addons: [
    addonMsw(async () => {
      const worker = setupWorker();
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: { url: swUrl },
      });
      return worker;
    }),
    addonDocs(),
    addonA11y(),
  ],
  beforeEach({ msw }) {
    msw.use(pixabayHandler);
  },
  parameters: {
    options: {
      storySort: {
        order: [
          'Documentations',
          [
            'Introduction',
            'Getting Started',
            'Defining Template',
            'Layout',
            'Alignment',
            'Item Templates',
            'Using Images',
            'Styling',
            'a11y',
            'i18n',
          ],
          'Addons',
          ['Autoplay', 'Autoheight'],
          '*',
        ],
      },
    },
    // Cleanly bound parameter
    docs: {
      container: ThemedDocsContainer,
    },
  },
  initialGlobals: {
    theme: 'dark',
    releaseVersion: activeFolderOnServer,
  },
  decorators: [
    withGlobalTheme
  ],
});
