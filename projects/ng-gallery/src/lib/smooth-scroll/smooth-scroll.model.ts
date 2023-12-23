import { _XAxis, _YAxis } from '@angular/cdk/scrolling';

export type SmoothScrollOptions = _XAxis & _YAxis & {
  behavior?: ScrollBehavior;
}

export type SmoothScrollToOptions = _XAxis & _YAxis & {
  duration?: number;
  easing?: BezierEasingOptions;
};

export interface SmoothScrollStep {
  scrollable: HTMLElement;
  startTime: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  duration: number;
  easing: (k: number) => number;
  currentX?: number;
  currentY?: number;
}

export interface BezierEasingOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
