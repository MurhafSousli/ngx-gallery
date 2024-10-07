import { computed, Directive, inject, input, InputSignal, Signal } from '@angular/core';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SmoothScroll } from '../smooth-scroll';
import { SliderAdapter } from '../components/adapters';
import { Adapter } from '../components/adapters/adapter';

@Directive({
  standalone: true,
  selector: '[scrollSnapType]',
  host: {
    '[style.--slider-scroll-snap-type]': 'scrollSnapType()'
  }
})
export class ScrollSnapType {

  private readonly smoothScroll: SmoothScroll = inject(SmoothScroll, { self: true });

  private readonly hammerSliding: HammerSliding = inject(HammerSliding, { self: true });

  adapter: Adapter = inject(Adapter);

  scrollSnapType: Signal<string> = computed(() => {
    if (this.smoothScroll.scrolling() || this.hammerSliding.sliding()) {
      return 'none';
    }
    return this.adapter.adapter().scrollSnapType;
  });

}
