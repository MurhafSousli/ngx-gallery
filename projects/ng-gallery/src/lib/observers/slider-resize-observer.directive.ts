import {
  Directive,
  output,
  inject,
  effect,
  computed,
  untracked,
  input,
  Signal,
  InputSignal,
  OnInit,
  NgZone,
  ElementRef,
  DestroyRef,
  OutputEmitterRef,
  AfterViewChecked,
  EffectCleanupRegisterFn, signal, WritableSignal
} from '@angular/core';
import {
  Observable,
  Subscription,
  of,
  tap,
  take,
  filter,
  fromEvent,
  switchMap,
  debounceTime,
  firstValueFrom,
  EMPTY,
  animationFrameScheduler
} from 'rxjs';
import { ImgManager } from '../utils/img-manager';
import { resizeObservable } from '../utils/resize-observer';
import { SliderAdapter } from '../components/adapters';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryConfig } from '../models/config.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  host: {
    '[class.g-resizing]': 'isResizing()'
  },
  standalone: true,
  selector: '[sliderResizeObserver]'
})
export class SliderResizeObserver implements AfterViewChecked, OnInit {

  readonly isResizing: WritableSignal<boolean> = signal(false);

  private readonly _galleryRef: GalleryRef = inject(GalleryRef);

  private readonly _viewport: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly _galleryCore: HTMLElement = this._viewport.parentElement.parentElement.parentElement;

  private readonly _zone: NgZone = inject(NgZone);

  private readonly _imgManager: ImgManager = inject(ImgManager);

  private _resizeObserver: ResizeObserver;

  private _shouldSkip: boolean;

  // Stream that emits after the transition to the new height is completed
  private _afterHeightChanged$: Observable<any>;

  private _isAutoHeight: Signal<boolean> = computed(() => {
    const config: GalleryConfig = this._galleryRef.config();
    return config.autoHeight &&
      !config.itemAutosize &&
      config.orientation === 'horizontal' &&
      (config.thumbPosition === 'top' || config.thumbPosition === 'bottom');
  });

  adapter: InputSignal<SliderAdapter> = input<SliderAdapter>();

  isResizingChange: OutputEmitterRef<boolean> = output<boolean>();

  constructor() {
    let resizeSubscription$: Subscription;
    let _autoHeightSubscription: Subscription;
    const destroyRef = inject(DestroyRef);

    effect((onCleanup: EffectCleanupRegisterFn) => {
      const config = this._galleryRef.config();
      const isAutoHeight = this._isAutoHeight();

      untracked(() => {
        this._zone.runOutsideAngular(() => {
          // Detect if the size of the slider has changed detecting current index on scroll
          resizeSubscription$ = resizeObservable(this._viewport, (observer: ResizeObserver) => this._resizeObserver = observer).pipe(
            takeUntilDestroyed(destroyRef),
            // Check if resize should skip due to re-observing the slider
            filter(() => !this._shouldSkip || !(this._shouldSkip = false)),
            // Immediately set visibility to hidden to avoid changing the active item caused by appearance of other items when size is expanded
            tap(() => this.setResizingState()),
            debounceTime(config.resizeDebounceTime, animationFrameScheduler),
            tap(async (entry: ResizeObserverEntry) => {
              // Update CSS variables with the proper values
              this.updateSliderSize();

              if (isAutoHeight) {
                const img: HTMLImageElement = await firstValueFrom(this._imgManager.getActiveItem());
                // If img height is identical to the viewport height then skip
                if (img.height === this._viewport.clientHeight) {
                  this.resetResizingState();
                } else {
                  // Unobserve the slider while the height is being changed
                  this.setResizingState({ unobserve: true });
                  // Change the height
                  this._galleryCore.style.setProperty('--slider-height', `${ img.height }px`);
                  // Wait until height transition ends
                  await firstValueFrom(this._afterHeightChanged$);
                  this.resetResizingState({
                    // Mark to skip first emit after re-observing the slider if height content rect height and client height are identical
                    shouldSkip: entry.contentRect.height === this._viewport.clientHeight,
                    observe: true
                  });
                }
              } else {
                requestAnimationFrame(() => this.resetResizingState({ shouldSkip: true }));
              }
            })
          ).subscribe();
        });

        onCleanup(() => resizeSubscription$?.unsubscribe());
      });
    });


    // effect((onCleanup: EffectCleanupRegisterFn) => {
    //   const isAutoHeight = this._isAutoHeight();
    //
    //   untracked(() => {
    //     this._shouldSkip = false;
    //     if (isAutoHeight) {
    //       this._zone.runOutsideAngular(() => {
    //         _autoHeightSubscription = this._imgManager.getActiveItem().pipe(
    //           takeUntilDestroyed(destroyRef),
    //           switchMap((img: HTMLImageElement) => {
    //             this.setResizingState({ unobserve: true });
    //             this._galleryCore.style.setProperty('--slider-height', `${ img.clientHeight }px`);
    //
    //             // Check if the new item height is equal to the current height, there will be no transition,
    //             // So reset resizing state
    //             if (img.height === this._viewport.clientHeight) {
    //               this.resetResizingState({ shouldSkip: true, observe: true });
    //               return EMPTY;
    //             }
    //             return this._afterHeightChanged$.pipe(
    //               tap(() => this.resetResizingState({ shouldSkip: true, observe: true })),
    //               take(1)
    //             );
    //           })
    //         ).subscribe();
    //       });
    //     }
    //
    //     onCleanup(() => resizeSubscription$?.unsubscribe());
    //   });
    // });
  }

  ngOnInit(): void {
    // Check if height has transition for the auto-height feature
    // const transitionDuration: string = getComputedStyle(this._viewport).getPropertyValue('transition-duration');
    // if (parseFloat(transitionDuration) === 0) {
    //   this._afterHeightChanged$ = of(null);
    // } else {
    //   this._afterHeightChanged$ = fromEvent(this._viewport, 'transitionend');
    // }
  }

  ngAfterViewChecked(): void {
    // this.updateSliderSize();
  }

  private updateSliderSize(): void {
    // Update slider width and height CSS variables
    this._galleryCore.style.setProperty('--slider-width', `${ this._viewport.clientWidth }px`);

    // Only update height if auto-height is false, because when it's true, another function will take care of it
    if (!this._galleryRef.config().autoHeight) {
      this._galleryCore.style.setProperty('--slider-height', `${ this._viewport.clientHeight }px`);
    }

    this.updateCentralizeCSSVariables();
  }

  private updateCentralizeCSSVariables(): void {
    if (this._galleryRef.config().itemAutosize) {
      this._galleryCore.style.setProperty('--slider-centralize-start-size', `${ this.adapter().getCentralizerStartSize() }px`);
      this._galleryCore.style.setProperty('--slider-centralize-end-size', `${ this.adapter().getCentralizerEndSize() }px`);
    }
  }

  private setResizingState({ unobserve }: { unobserve?: boolean } = {}): void {
    this._zone.run(() => {
      this.isResizing.set(true);
      this.isResizingChange.emit(true);
    })
    // this._viewport.classList.add('g-resizing');
    if (unobserve) {
      // Unobserve the slider while the height is being changed
      this._resizeObserver.unobserve(this._viewport);
    }
  }

  private resetResizingState({ shouldSkip, observe }: { shouldSkip?: boolean, observe?: boolean } = {}): void {
    this._zone.run(() => {
      this.isResizing.set(false);
      this.isResizingChange.emit(false);
    })
    // this._viewport.classList.remove('g-resizing');
    this._shouldSkip = shouldSkip;
    if (observe) {
      this._resizeObserver.observe(this._viewport);
    }
  }
}
