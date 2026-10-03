import { create } from 'storybook/theming';

export const lightTheme = create({
  base: 'light',
  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',
  brandTitle: 'Angular Gallery',
  brandImage: 'light-logo.png',
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
  // brandImage: 'https://github.com/MurhafSousli/ngx-gallery/assets/8130692/f9a4a981-7a61-4f3d-9e00-06ec3b2efd1c',
  brandImage: 'dark-logo.png',
  brandTarget: '_self',
  // colorPrimary: '#3a95ff',
  // colorSecondary: '#c2c6ce',
  // appContentBg: '#797979',
});
