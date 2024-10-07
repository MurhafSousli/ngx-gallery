export abstract class SliderAdapter {

  readonly abstract hammerDirection: number;

  readonly abstract scrollSnapType: string;

  abstract get scrollValue(): number;

  abstract get clientSize(): number;

  abstract get isContentLessThanContainer(): boolean;

  abstract getScrollToValue(target: Element, behavior: ScrollBehavior): ScrollToOptions;

  abstract getCentralizerStartSize(): number;

  abstract getCentralizerEndSize(): number;

  abstract getRootMargin(): string;

  abstract getElementRootMargin(viewport: HTMLElement, el: HTMLElement): string;

  abstract getHammerVelocity(e): number;

  abstract getHammerValue(value: number, delta: number, behavior: ScrollBehavior): ScrollToOptions;

  // abstract getDraggingValue(value: number, delta: number, behavior: ScrollBehavior): ScrollToOptions;

  // abstract getDraggingProperty(e: MouseEvent): number;
}
