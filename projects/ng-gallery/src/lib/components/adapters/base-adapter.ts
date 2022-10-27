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

  abstract getPanValue(value: number, e: any, behavior: ScrollBehavior): ScrollToOptions;
}


export abstract class ThumbSliderAdapter extends BaseSliderAdapter {

  abstract get containerWidth(): string;

  abstract get containerHeight(): string;

  abstract get thumbSize(): number;

  abstract get isContentLessThanContainer(): boolean;

  abstract getCentralisedScrollToValue(value, behavior: ScrollBehavior): ScrollToOptions;
}


export abstract class SliderAdapter extends BaseSliderAdapter {

  abstract get measureIndex(): number;

  abstract getScrollToValue(value: number, behavior: ScrollBehavior): ScrollToOptions;

  abstract getPanDelta(e: any): number;

  abstract getPanVelocity(e: any): number;
}
