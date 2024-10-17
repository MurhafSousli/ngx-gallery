import { computed, Directive, inject, Signal } from '@angular/core';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SmoothScroll } from '../smooth-scroll';
import { SliderComponent } from '../components/slider/slider';

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

  private readonly slider: SliderComponent = inject(SliderComponent, { self: true });

  scrollSnapType: Signal<string> = computed(() => {
    if (this.smoothScroll.scrolling() || this.hammerSliding.sliding()) {
      return 'none';
    }
    return this.slider.adapter().scrollSnapType;
  });
}
