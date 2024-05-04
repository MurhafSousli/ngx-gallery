import {
  Directive,
  Input,
  Output,
  NgZone,
  ElementRef,
  AfterViewChecked,
  OnInit,
  OnChanges,
  OnDestroy,
  EventEmitter
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
  distinctUntilChanged,
  EMPTY,
  animationFrameScheduler
} from 'rxjs';
import { ImgManager } from '../utils/img-manager';
import { resizeObservable } from '../utils/resize-observer';
import { SliderAdapter } from '../components/adapters';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryConfig } from '../models/config.model';
import { GalleryState } from '../models/gallery.model';

@Directive({
  selector: '[sliderResizeObserver]',
  standalone: true
})
export class SliderResizeObserver implements AfterViewChecked, OnChanges, OnInit, OnDestroy {

  private _resizeObserver: ResizeObserver;

  private _autoHeightSubscription: Subscription;

  private _resizeSubscription: Subscription;

  private _shouldSkip: boolean;

  // Stream that emits after the transition to the new height is completed
  private _afterHeightChanged$: Observable<any>;

  private get _viewport(): HTMLElement {
    return this._el.nativeElement;
  }

  private get _galleryCore(): HTMLElement {
    return this._el.nativeElement.parentElement.parentElement.parentElement;
  }

  private get _isAutoHeight(): boolean {
    return this.config.autoHeight &&
      !this.config.itemAutosize &&
      this.config.orientation === 'horizontal' &&
      (this.config.thumbPosition === 'top' || this.config.thumbPosition === 'bottom');
  }

  @Input() galleryId: string;

  @Input() adapter: SliderAdapter;

  @Input() config: GalleryConfig;

  @Output() isResizingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _el: ElementRef<HTMLElement>,
              private _zone: NgZone,
              private _gallery: Gallery,
              private _imgManager: ImgManager) {
  }

  ngOnInit(): void {
    const galleryRef: GalleryRef = this._gallery.ref(this.galleryId);

    // Check if height has transition for the auto-height feature
    const transitionDuration: string = getComputedStyle(this._viewport).getPropertyValue('transition-duration');
    if (parseFloat(transitionDuration) === 0) {
      this._afterHeightChanged$ = of(null);
    } else {
      this._afterHeightChanged$ = fromEvent(this._viewport, 'transitionend');
    }

    this._zone.runOutsideAngular(() => {

      // Detect if the size of the slider has changed detecting current index on scroll
      this._resizeSubscription = resizeObservable(this._viewport, (observer: ResizeObserver) => this._resizeObserver = observer).pipe(
        // Check if resize should skip due to re-observing the slider
        filter(() => !this._shouldSkip || !(this._shouldSkip = false)),
        // Immediately set visibility to hidden to avoid changing the active item caused by appearance of other items when size is expanded
        tap(() => this.setResizingState()),
        debounceTime(this.config.resizeDebounceTime, animationFrameScheduler),
        tap(async (entry: ResizeObserverEntry) => {
          // Update CSS variables with the proper values
          this.updateSliderSize();

          if (this._isAutoHeight) {
            const img: HTMLImageElement = await firstValueFrom(this._imgManager.getActiveItem(galleryRef.state));
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
  }

  ngOnChanges(): void {
    this._isAutoHeight ? this._subscribeAutoHeight() : this._unsubscribeAutoHeight();
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
    this._unsubscribeAutoHeight();
  }

  ngAfterViewChecked(): void {
    this.updateSliderSize();
  }

  private updateSliderSize(): void {
    // Update slider width and height CSS variables
    this._galleryCore.style.setProperty('--slider-width', `${ this._viewport.clientWidth }px`);

    // Only update height if auto-height is false, because when it's true, another function will take care of it
    if (!this.config.autoHeight) {
      this._galleryCore.style.setProperty('--slider-height', `${ this._viewport.clientHeight }px`);
    }

    this.updateCentralizeCSSVariables();
  }

  private updateCentralizeCSSVariables(): void {
    if (this.config.itemAutosize) {
      this._galleryCore.style.setProperty('--slider-centralize-start-size', `${ this.adapter.getCentralizerStartSize() }px`);
      this._galleryCore.style.setProperty('--slider-centralize-end-size', `${ this.adapter.getCentralizerEndSize() }px`);
    }
  }

  private _subscribeAutoHeight(): void {
    this._unsubscribeAutoHeight();

    this._shouldSkip = false;
    this._zone.runOutsideAngular(() => {

      const galleryRef: GalleryRef = this._gallery.ref(this.galleryId);

      // TODO: Why is galleryRef.state emits when screen size changes?
      const state: Observable<GalleryState> = galleryRef.state.pipe(distinctUntilChanged((a: GalleryState, b: GalleryState) => a.currIndex === b.currIndex))
      this._autoHeightSubscription = this._imgManager.getActiveItem(state).pipe(
        switchMap((img: HTMLImageElement) => {
          this.setResizingState({ unobserve: true });
          this._galleryCore.style.setProperty('--slider-height', `${ img.clientHeight }px`);

          // Check if the new item height is equal to the current height, there will be no transition,
          // So reset resizing state
          if (img.height === this._viewport.clientHeight) {
            this.resetResizingState({ shouldSkip: true, observe: true });
            return EMPTY;
          }
          return this._afterHeightChanged$.pipe(
            tap(() => this.resetResizingState({ shouldSkip: true, observe: true })),
            take(1)
          );
        })
      ).subscribe();
    });
  }

  private _unsubscribeAutoHeight(): void {
    this._autoHeightSubscription?.unsubscribe();
  }

  private setResizingState({ unobserve }: { unobserve?: boolean } = {}): void {
    this._zone.run(() => {
      this.isResizingChange.emit(true);
    })
    this._viewport.classList.add('g-resizing');
    if (unobserve) {
      // Unobserve the slider while the height is being changed
      this._resizeObserver.unobserve(this._viewport);
    }
  }

  private resetResizingState({ shouldSkip, observe }: { shouldSkip?: boolean, observe?: boolean } = {}): void {
    this._zone.run(() => {
      this.isResizingChange.emit(false);
    })
    this._viewport.classList.remove('g-resizing');
    this._shouldSkip = shouldSkip;
    if (observe) {
      this._resizeObserver.observe(this._viewport);
    }
  }
}
