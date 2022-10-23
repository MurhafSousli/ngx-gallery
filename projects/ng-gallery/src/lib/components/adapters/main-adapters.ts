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

  getScrollToValue(value, behavior: ScrollBehavior): SmoothScrollToOptions {
    const position: number = value * this.clientSize;
    return {
      start: position,
      duration: behavior === 'smooth' ? 400 : 0
    };
  }
}

export class VerticalAdapter extends VerticalCommonAdapter implements SliderAdapter {

  get measureIndex(): number {
    return this.slider.scrollTop / this.slider.clientHeight;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getScrollToValue(value, behavior: ScrollBehavior): SmoothScrollToOptions {
    const position: number = value * this.clientSize;
    return {
      top: position,
      duration: behavior === 'smooth' ? 400 : 0
    };
  }
}
