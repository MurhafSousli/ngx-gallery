import { coreVersion, compareCore, normalizeManifestEntry } from './version-utils';

export interface VersionItem {
  version: string;
  title: string;
  right?: string;
}

export interface ManifestEntry {
  version: string;
  path: string;
}

/**
 * Builds the version items for the Storybook toolbar based on the versions manifest.
 * Rules:
 * - Only show the latest patch of each major version.
 * - Latest stable version is displayed as "{major}.0.0 (latest)" (e.g. "13.0.0 (latest)").
 * - Next/Pre-release version is displayed as "Next".
 * - If the latest stable version is higher than the pre-release version, pre-release is hidden.
 * - Previous major versions are displayed as "v{major}" (e.g., "v12").
 * - When an item is selected, it should display the actual full version.
 */
export function buildVersionItems(manifest: ManifestEntry[]): VersionItem[] {
  if (!manifest || !manifest.length) {
    return [];
  }

  const entries = manifest.map(normalizeManifestEntry);

  // Separate into stable and next
  const stableEntries = entries.filter(e => !e.isNext);
  const nextEntries = entries.filter(e => e.isNext);

  // Group stable entries by major version
  const byMajor: Record<string, any[]> = {};
  stableEntries.forEach(e => {
    const major = coreVersion(e.version).parts[0];
    if (!byMajor[major]) byMajor[major] = [];
    byMajor[major].push(e);
  });

  // For each major, find the highest version
  const highestByMajor = Object.keys(byMajor).map(major => {
    const versions = byMajor[major].sort((a, b) => compareCore(b.version, a.version));
    return versions[0]; // highest in this major
  });

  // Sort majors descending
  highestByMajor.sort((a, b) => compareCore(b.version, a.version));

  const latestStable = highestByMajor.length > 0 ? highestByMajor[0] : null;
  const highestNext = nextEntries.sort((a, b) => compareCore(b.version, a.version))[0];

  const items: VersionItem[] = [];

  // Add Next if it exists and is greater than latest stable
  if (highestNext) {
    let shouldAddNext = true;
    if (latestStable && compareCore(latestStable.version, highestNext.version) >= 0) {
      shouldAddNext = false;
    }
    if (shouldAddNext) {
      items.push({
        version: highestNext.id,
        title: 'Next',
        right: highestNext.version
      });
    }
  }

  // Add latest stable
  if (latestStable) {
    const major = coreVersion(latestStable.version).parts[0];
    items.push({
      version: latestStable.id,
      title: `${major}.0.0 (latest)`,
      right: latestStable.version
    });
  }

  // Add previous majors
  for (let i = 1; i < highestByMajor.length; i++) {
    const entry = highestByMajor[i];
    const major = coreVersion(entry.version).parts[0];
    items.push({
      version: entry.id,
      title: `v${major}`,
      right: entry.version
    });
  }

  return items;
}
