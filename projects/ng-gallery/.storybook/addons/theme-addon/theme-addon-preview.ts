import React, { useState, useEffect } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { addons } from 'storybook/internal/preview-api';
import { darkTheme, lightTheme } from './themes';

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

// Module-level channel listener for standard preview frames
const channel = addons.getChannel();
channel.on('THEME_CHANGED', (newTheme: 'light' | 'dark') => {
  applyThemeToDOM(newTheme);
});

// --- THE MDX WORKAROUND CONTAINER ---
export const ThemedDocsContainer = (props: any) => {
  const containerChannel = props.context?.channel || addons.getChannel();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (!containerChannel) return;

    const handleThemeChange = (newTheme: 'light' | 'dark') => {
      setCurrentTheme(newTheme);
      applyThemeToDOM(newTheme);
    };

    containerChannel.on('THEME_CHANGED', handleThemeChange);

    // Request active theme from manager on mount (handles page navigation)
    containerChannel.emit('GET_CURRENT_THEME');

    return () => {
      containerChannel.off('THEME_CHANGED', handleThemeChange);
    };
  }, [containerChannel]);

  const activeDocsTheme = currentTheme === 'dark' ? darkTheme : lightTheme;
  return React.createElement(DocsContainer, { ...props, theme: activeDocsTheme });
};

// --- THE CANVAS IFRAME DECORATOR ---
export const withGlobalTheme = (storyFn: any, context: any) => {
  const storyChannel = context.channel || addons.getChannel();

  // Ask manager for current theme when story mounts
  storyChannel.emit('GET_CURRENT_THEME');

  return storyFn();
};
