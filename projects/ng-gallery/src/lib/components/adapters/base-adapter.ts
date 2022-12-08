/**
 * A clone of HammerJs constants
 */
export const DIRECTION_LEFT = 2;
export const DIRECTION_RIGHT = 4;
export const DIRECTION_UP = 8;
export const DIRECTION_DOWN = 16;

export abstract class BaseSliderAdapter {

  abstract scrollSnapType: string;

  abstract panDirection: number;

  abstract get scrollValue(): number;

  abstract get clientSize(): number;

  abstract get isContentLessThanContainer(): boolean;

  abstract getPanValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions;

  abstract getScrollToValue(el: Element, behavior: ScrollBehavior): ScrollToOptions;

  abstract getCentralizerStartSize(): number;

  abstract getCentralizerEndSize(): number;
}


export abstract class ThumbSliderAdapter extends BaseSliderAdapter {

  abstract get thumbSize(): number;
}


export abstract class SliderAdapter extends BaseSliderAdapter {

  abstract get measureIndex(): number;

  abstract getClientSize(el: HTMLElement): number;

  abstract getOffsetSize(el: HTMLElement): number;

  abstract getPanDelta(e: any): number;

  abstract getPanVelocity(e: any): number;
}
