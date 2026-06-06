import { componentWrapperDecorator, definePreview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import addonDocs from '@storybook/addon-docs';
import addonA11y from '@storybook/addon-a11y';
import { themes } from 'storybook/theming';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { coreVersion, compareCore, normalizeManifestEntry } from './version-utils';

import docJson from '../documentation.json';
import { pixabayHandler } from '#.storybook/mocks/pixabay.handler';
import { versionsHandler } from '#.storybook/mocks/versions.handler';

setCompodocJson(docJson);

// --- Context and Path Resolution ---
const currentPath = window.location.pathname; // e.g., "/ngx-gallery/13.0.1/" or "/ngx-gallery/next/"
const pathSegments = currentPath.split('/').filter(Boolean);
const repoName = pathSegments[0] || 'ngx-gallery';
const activeFolderOnServer = pathSegments[1] || 'Local';

const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);

const swUrl = isLocalhost
  ? '/mockServiceWorker.js'
  : `/${ repoName }/${ activeFolderOnServer }/mockServiceWorker.js`;

initialize({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: swUrl },
});

// Stable array reference used directly by Storybook toolbar configuration
const dynamicVersionItems: { value: string; title: string }[] = [];

// Non-blocking background fetch operation to build a clean Angular Material style layout
(async () => {
  // Local development fallback: show only 'Local' option with no dropdown list
  if (isLocalhost) {
    dynamicVersionItems.length = 0;
    dynamicVersionItems.push({ value: 'Local', title: 'Local' });
    return;
  }

  try {
    const response = await fetch(`/${ repoName }/versions.json`, {
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return;

    const manifest = await response.json();
    if (!Array.isArray(manifest) || manifest.length === 0) return;

    // Normalize incoming manifest entries to a consistent shape
    const entries = manifest
      .map((item: any) => normalizeManifestEntry(item))
      .filter(e => e.version && e.version.trim().length > 0);

    // Separate stable versions vs pre-releases
    const stable = entries.filter(e => !/-/.test(e.version));
    const prereleases = entries.filter(e => /-/.test(e.version) || e.isNext);

    // 1. Determine the single highest stable release (e.g., "13.0.1")
    let latestStable = stable.slice().sort((a, b) => compareCore(b.version, a.version))[0];
    if (!latestStable && entries.length > 0) {
      latestStable = entries[0];
    }

    // 2. Determine target candidates for the "Next" pre-release channel
    const explicitNext = entries.find(e => e.id === 'next');
    const highestPrerelease = prereleases.slice().sort((a, b) => compareCore(b.version, a.version))[0];
    const nextEntry = explicitNext || highestPrerelease;

    const items: { value: string; title: string }[] = [];

    // 3. Add 'Next' strictly on top if its core semver version is higher than latest stable core
    if (nextEntry && latestStable) {
      if (compareCore(nextEntry.version, latestStable.version) > 0) {
        items.push({ value: nextEntry.id, title: 'Next' }); // value: 'next'
      }
    } else if (nextEntry && !latestStable) {
      items.push({ value: nextEntry.id, title: 'Next' });
    }

    // 4. Pin the exact latest stable release directly below Next
    if (latestStable) {
      items.push({ value: latestStable.id, title: `${ latestStable.version } (latest)` }); // value: '13.0.1'
    }

    // 5. Group historic stable entries by major version and extract the highest available patch for each major line
    const byMajor = new Map<number, { id: string; version: string }>();
    stable.forEach(e => {
      const major = coreVersion(e.version).parts[0] || 0;
      const existing = byMajor.get(major);
      if (!existing || compareCore(e.version, existing.version) > 0) {
        byMajor.set(major, { id: e.id, version: e.version });
      }
    });

    // 6. Sort major collections down chronologically, excluding the latest stable major line to prevent duplication
    const latestMajor = latestStable ? coreVersion(latestStable.version).parts[0] : null;
    Array.from(byMajor.entries())
      .sort((a, b) => b[0] - a[0])
      .forEach(([major, info]) => {
        if (latestMajor !== null && major === latestMajor) return; // Skip current active major duplicate

        // Value points directly to the top available patch folder ('12.0.3'), label shows abstract 'v12'
        items.push({ value: info.id, title: `v${ major }` });
      });

    // Fallback safeguard to active environment context folder
    if (items.length === 0) {
      items.push({ value: activeFolderOnServer, title: activeFolderOnServer });
    }

    // Mutate state hook reference atomically so Storybook redraws the options panel cleanly
    dynamicVersionItems.length = 0;
    items.forEach(i => dynamicVersionItems.push(i));

  } catch (error) {
    console.warn('Version manifest unavailable, falling back to active version:', error);
    dynamicVersionItems.length = 0;
    dynamicVersionItems.push({ value: activeFolderOnServer, title: activeFolderOnServer });
  }
})();

// --- Define CSF Next Preview Configuration ---
export default definePreview({
  addons: [
    addonDocs(),
    addonA11y()
  ],
  loaders: [mswLoader],
  parameters: {
    docs: {
      theme: themes.dark,
      source: {
        transform: (code: string) => {
          return code
            .replace(/^@if\s*\(true\)\s*\{\s*/, '')
            .replace(/\s*}$/, '')
            .trim();
        },
      },
    },
    msw: {
      handlers: [pixabayHandler, versionsHandler],
    },
    options: {
      storySort: {
        order: [
          'Documentations',
          ['Introduction', 'Getting Started', 'Defining Template', 'Layout', 'Alignment', 'Item Templates', 'Using Images', 'Styling', 'a11y', 'i18n'],
          'Addons',
          ['Autoplay', 'Autoheight'],
          '*'
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Change theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true
      }
    },
    releaseVersion: {
      description: 'Switch Library Releases',
      defaultValue: activeFolderOnServer,
      toolbar: {
        title: 'Version',
        icon: 'book',
        items: dynamicVersionItems,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
    releaseVersion: activeFolderOnServer
  },
  decorators: [
    // 1. Version Swapping Router Handler (Syncs selected folder keys to browser tab destination)
    (storyFn, context) => {
      const selectedVersion = context.globals['releaseVersion'];

      if (!isLocalhost && selectedVersion) {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const currentRepo = segments[0];
        const activeFolder = segments[1];

        // Compares folder keys directly (e.g. "13.0.1" !== "12.0.3") avoiding routing lockouts
        if (activeFolder && activeFolder !== selectedVersion) {
          window.top.location.href = `/${ currentRepo }/${ selectedVersion }/`;
          return storyFn();
        }
      }
      return storyFn();
    },

    // 2. Global Style & Theme Strategy Decorator
    (storyFn, context) => {
      const theme: string = context.globals['theme'] || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
      return storyFn();
    },

    // 3. Structural template hack wrapper mitigation
    componentWrapperDecorator((story) => `@if(true) { ${ story } }`),
  ],
});
