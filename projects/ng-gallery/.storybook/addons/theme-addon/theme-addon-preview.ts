import React, { useState, useEffect } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';
import { addons } from 'storybook/internal/preview-api';

// Helper to mutate DOM theme attributes without re-rendering components
const applyThemeToDOM = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;

  const body = document.body;
  if (body) {
    body.setAttribute('data-theme', theme);
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
  }
};

// Listen globally at the preview module level for DOM theme updates
const channel = addons.getChannel();
channel.on('THEME_CHANGED', (newTheme: 'light' | 'dark') => {
  applyThemeToDOM(newTheme);
});

// --- THE MDX WORKAROUND CONTAINER ---
export const ThemedDocsContainer = (props: any) => {
  const containerChannel = props.context?.channel;
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (!containerChannel) return;

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
      setCurrentTheme(newTheme);
      applyThemeToDOM(newTheme);
    };

    containerChannel.on('THEME_CHANGED', handleThemeChange);
    return () => {
      containerChannel.off('THEME_CHANGED', handleThemeChange);
    };
  }, [containerChannel]);

  const activeDocsTheme = currentTheme === 'dark' ? themes.dark : themes.light;
  return React.createElement(DocsContainer, { ...props, theme: activeDocsTheme });
};

// --- THE CANVAS IFRAME DECORATOR ---
export const withGlobalTheme = (storyFn: any, context: any) => {
  const theme = context.globals['theme'] || 'dark';
  applyThemeToDOM(theme);

  return storyFn();
};
