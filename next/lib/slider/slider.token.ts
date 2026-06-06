import { Signal, WritableSignal } from '@angular/core';
import { SliderAdapter } from '../adapters';

export abstract class SliderContext {
  abstract isBrowser: boolean;
  abstract status: Signal<'idle' | 'dragging' | 'scrolling'>;
  abstract adapter: Signal<SliderAdapter>;
  abstract scrolling: WritableSignal<boolean>;
  abstract dragging: WritableSignal<boolean>;
}
