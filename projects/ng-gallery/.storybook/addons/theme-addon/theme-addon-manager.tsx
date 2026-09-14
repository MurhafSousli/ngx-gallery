import React, { useState } from 'react';
import { useStorybookApi, addons } from 'storybook/manager-api';
import { Button } from 'storybook/internal/components';
import { SunIcon, MoonIcon } from '@storybook/icons';
import { darkTheme, lightTheme } from './themes';

// Track manager-side theme memory across page navigations
let activeTheme: 'light' | 'dark' = 'dark';

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(activeTheme);
  const api = useStorybookApi();

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    activeTheme = nextTheme;

    // 1. Update button state
    setCurrentTheme(nextTheme);

    // 2. Update Storybook Shell UI theme
    api.setOptions({
      theme: nextTheme === 'dark' ? darkTheme : lightTheme
    });

    // 3. Emit event to preview iframe
    const channel = addons.getChannel();
    channel.emit('THEME_CHANGED', nextTheme);
  };

  // Listen for initial theme requests from newly mounted MDX pages
  React.useEffect(() => {
    const channel = addons.getChannel();
    const handleGetTheme = () => {
      channel.emit('THEME_CHANGED', activeTheme);
    };

    channel.on('GET_CURRENT_THEME', handleGetTheme);
    return () => {
      channel.off('GET_CURRENT_THEME', handleGetTheme);
    };
  }, []);

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
