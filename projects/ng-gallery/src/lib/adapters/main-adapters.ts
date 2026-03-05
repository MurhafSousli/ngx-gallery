import { SliderAdapter } from './base-adapter';

export class HorizontalAdapter extends SliderAdapter {

  readonly scrollSnapType: string = 'inline mandatory';

  readonly startProperty: 'left' | 'top' = 'left';

  readonly sizeProperty: 'width' | 'height' = 'width';

  readonly offsetSize: 'offsetWidth' | 'offsetHeight' = 'offsetWidth';

  get scrollValue(): number {
    return this.slider.scrollLeft;
  }

  constructor(slider: HTMLElement) {
    super(slider);
  }

  getVisibleEntriesRootMargin(): string {
    return '1000px 0px 1000px 0px';
  }

  getActiveEntryRootMarginForStart(): string {
    return '0px -99% 0px 0px';
  }

  getActiveEntryRootMarginForCenter(): string {
    return '0px -50% 0px -50%';
  }

  getActiveEntryRootMarginForEnd(): string {
    return '0px 0px 0px -99%';
  }

  getDraggingProperty(e: MouseEvent): number {
    return e.clientX;
  }
}

export class VerticalAdapter extends SliderAdapter {

  readonly startProperty: 'left' | 'top' = 'top';

  readonly scrollSnapType: string = 'block mandatory';

  readonly sizeProperty: 'width' | 'height' = 'height';

  readonly offsetSize: 'offsetWidth' | 'offsetHeight' = 'offsetHeight';

  get scrollValue(): number {
    return this.slider.scrollTop;
  }

  constructor(slider: HTMLElement) {
    super(slider);
  }

  getVisibleEntriesRootMargin(): string {
    return `0px 1000px 0px 1000px`;
  }

  getActiveEntryRootMarginForStart(): string {
    return '-99% 0px 0px 0px';
  }

  getActiveEntryRootMarginForCenter(): string {
    return '-50% 0px -50% 0px';
  }

  getActiveEntryRootMarginForEnd(): string {
    return '0px 0px -99% 0px';
  }

  getDraggingProperty(e: MouseEvent): number {
    return e.clientY;
  }
}
