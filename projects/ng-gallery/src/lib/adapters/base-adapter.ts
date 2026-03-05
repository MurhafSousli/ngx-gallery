export abstract class SliderAdapter {

  readonly abstract scrollSnapType: string;

  readonly abstract startProperty: 'left' | 'top';

  abstract readonly sizeProperty: 'width' | 'height';

  abstract readonly offsetSize: 'offsetWidth' | 'offsetHeight';

  abstract get scrollValue(): number;

  get content(): HTMLElement {
    return this.slider.firstElementChild as HTMLElement;
  }

  abstract getVisibleEntriesRootMargin(): string;

  abstract getActiveEntryRootMarginForStart(): string;

  abstract getActiveEntryRootMarginForCenter(): string;

  abstract getActiveEntryRootMarginForEnd(): string;

  abstract getDraggingProperty(e: MouseEvent): number;

  protected constructor(public slider: HTMLElement) {
  }
}
