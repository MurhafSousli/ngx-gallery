import { Directive, inject, computed, input, Signal, InputSignal } from '@angular/core';
import { SliderAdapter } from '../components/adapters';
import { ResizeSensor } from './resize-sensor';

@Directive({
  standalone: true,
  selector: '[sliderCentralizer]',
  host: {
    '[style.--centralize-start-size]': 'centralizeStart()',
    '[style.--centralize-end-size]': 'centralizeEnd()'
  }
})
export class SliderCentraliser {

  readonly resizeSensor: ResizeSensor = inject(ResizeSensor, { self: true });

  adapter: InputSignal<SliderAdapter> = input<SliderAdapter>();

  centralizeStart: Signal<string> = computed(() => {
    if (this.resizeSensor.size()) {
      return `${ this.adapter().getCentralizerStartSize() }px`;
    }
  });

  centralizeEnd: Signal<string> = computed(() => {
    if (this.resizeSensor.size()) {
      return `${ this.adapter().getCentralizerEndSize() }px`;
    }
  });
}
