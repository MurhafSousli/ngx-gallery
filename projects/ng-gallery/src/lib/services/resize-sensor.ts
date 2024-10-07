import {
  Directive,
  signal,
  inject,
  effect,
  computed,
  untracked,
  NgZone,
  Signal,
  WritableSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import {
  Observable,
  Subscriber,
  Subscription,
  debounceTime,
  mergeMap,
  animationFrameScheduler,
} from 'rxjs';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from './gallery-ref';
import { Adapter } from '../components/adapters/adapter';

@Directive({
  standalone: true,
  selector: '[resizeSensor]',
  host: {
    '[attr.orientation]': 'galleryRef.config().orientation',
    '[attr.autoSize]': 'galleryRef.config().itemAutosize',
    '[style.--slider-width.px]': 'size()?.width',
    '[style.--slider-height.px]': 'size()?.height',
    '[style.--centralize-start-size]': 'centralizeStart()',
    '[style.--centralize-end-size]': 'centralizeEnd()'
  }
})
export class ResizeSensor {

  // private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly adapter: Adapter = inject(Adapter);

  private readonly zone: NgZone = inject(NgZone);

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  private resizeObserver: ResizeObserver;

  size: WritableSignal<DOMRectReadOnly> = signal(null);

  centralizeStart: Signal<string> = computed(() => {
    if (this.size()) {
      return `${ this.adapter.adapter()?.getCentralizerStartSize() }px`;
    }
  });

  centralizeEnd: Signal<string> = computed(() => {
    if (this.size()) {
      return `${ this.adapter.adapter()?.getCentralizerEndSize() }px`;
    }
  });

  constructor() {
    let resizeSubscription$: Subscription;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config: GalleryConfig = this.galleryRef.config();

      untracked(() => {
        this.zone.runOutsideAngular(() => {
          resizeSubscription$ = new Observable((subscriber: Subscriber<ResizeObserverEntry[]>) => {
            this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => subscriber.next(entries));
            this.resizeObserver.observe(this.adapter.nativeElement);
            return () => this.resizeObserver.disconnect();
          }).pipe(
            mergeMap((entries: ResizeObserverEntry[]) => entries),
            debounceTime(config.resizeDebounceTime, animationFrameScheduler),
          ).subscribe((entry: ResizeObserverEntry) => {
            if (entry.contentRect.height) {
              this.zone.run(() => this.size.set(entry.contentRect));
            }
          });
        });

        onCleanup(() => resizeSubscription$?.unsubscribe());
      });
    });

    effect(() => {

    });
  }
}
