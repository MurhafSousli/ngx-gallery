import { Signal } from '@angular/core';

export abstract class IntersectionSensorContext {
  abstract visibleEntries: Signal<Record<string, IntersectionObserverEntry>>;
  abstract anchorIndex: Signal<number>;
  abstract stableIndex: Signal<number>;
}
