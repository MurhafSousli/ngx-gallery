import { GalleryConfig } from '../../models/config.model';
import { ThumbnailsView } from '../../models/constants';
import { ThumbSliderAdapter } from './base-adapter';
import { HorizontalCommonAdapter, VerticalCommonAdapter } from './common-adapter';
import { SmoothScrollToOptions } from '../../smooth-scroll';


export class HorizontalThumbAdapter extends HorizontalCommonAdapter implements ThumbSliderAdapter {

  get containerWidth(): string {
    return '100%';
  }

  get containerHeight(): string {
    return this.config.thumbHeight + 'px';
  }

  get thumbSize(): number {
    return this.config.thumbWidth;
  }

  get isContentLessThanContainer(): boolean {
    return this.slider.clientWidth >= this.slider.scrollWidth;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getCentralisedScrollToValue(value: number, behavior: ScrollBehavior): SmoothScrollToOptions {
    let position: number = value * this.thumbSize;
    if (this.config.thumbView === ThumbnailsView.Default) {
      position -= (this.clientSize / 2) - (this.thumbSize / 2);
    }
    return {
      start: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
  }
}

export class VerticalThumbAdapter extends VerticalCommonAdapter implements ThumbSliderAdapter {

  get containerWidth(): string {
    return this.config.thumbWidth + 'px';
  }

  get containerHeight(): string {
    return '100%';
  }

  get thumbSize(): number {
    return this.config.thumbHeight;
  }

  get isContentLessThanContainer(): boolean {
    return this.slider.clientHeight >= this.slider.scrollHeight;
  }

  constructor(public slider: HTMLElement, public config: GalleryConfig) {
    super(slider, config);
  }

  getCentralisedScrollToValue(value: number, behavior: ScrollBehavior): SmoothScrollToOptions {
    let position: number = value * this.thumbSize;
    if (this.config.thumbView === ThumbnailsView.Default) {
      position -= (this.clientSize / 2) - (this.thumbSize / 2);
    }
    return {
      top: position,
      duration: behavior === 'smooth' ? this.config.slidingDuration : 0,
      easing: this.config.slidingEase
    };
  }
}
