// Utilities extracted from preview.ts to keep preview small and testable

export function coreVersion(version: string) {
  const core = (version || '').split('-')[0];
  const parts = core.split('.').map(p => parseInt(p, 10) || 0);
  return { core, parts } as { core: string; parts: number[] };
}

export function compareCore(a: string, b: string) {
  const A = coreVersion(a).parts;
  const B = coreVersion(b).parts;
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const ai = A[i] || 0;
    const bi = B[i] || 0;
    if (ai > bi) return 1;
    if (ai < bi) return -1;
  }
  return 0;
}

// Normalize a manifest entry into an object { id, version, isNext }
export function normalizeManifestEntry(item: any) {
  const id = item.path || item.value || item.id || String(item);
  const version = item.version || item.actualVersion || item.value || item.path || String(item.version || item.value || item.path || '');
  const isNext = (id === 'next') || /-next\./.test(String(version)) || /next/.test(String(id));
  return { id: String(id), version: String(version), isNext };
}

