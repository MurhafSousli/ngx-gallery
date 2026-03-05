import { componentWrapperDecorator, definePreview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import addonDocs from '@storybook/addon-docs';
import addonA11y from '@storybook/addon-a11y';
import { themes } from 'storybook/theming';
import { initialize, mswLoader } from 'msw-storybook-addon';

import docJson from '../documentation.json';
import { pixabayHandler } from '#.storybook/mocks/pixabay.handler';

setCompodocJson(docJson);

// Initialize MSW globally
initialize({
  onUnhandledRequest: 'bypass',
});

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
      handlers: [pixabayHandler],
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
    // Added your version switcher global configuration
    releaseVersion: {
      description: 'Switch Library Releases',
      defaultValue: 'v13', // Update this baseline value when you upgrade to v14
      toolbar: {
        title: 'Version',
        icon: 'book',
        items: [
          { value: 'v13', title: 'v13 (Latest)' }
          // Append future major version release hooks here (e.g., { value: 'v14', title: 'v14' })
        ],
        dynamicTitle: true,
      },
    }
  },
  initialGlobals: {
    theme: 'dark',
    releaseVersion: 'v13'
  },
  decorators: [
    // 1. Version Switcher Redirect Handler Interceptor
    (storyFn, context) => {
      const selectedVersion = context.globals['releaseVersion'];
      const currentPath = window.location.pathname;
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

      // 🟢 Only redirect if we are NOT on localhost AND the path doesn't match our version directory
      if (!isLocalhost && selectedVersion && !currentPath.includes(`/${selectedVersion}/`)) {
        const repoName = currentPath.split('/')[1];

        // Triggers parent browser window context redirection straight to the old directory
        window.location.href = `/${repoName}/${selectedVersion}/`;
      }
      return storyFn();
    },
    // 2. Core Color/Theme Global Strategy Decorator
    (storyFn, context) => {
      const theme: string = context.globals['theme'] || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      return storyFn();
    },
    // 3. Gallery-thumbs override bug mitigation workaround
    componentWrapperDecorator((story) => `@if(true) { ${story} }`),
  ],
});
