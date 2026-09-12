import React, { useState } from 'react';
import { useStorybookApi, addons } from 'storybook/manager-api';
import { Button } from 'storybook/internal/components';
import { SunIcon, MoonIcon } from '@storybook/icons';
import { themes } from 'storybook/theming';

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');
  const api = useStorybookApi();

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // 1. Update manager button state
    setCurrentTheme(nextTheme);

    // 2. Update Storybook Shell UI theme
    api.setOptions({
      theme: nextTheme === 'dark' ? themes.dark : themes.light
    });

    // 3. Emit event to preview without tearing down canvas iframe
    addons.getChannel().emit('THEME_CHANGED', nextTheme);
  };

  const CurrentIcon = currentTheme === 'dark' ? MoonIcon : SunIcon;

  return (
    <Button
      key="theme-toggle"
      variant="ghost"
      title={ `Switch to ${ currentTheme === 'dark' ? 'light' : 'dark' } theme` }
      onClick={ toggleTheme }
    >
      <CurrentIcon />

      <span
        style={ {
          marginLeft: 6,
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'sans-serif',
          textTransform: 'capitalize',
        } }
      >
        { currentTheme }
      </span>
    </Button>
  );
};
