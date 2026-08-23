import { defineMain } from '@storybook/angular-vite/node';
import remarkGfm from 'remark-gfm';

export default defineMain({
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)'
  ],
  addons: [
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          }
        }
      }
    }
  ],
  framework: {
    name: '@storybook/angular-vite',
    options: {
      compodoc: true,
      compodocArgs: [
        '-e',
        'json',
        '-d',
        'projects/ng-gallery',
        '--disablePrivate',
        '--disableProtected',
        '--disableInternal',
        '--minimal',
      ]
    }
  },
  viteFinal: async (config) => {
    // this is just to hide the 404 not found error of this script
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: 'strip-mocker-entry-script',
      enforce: 'post',
      transformIndexHtml(html) {
        // Remove the hardcoded <script src="/vite-inject-mocker-entry.js"> tag
        return html.replace(
          /<script[^>]*src="\/vite-inject-mocker-entry\.js"[^>]*><\/script>/g,
          ''
        );
      },
    });
    return config;
  },
  staticDirs: [
    '../src', // 👈 serves mockServiceWorker.js
    './public', // 👈 serves mock versions.json for local testing
  ],
});
