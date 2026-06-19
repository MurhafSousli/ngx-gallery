import React, { useEffect, useState, useMemo } from 'react';
import { useGlobals } from 'storybook/manager-api';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList
} from 'storybook/internal/components';
import { CategoryIcon } from '@storybook/icons';
import { buildVersionItems, ManifestEntry, VersionItem } from './versions-builder';


const activeFolderOnServer = window.location.pathname.split('/')[2] || 'latest';
const isLocalhost = window.location.hostname === 'localhost';
const repoName = 'ngx-gallery';
const versionsUrl = '/versions.json';

export const VersionSwitcher: React.FC = () => {
  const [globals, updateGlobals] = useGlobals();
  const [versions, setVersions] = useState<VersionItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentValue = globals['releaseVersion'] || activeFolderOnServer;

  useEffect(() => {
    fetch(versionsUrl)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${ r.status }`);
        return r.json();
      })
      .then((manifest: ManifestEntry[]) => {
        const items: VersionItem[] = Array.isArray(manifest) ? buildVersionItems(manifest) : [];
        setVersions(
          items.length > 0
            ? items
            : [{ version: activeFolderOnServer, title: isLocalhost ? 'Local' : activeFolderOnServer }]
        );
      })
      .catch(() => {
        setVersions([{ version: activeFolderOnServer, title: isLocalhost ? 'Local' : activeFolderOnServer }]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (item: VersionItem) => {
    updateGlobals({ releaseVersion: item.version });
    if (!isLocalhost) {
      window.top!.location.href = `/${ repoName }/${ item.version }/`;
    }
  };

  // FIXED: Explicitly use standard string mappings for 'id' and 'title'
  const links = useMemo(() => {
    return versions.map((item) => {
      return {
        id: `version-${ item.version }`, // Must be a unique string ID
        title: item.title,     // Must be a clean string, NOT a React Element node
        right: item.right,
        active: item.version === currentValue,
        onClick: () => handleSelect(item),
      }
    });
  }, [versions, currentValue]);

  const selectedItem = versions.find((v) => v.version === currentValue) || versions[0];

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={ <TooltipLinkList links={ links }/> }
    >
      <IconButton
        key="version-switcher"
        title="Switch documentation version"
        active={ false }
        disabled={ loading }
      >
        <CategoryIcon/>
        <span style={ { marginLeft: 6, fontSize: 12, fontWeight: 500, fontFamily: 'sans-serif', textTransform: 'capitalize' } }>
          { loading ? 'Loading…' : `${ selectedItem?.version }` }
        </span>
      </IconButton>
    </WithTooltip>
  );
};
