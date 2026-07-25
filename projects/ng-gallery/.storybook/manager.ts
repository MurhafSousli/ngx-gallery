import { addons, types } from 'storybook/manager-api';
import { VersionSwitcher } from './addons/version-addon/version-addon';
import { ThemeSwitcher } from './addons/theme-addon/theme-addon-manager';

addons.setConfig({
  initialActive: 'Stories/Introduction',
  panelPosition: 'right'
});

const ADDON_ID = 'ngx-gallery';

addons.register(ADDON_ID, () => {
  addons.add(`${ADDON_ID}/version-tool`, {
    type: types.TOOL,
    title: 'Docs Version',
    match: ({ viewMode }) => !!(viewMode?.match(/^(story|docs)$/)),
    render: VersionSwitcher,
  });

  addons.add(`${ADDON_ID}/theme-tool`, {
    type: types.TOOL,
    title: 'Theme Toggle',
    match: ({ viewMode }) => !!(viewMode?.match(/^(story|docs)$/)),
    render: ThemeSwitcher,
  });
});
