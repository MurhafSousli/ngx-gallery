import {
  Component,
  inject,
  signal,
  computed,
  contentChildren,
  viewChild,
  Signal,
  ElementRef,
  WritableSignal,
  ChangeDetectionStrategy
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SmoothScroll, SmoothScrollOptions } from '../../smooth-scroll';
import { HammerSliding } from '../../gestures/hammer-sliding.directive';
import { SliderIntersectionObserver } from '../../observers/slider-intersection-observer.directive';
import { GalleryItemComponent } from '../gallery-item.component';
import { GalleryRef } from '../../services/gallery-ref';
import { ScrollSnapType } from '../../services/scroll-snap-type';
import { IndexChange } from '../../models/slider.model';
import { ResizeSensor } from '../../services/resize-sensor';
import { Adapter } from '../adapters/adapter';

@Component({
  standalone: true,
  host: {
    '[class.g-slider]': 'true',
    '[attr.centralised]': 'galleryRef.config().centralized'
  },
  selector: 'g-slider',
  template: `
    <div #slider
         adapter
         resizeSensor
         scrollSnapType
         [hammerSliding]="!galleryRef.config().disableMouseScroll"
         [items]="items()">
      <div class="g-slider-content">
        <ng-content/>
      </div>
    </div>
  `,
  styleUrl: './gallery-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    ResizeSensor,
    SmoothScroll,
    HammerSliding,
    SliderIntersectionObserver,
    ScrollSnapType,
    Adapter
  ],
  imports: [
    ResizeSensor,
    SmoothScroll,
    HammerSliding,
    SliderIntersectionObserver,
    ScrollSnapType,
    Adapter
  ]
})
export class SliderComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly adapter: Signal<Adapter> = viewChild(Adapter);
  readonly smoothScroll: Signal<SmoothScroll> = viewChild(SmoothScroll);
  readonly hammerSlider: Signal<HammerSliding> = viewChild(HammerSliding);

  /** Stream that emits the slider position */
  readonly position: WritableSignal<SmoothScrollOptions> = signal(null);

  readonly disableInteractionObserver: Signal<boolean> = computed(() => {
    return this.smoothScroll().scrolling() || this.hammerSlider().sliding(); // || this.resizeSensor.isResizing();
  });

  /** Slider native element */
  readonly slider: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement

  readonly items: Signal<ReadonlyArray<GalleryItemComponent>> = contentChildren<GalleryItemComponent>(GalleryItemComponent);

  constructor() {
    this.galleryRef.indexChange.pipe(takeUntilDestroyed()).subscribe((change: IndexChange) => {
      this.scrollToIndex(change.index, change.behavior);
    });
  }

  private scrollToIndex(index: number, behavior: ScrollBehavior): void {
    const el: HTMLElement = this.items()[index]?.nativeElement;
    if (el) {
      const pos: SmoothScrollOptions = this.adapter().adapter().getScrollToValue(el, behavior || this.galleryRef.config().scrollBehavior);
      this.position.set(pos);
    }
  }
}
