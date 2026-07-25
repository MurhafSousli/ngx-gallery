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
  framework: '@storybook/angular-vite',
  staticDirs: [
    '../src', // 👈 serves mockServiceWorker.js
    './public', // 👈 serves mock versions.json for local testing
  ],
});
