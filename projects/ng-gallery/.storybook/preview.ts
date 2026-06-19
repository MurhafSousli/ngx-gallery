import { componentWrapperDecorator, definePreview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import addonDocs from '@storybook/addon-docs';
import addonA11y from '@storybook/addon-a11y';
import { initialize, mswLoader } from 'msw-storybook-addon';

import docJson from '../documentation.json';
import { pixabayHandler } from '#.storybook/mocks/pixabay.handler';

// Import your decoupled addon parameters
import { ThemedDocsContainer, withGlobalTheme } from '#.storybook/addons/theme-addon/theme-addon';

setCompodocJson(docJson);

const currentPath = window.location.pathname;
const pathSegments = currentPath.split('/').filter(Boolean);
const repoName = pathSegments[0] || 'ngx-gallery';
const activeFolderOnServer = pathSegments[1] || 'Local';

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const swUrl = isLocalhost
  ? '/mockServiceWorker.js'
  : `/${repoName}/${activeFolderOnServer}/mockServiceWorker.js`;

initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: swUrl },
});

export default definePreview({
  addons: [
    addonDocs(),
    addonA11y()
  ],
  loaders: [mswLoader],
  parameters: {
    msw: { handlers: [pixabayHandler] },
    options: {
      storySort: {
        order: [
          'Documentations',
          ['Introduction', 'Getting Started', 'Defining Template', 'Layout', 'Alignment', 'Item Templates', 'Using Images', 'Styling', 'a11y', 'i18n'],
          'Addons', ['Autoplay', 'Autoheight'], '*'
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
    releaseVersion: activeFolderOnServer
  },
  decorators: [
    withGlobalTheme, // Simple reference
    componentWrapperDecorator((story) => `@if(true) { ${story} }`),
  ],
});
