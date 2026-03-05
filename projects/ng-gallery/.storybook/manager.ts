import { addons } from 'storybook/manager-api';
import darkTheme from './dark-theme';

addons.setConfig({
  initialActive: 'Stories/Introduction',
  theme: darkTheme
});
