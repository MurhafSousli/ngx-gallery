import { GalleryConfig } from '../../models/config.model';
import { SliderAdapter } from './base-adapter';
import { HorizontalCommonAdapter, VerticalCommonAdapter } from './common-adapter';
import { SmoothScrollToOptions } from '../../smooth-scroll';

export class HorizontalAdapter extends HorizontalCommonAdapter implements SliderAdapter {

  get measureIndex(): number {
    return this.slider.scrollLeft / this.slider.clientWidth;
  }

  get isContentLessThanContainer(): boolean {
    return this.slider.clientWidth >= this.slider.firstElementChild.clientWidth;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getClientSize(el: HTMLElement): number {
    return el.clientWidth;
  }

  getOffsetSize(el: HTMLElement): number {
    return el.offsetLeft;
  }

  getScrollToValue(el: HTMLElement, behavior: ScrollBehavior): SmoothScrollToOptions {
    const position = el.offsetLeft - ((this.clientSize - el.clientWidth) / 2);
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

  getCentralizerStartSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.slider.firstElementChild.clientWidth;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.slider.firstElementChild.firstElementChild?.clientWidth / 2);
  }

  getCentralizerEndSize(): number {
    if (this.isContentLessThanContainer) {
      const size = this.clientSize - this.slider.firstElementChild.clientWidth;
      return size / 2;
    }
    return (this.clientSize / 2) - (this.slider.firstElementChild.lastElementChild?.clientWidth / 2);
  }
}

export class VerticalAdapter extends VerticalCommonAdapter implements SliderAdapter {

  get measureIndex(): number {
    return this.slider.scrollTop / this.slider.clientHeight;
  }

  get isContentLessThanContainer(): boolean {
    return this.slider.clientHeight >= this.slider.firstElementChild.clientHeight;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getClientSize(el: HTMLElement): number {
    return el.clientHeight;
  }

  getOffsetSize(el: HTMLElement): number {
    return el.offsetTop;
  }

  getScrollToValue(el: HTMLElement, behavior: ScrollBehavior): SmoothScrollToOptions {
    const position = el.offsetTop - ((this.clientSize - el.clientHeight) / 2);
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
}
