export type NavigationSource = 'api' | 'sync' | 'init';

export interface NavigationTarget {
  index: number;
  behavior?: ScrollBehavior;
  source?: NavigationSource;
}

export interface NavigationShift {
  steps?: number | 'page';
  behavior?: ScrollBehavior;
  loop?: boolean;
}
