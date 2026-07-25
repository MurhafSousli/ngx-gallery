import React, { useState, useEffect } from 'react';
import { useGlobals, useStorybookApi } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { SunIcon, MoonIcon } from '@storybook/icons';
import { themes } from 'storybook/theming';
import { FORCE_RE_RENDER } from 'storybook/internal/core-events';

// --- THE TOGGLE COMPONENT (For manager.ts) ---
export const ThemeSwitcher: React.FC = () => {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();
  const currentTheme = globals['theme'] || 'dark';

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateGlobals({ theme: nextTheme });
    api.setOptions({
      theme: nextTheme === 'dark' ? themes.dark : themes.light,
    });
    api.emit(FORCE_RE_RENDER);
  };

  const CurrentIcon = currentTheme === 'dark' ? MoonIcon : SunIcon;

  return (
    <IconButton
      key="theme-toggle"
      title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
      active={false}
      onClick={toggleTheme}
    >
      <CurrentIcon />
      <span style={{ marginLeft: 6, fontSize: 12, fontWeight: 500, fontFamily: 'sans-serif', textTransform: 'capitalize' }}>
        {currentTheme}
      </span>
    </IconButton>
  );
};

