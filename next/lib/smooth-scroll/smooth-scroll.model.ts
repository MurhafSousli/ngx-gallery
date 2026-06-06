import { _XAxis, _YAxis } from '@angular/cdk/scrolling';

export type SmoothScrollOptions = Partial<Pick<_XAxis, keyof _XAxis> & Pick<_YAxis, keyof _YAxis>> & {
  behavior?: ScrollBehavior;
}

export type SmoothScrollToOptions = SmoothScrollOptions & {
  duration?: number;
  easing?: BezierEasingOptions;
};

export interface SmoothScrollStep {
  startX: number;
  startY: number;
  x: number;
  y: number;
  duration: number;
  easing: BezierEasingOptions;
  currentX?: number;
  currentY?: number;
}

export interface BezierEasingOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Interface for options provided for smooth scrolling to an element.
 */
export type SmoothScrollToElementOptions = SmoothScrollToOptions & { center?: boolean };
