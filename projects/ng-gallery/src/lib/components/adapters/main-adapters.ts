import { GalleryConfig } from '../../models/config.model';
import { SliderAdapter } from './base-adapter';
import { HorizontalCommonAdapter, VerticalCommonAdapter } from './common-adapter';
import { SmoothScrollToOptions } from '../../smooth-scroll';

export class HorizontalAdapter extends HorizontalCommonAdapter implements SliderAdapter {

  get measureIndex(): number {
    return this.slider.scrollLeft / this.slider.clientWidth;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getScrollToValue(value: number, behavior: ScrollBehavior): SmoothScrollToOptions {
    const position: number = value * this.clientSize;
    return {
      start: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
  }

  getPanDelta(e): number {
    return e.deltaX;
  }

  getPanVelocity(e): number {
    return e.velocityX;
  }
}

export class VerticalAdapter extends VerticalCommonAdapter implements SliderAdapter {

  get measureIndex(): number {
    return this.slider.scrollTop / this.slider.clientHeight;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getScrollToValue(value: number, behavior: ScrollBehavior): SmoothScrollToOptions {
    const position: number = value * this.clientSize;
    return {
      top: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
  }

  getPanDelta(e): number {
    return e.deltaY;
  }

  getPanVelocity(e): number {
    return e.velocityY;
  }
}
