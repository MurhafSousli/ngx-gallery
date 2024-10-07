import {
  Directive,
  inject,
  signal,
  effect,
  untracked,
  input,
  NgZone,
  ElementRef,
  InputSignal,
  WritableSignal,
  EffectCleanupRegisterFn
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { _Bottom, _Left, _Right, _Top, _Without } from '@angular/cdk/scrolling';
import { getRtlScrollAxisType, RtlScrollAxisType } from '@angular/cdk/platform';
import {
  Observable,
  Subject,
  Subscriber,
  Subscription,
  of,
  take,
  merge,
  expand,
  fromEvent,
  switchMap,
  takeUntil,
  takeWhile,
  finalize
} from 'rxjs';
import BezierEasing from './bezier-easing';
import { SmoothScrollOptions, SmoothScrollStep, SmoothScrollToOptions } from './index';
import { GalleryRef } from '../services/gallery-ref';
import { IndexChange } from '../models/slider.model';
import { SliderComponent } from '../components/slider/slider';
import { HammerSliding } from '../gestures/hammer-sliding.directive';

@Directive({
  standalone: true,
  selector: '[smoothScroll]',
  host: {
    '[class.g-scrolling]': 'scrolling()'
  }
})
export class SmoothScroll {

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly slider: SliderComponent = inject(SliderComponent, { self: true });

  private readonly hammerSlider: HammerSliding = inject(HammerSliding, { self: true });

  private readonly _zone: NgZone = inject(NgZone);

  private readonly _dir: Directionality = inject(Directionality);

  private readonly _el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly _w: Window = inject(DOCUMENT).defaultView;

  private readonly _scrollController: Subject<SmoothScrollStep> = new Subject<SmoothScrollStep>();

  private readonly _finished: Subject<void> = new Subject<void>();

  /**
   * Timing method
   */
  private get _now(): () => number {
    return this._w.performance?.now?.bind(this._w.performance) || Date.now;
  }

  private readonly interruptedByMouse$: Subject<void> = new Subject<void>();

  scrolling: WritableSignal<boolean> = signal<boolean>(false);

  disabled: InputSignal<boolean> = input<boolean>(false, { alias: 'smoothScroll' });

  constructor() {
    // This directive should not do anything if was used by gallery-thumbs and detached option is true
    let indexChangeSub$: Subscription;
    let scrollSub$: Subscription

    effect(() => {
      if (!this.hammerSlider.sliding() || this.disabled()) return;
      this.interruptedByMouse$.next();
    });

    effect((onCleanup: EffectCleanupRegisterFn) => {
      if (this.disabled()) return;

      untracked(() => {
        this._zone.runOutsideAngular(() => {
          indexChangeSub$ = this.galleryRef.indexChange.subscribe((change: IndexChange) => {
            const el: HTMLElement = this.slider.items()[change.index]?.nativeElement;
            const scrollBehavior: ScrollBehavior = this.galleryRef.config().scrollBehavior;
            if (el) {
              const pos: SmoothScrollOptions = this.slider.adapter().getScrollToValue(el, change.behavior || scrollBehavior);
              this.scrollTo(pos);
            }
          });

          scrollSub$ = this._scrollController.pipe(
            switchMap((context: SmoothScrollStep) => {
              this._zone.run(() => {
                this.scrolling.set(true);
              });

              // Scroll each step recursively
              return of(null).pipe(
                expand(() => this._step(context).pipe(
                  takeWhile((currContext: SmoothScrollStep) => this._isFinished(currContext)),
                  takeUntil(this._finished)
                )),
                finalize(() => this.resetElement()),
                takeUntil(this._interrupted()),
              );
            })
          ).subscribe();

          onCleanup(() => {
            scrollSub$?.unsubscribe();
            indexChangeSub$?.unsubscribe();
          });
        });
      });
    });
  }

  /**
   * changes scroll position inside an element
   */
  private _scrollElement(x: number, y: number): void {
    this._el.scrollLeft = x;
    this._el.scrollTop = y;
  }

  private resetElement(): void {
    this._zone.run(() => {
      this.scrolling.set(false);
    });
  }

  /**
   * Checks if smooth scroll has reached, cleans up the smooth scroll stream and resolves its promise
   */
  private _isFinished(context: SmoothScrollStep): boolean {
    if (context.currentX !== context.x || context.currentY !== context.y) {
      return true;
    }
    this._finished.next();
    return false;
  }

  /**
   * Terminates an ongoing smooth scroll
   */
  private _interrupted(): Observable<Event | void> {
    return merge(
      this.interruptedByMouse$,
      fromEvent(this._el, 'wheel', { passive: true, capture: true }),
      fromEvent(this._el, 'touchmove', { passive: true, capture: true }),
    ).pipe(take(1));
  }

  /**
   * A function called recursively that, given a context, steps through scrolling
   */
  private _step(context: SmoothScrollStep): Observable<SmoothScrollStep> {
    return new Observable((subscriber: Subscriber<SmoothScrollStep>) => {
      let elapsed: number = (this._now() - context.startTime) / context.duration;

      // avoid elapsed times higher than one
      elapsed = elapsed > 1 ? 1 : elapsed;

      // apply easing to elapsed time
      const value: number = context.easing(elapsed);

      context.currentX = context.startX + (context.x - context.startX) * value;
      context.currentY = context.startY + (context.y - context.startY) * value;

      this._scrollElement(context.currentX, context.currentY);
      // Proceed to the step
      requestAnimationFrame(() => {
        subscriber.next(context);
        subscriber.complete();
      });
    });
  }

  private _applyScrollToOptions(options: SmoothScrollToOptions): void {
    if (!options.duration) {
      this._scrollElement(options.left, options.top);
    }

    const context: SmoothScrollStep = {
      scrollable: this._el,
      startTime: this._now(),
      startX: this._el.scrollLeft,
      startY: this._el.scrollTop,
      x: options.left == null ? this._el.scrollLeft : ~~options.left,
      y: options.top == null ? this._el.scrollTop : ~~options.top,
      duration: options.duration,
      easing: BezierEasing(options.easing.x1, options.easing.y1, options.easing.x2, options.easing.y2)
    };

    this._scrollController.next(context);
  }

  /**
   * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
   * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param params specified the offsets to scroll to.
   */
  scrollTo(params: SmoothScrollOptions): void {
    const isRtl: boolean = this._dir.value === 'rtl';
    const rtlScrollAxisType: RtlScrollAxisType = getRtlScrollAxisType();

    const options: SmoothScrollToOptions = {
      ...params,
      ...({
        // Rewrite start & end offsets as right or left offsets.
        left: params.left == null ? (isRtl ? params.end : params.start) : params.left,
        right: params.right == null ? (isRtl ? params.start : params.end) : params.right
      }),
      duration: params.behavior === 'smooth' ? this.galleryRef.config().scrollDuration : 0,
      easing: this.galleryRef.config().scrollEase,
    };

    // Rewrite the bottom offset as a top offset.
    if (options.bottom != null) {
      (options as _Without<_Bottom> & _Top).top = this._el.scrollHeight - this._el.clientHeight - options.bottom;
    }

    // Rewrite the right offset as a left offset.
    if (isRtl && rtlScrollAxisType !== RtlScrollAxisType.NORMAL) {
      if (options.left != null) {
        (options as _Without<_Left> & _Right).right = this._el.scrollWidth - this._el.clientWidth - options.left;
      }

      if (rtlScrollAxisType === RtlScrollAxisType.INVERTED) {
        options.left = options.right;
      } else if (rtlScrollAxisType === RtlScrollAxisType.NEGATED) {
        options.left = options.right ? -options.right : options.right;
      }
    } else {
      if (options.right != null) {
        (options as _Without<_Right> & _Left).left = this._el.scrollWidth - this._el.clientWidth - options.right;
      }
    }
    return this._applyScrollToOptions(options);
  }
}
