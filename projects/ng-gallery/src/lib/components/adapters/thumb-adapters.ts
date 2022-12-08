import { GalleryConfig } from '../../models/config.model';
import { ThumbnailsView } from '../../models/constants';
import { ThumbSliderAdapter } from './base-adapter';
import { HorizontalCommonAdapter, VerticalCommonAdapter } from './common-adapter';
import { SmoothScrollToOptions } from '../../smooth-scroll';


export class HorizontalThumbAdapter extends HorizontalCommonAdapter implements ThumbSliderAdapter {

  get thumbSize(): number {
    return this.config.thumbWidth;
  }

  get isContentLessThanContainer(): boolean {
    return this.slider.clientWidth >= this.slider.firstElementChild.clientWidth;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getCentralisedScrollToValue(el: HTMLElement, behavior: ScrollBehavior, thumbView: 'default' | 'contain'): SmoothScrollToOptions {
    let position: number = el.offsetLeft;
    if (thumbView === ThumbnailsView.Default) {
      position -= (this.clientSize / 2) - (el.clientWidth / 2);
    }
    return {
      start: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
  }

  getScrollToValue(el: HTMLElement, behavior: ScrollBehavior): SmoothScrollToOptions {
    let position = el.offsetLeft - ((this.clientSize - el.clientWidth) / 2);
    return {
      start: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
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

export class VerticalThumbAdapter extends VerticalCommonAdapter implements ThumbSliderAdapter {

  get thumbSize(): number {
    return this.config.thumbHeight;
  }

  get isContentLessThanContainer(): boolean {
    return this.slider.clientHeight >= this.slider.firstElementChild.clientHeight;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getCentralisedScrollToValue(el: HTMLElement, behavior: ScrollBehavior, thumbView: 'default' | 'contain'): SmoothScrollToOptions {
    let position: number = el.offsetTop;
    if (thumbView === ThumbnailsView.Default) {
      position -= (this.clientSize / 2) - (el.clientHeight / 2);
    }
    return {
      top: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
  }

  getScrollToValue(el: HTMLElement, behavior: ScrollBehavior): SmoothScrollToOptions {
    const position = el.offsetTop - ((this.clientSize - el.clientHeight) / 2);
    return {
      top: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
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
