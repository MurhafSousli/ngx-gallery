import React, { useState, useEffect } from 'react';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { themes } from 'storybook/theming';

// --- THE MDX WORKAROUND CONTAINER (For preview.ts) ---
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

// --- THE CANVAS IFRAME DECORATOR (For preview.ts) ---
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

