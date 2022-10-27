import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP } from './base-adapter';
import { GalleryConfig } from '../../models/config.model';

/**
 * Common properties for both MainAdapter and ThumbAdapter
 */

export class HorizontalCommonAdapter {

  readonly panDirection = DIRECTION_LEFT | DIRECTION_RIGHT;

  readonly scrollSnapType: string = 'x mandatory';

  get scrollValue(): number {
    return this.slider.scrollLeft;
  }

  get clientSize(): number {
    return this.slider.clientWidth;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
  }

  getPanValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions {
    return {
      behavior,
      left: value - e.deltaX
    };
  }
}

export class VerticalCommonAdapter {

  readonly scrollSnapType: string = 'y mandatory';

  readonly panDirection = DIRECTION_UP | DIRECTION_DOWN;

  get scrollValue(): number {
    return this.slider.scrollTop;
  }

  get clientSize(): number {
    return this.slider.clientHeight;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
  }

  getPanValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions {
    return {
      behavior,
      top: value - e.deltaY
    };
  }
}
