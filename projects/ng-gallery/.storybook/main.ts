import { defineMain } from '@storybook/angular/node';
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
  framework: '@storybook/angular',
  staticDirs: [
    '../src', // 👈 serves mockServiceWorker.js
  ],
});
