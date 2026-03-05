import { Signal } from '@angular/core';

export interface ElementDimensions {
  width: number;
  height: number;
}

export interface ResizeObserverResponse {
  viewport: ElementDimensions;
  content: ElementDimensions;
}

export abstract class ResizeSensorContext {
  abstract layoutReady: Signal<boolean>;
  abstract isScrollable: Signal<boolean>;
  abstract viewportSize: Signal<ElementDimensions>;
  abstract contentSize: Signal<ElementDimensions>;
}
