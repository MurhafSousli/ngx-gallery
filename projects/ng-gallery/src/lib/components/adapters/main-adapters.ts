import { GalleryConfig } from '../../models/config.model';
import { SliderAdapter } from './base-adapter';
import { SmoothScrollOptions } from '../../smooth-scroll';

/**
 * A clone of HammerJs constants
 */
export const DIRECTION_LEFT: number = 2;
export const DIRECTION_RIGHT: number = 4;
export const DIRECTION_UP: number = 8;
export const DIRECTION_DOWN: number = 16;

export class HorizontalAdapter implements SliderAdapter {

  readonly hammerDirection: number = DIRECTION_LEFT | DIRECTION_RIGHT;

  readonly scrollSnapType: string = 'x mandatory';

  get scrollValue(): number {
    return this.slider.scrollLeft;
  }

  get clientSize(): number {
    return this.slider.clientWidth;
  }

  get isContentLessThanContainer(): boolean {
    return this.clientSize >= this.slider.firstElementChild.clientWidth;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
  }

  getScrollToValue(target: HTMLElement, behavior: ScrollBehavior): SmoothScrollOptions {
    const position: number = target.offsetLeft - ((this.clientSize - target.clientWidth) / 2);
    return {
      behavior,
      start: position
    };
  }

  getRootMargin(): string {
    // return `1000px 1px 1000px 1px`;
    return `1000px 0px 1000px 0px`;
  }

  getElementRootMargin(viewport: HTMLElement, el: HTMLElement): string {
    const rootMargin: number = -1 * ((viewport.clientWidth - el.clientWidth) / 2) + 1;
    return `0px ${ rootMargin }px 0px ${ rootMargin }px`;
  }

  getCentralizerStartSize(): number {
    if (this.isContentLessThanContainer) {
      const size: number = this.clientSize - this.slider.firstElementChild.clientWidth;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.slider.firstElementChild.firstElementChild?.clientWidth / 2);
  }

  getCentralizerEndSize(): number {
    if (this.isContentLessThanContainer) {
      const size: number = this.clientSize - this.slider.firstElementChild.clientWidth;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.slider.firstElementChild.lastElementChild?.clientWidth / 2);
  }

  getHammerVelocity(e: any): number {
    return e.velocityX;
  }

  getHammerValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions {
    return {
      behavior,
      left: value - e.deltaX
    };
  }

  // getDraggingProperty(e: MouseEvent): number {
  //   return e.clientX;
  // }

  // getDraggingValue(value: number, delta: number, behavior: ScrollBehavior): ScrollToOptions {
  //   return {
  //     behavior,
  //     left: value - delta
  //   };
  // }
}

export class VerticalAdapter implements SliderAdapter {

  readonly hammerDirection: number = DIRECTION_UP | DIRECTION_DOWN;

  readonly scrollSnapType: string = 'y mandatory';

  get scrollValue(): number {
    return this.slider.scrollTop;
  }

  get clientSize(): number {
    return this.slider.clientHeight;
  }

  get isContentLessThanContainer(): boolean {
    return this.clientSize >= this.slider.firstElementChild.clientHeight;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
  }

  getScrollToValue(target: HTMLElement, behavior: ScrollBehavior): SmoothScrollOptions {
    const position: number = target.offsetTop - ((this.clientSize - target.clientHeight) / 2);
    return {
      behavior,
      top: position
    };
  }

  getRootMargin(): string {
    return `0px 1000px 0px 1000px`;
  }

  getElementRootMargin(viewport: HTMLElement, el: HTMLElement): string {
    const rootMargin: number = -1 * ((viewport.clientHeight - el.clientHeight) / 2) + 1;
    return `${ rootMargin }px 0px ${ rootMargin }px 0px`;
  }

  getCentralizerStartSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.slider.firstElementChild.clientHeight;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.slider.firstElementChild.firstElementChild?.clientHeight / 2);
  }

  getCentralizerEndSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.slider.firstElementChild.clientHeight;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.slider.firstElementChild.lastElementChild?.clientHeight / 2);
  }

  getHammerVelocity(e: any): number {
    return e.velocityY;
  }

  getHammerValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions {
    return {
      behavior,
      top: value - e.deltaY
    };
  }

  // getDraggingProperty(e: MouseEvent): number {
  //   return e.clientY;
  // }

  // getDraggingValue(value: number, delta: number, behavior: ScrollBehavior): ScrollToOptions {
  //   return {
  //     behavior,
  //     top: value - delta
  //   };
  // }
}
