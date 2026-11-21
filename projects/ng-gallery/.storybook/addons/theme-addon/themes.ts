import { create } from 'storybook/theming';

export const lightTheme = create({
  base: 'light',
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Angular Gallery',
  brandImage: 'ng-gallery.png',
  brandTarget: '_self',
  // colorPrimary: '#3a95ff',
  // colorSecondary: '#c2c6ce',
  // appContentBg: '#797979',
});

export const darkTheme = create({
  base: 'dark',
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Angular Gallery',
  brandImage: 'ng-gallery.png',
  brandTarget: '_self',
  // colorPrimary: '#3a95ff',
  // colorSecondary: '#c2c6ce',
  // appContentBg: '#797979',
});
