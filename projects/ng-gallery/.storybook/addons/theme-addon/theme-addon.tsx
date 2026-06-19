import React, { useState, useEffect } from 'react';
import { useGlobals, useStorybookApi } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { SunIcon, MoonIcon } from '@storybook/icons';
import { themes } from 'storybook/theming';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { FORCE_RE_RENDER } from 'storybook/internal/core-events';

// --- 1. THE TOGGLE COMPONENT (For manager.ts) ---
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

// --- 2. THE MDX WORKAROUND CONTAINER (For preview.ts) ---
export const ThemedDocsContainer = (props: any) => {
  const channel = props.context?.channel;
  const [currentTheme, setCurrentTheme] = useState(() => {
    return channel?.last('updateGlobals')?.[0]?.globals?.theme || 'dark';
  });

  useEffect(() => {
    if (!channel) { // @ts-ignore
      return;
    }
    const handleGlobalsUpdate = ({ globals }: any) => {
      if (globals?.theme) setCurrentTheme(globals.theme);
    };
    channel.on('updateGlobals', handleGlobalsUpdate);
    return () => {
      channel.off('updateGlobals', handleGlobalsUpdate);
    };
  }, [channel]);

  const activeDocsTheme = currentTheme === 'dark' ? themes.dark : themes.light;
  return React.createElement(DocsContainer, { ...props, theme: activeDocsTheme });
};

// --- 3. THE CANVAS IFRAME DECORATOR (For preview.ts) ---
export const withGlobalTheme = (storyFn: any, context: any) => {
  const theme: string = context.globals['theme'] || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;

  const body = document.querySelector('body');
  if (body) {
    body.setAttribute('data-theme', theme);
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
  }
  return storyFn();
};
