import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  ViewChild,
  SimpleChanges,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList
} from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { from, distinctUntilChanged, fromEvent, mergeMap, startWith, EMPTY, Observable, Subject, Subscriber } from 'rxjs';
import { tap, debounceTime, filter, takeUntil, switchMap } from 'rxjs/operators';
import { Gallery } from '../services/gallery.service';
import { GalleryState, GalleryError } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { SlidingDirection, ThumbnailsView } from '../models/constants';
import { SliderAdapter, HorizontalAdapter, VerticalAdapter } from './adapters';
import { SmoothScrollManager } from '../smooth-scroll';
import { resizeObservable } from '../utils/resize-observer';
import { GalleryItemComponent } from './gallery-item.component';

interface ScrollObserver {
  value: number;
  behavior: ScrollBehavior;
  onEnd: Function;
}

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #slider
         class="g-slider"
         [attr.centralised]="config.view === thumbnailsView.Contain || config.autoWidth">
      <div class="g-slider-content">
        <gallery-item *ngFor="let item of state.items; trackBy: trackByFn; index as i"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (click)="itemClick.emit(i)"
                      (active)="onItemActivated($event)"
                      (error)="error.emit({ itemIndex: i, error: $event })">
        </gallery-item>
      </div>
    </div>
    <ng-content></ng-content>
  `
})
export class GallerySliderComponent implements OnInit, OnChanges, OnDestroy {

  readonly scrollHandler$: Subject<ScrollObserver> = new Subject<ScrollObserver>();

  /** Thumbnails view enum */
  readonly thumbnailsView = ThumbnailsView;

  /** HammerJS instance */
  private _hammer: any;

  private intersectionObserver: IntersectionObserver;

  private visibleElements: Map<Element, IntersectionObserverEntry> = new Map<Element, IntersectionObserverEntry>();

  private readonly _destroyed$ = new Subject<void>();

  private _isPanning: boolean;

  /** Slider adapter */
  adapter: SliderAdapter;

  /** Gallery ID */
  @Input() galleryId: string;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Stream that emits when item is clicked */
  @Output() itemClick = new EventEmitter<number>();

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<GalleryError>();

  @ViewChild('slider', { static: true }) sliderEl: ElementRef;

  @ViewChildren(GalleryItemComponent) items = new QueryList<GalleryItemComponent>();

  get slider(): HTMLElement {
    return this.sliderEl.nativeElement;
  }

  constructor(private _el: ElementRef,
              private _zone: NgZone,
              private _platform: Platform,
              private _smoothScroll: SmoothScrollManager,
              private _gallery: Gallery) {
    this._zone.runOutsideAngular(() => {
      this.scrollHandler$.pipe(
        switchMap(({ value, behavior }: ScrollObserver) => {
          this.slider.style.scrollSnapType = 'unset';
          this.slider.classList.add('g-scrolling');
          const el: HTMLElement = this.items.get(value)?.el.nativeElement;
          if (el) {
            const pos = this.adapter.getScrollToValue(el, behavior || this.config.scrollBehavior);
            return from(this._smoothScroll.scrollTo(this.slider, pos)).pipe(
              tap(() => {
                this._isPanning = false;
                this.slider.classList.remove('g-scrolling');
                this.slider.style.scrollSnapType = this.adapter.scrollSnapType;
              })
            );
          }
          return EMPTY;
        }),
        takeUntil(this._destroyed$)
      ).subscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      if (changes.config.currentValue?.slidingDirection !== changes.config.previousValue?.slidingDirection) {
        switch (this.config.slidingDirection) {
          case SlidingDirection.Horizontal:
            this.adapter = new HorizontalAdapter(this.slider, this.config);
            break;
          case SlidingDirection.Vertical:
            this.adapter = new VerticalAdapter(this.slider, this.config);
            break;
        }

        if (!changes.config.firstChange) {
          // Keep the correct sliding position when direction changes
          requestAnimationFrame(() => {
            this.scrollToIndex(this.state.currIndex, 'auto');
          });
        }

        // Reactivate gestures
        this.enableDisableGestures();
      }

      if (!changes.config.firstChange && changes.config.currentValue?.mouseSlidingDisabled !== changes.config.previousValue?.mouseSlidingDisabled) {
        this.enableDisableGestures();
      }
    }

    // Scroll to current index
    if (changes.state && changes.state.currentValue?.currIndex !== changes.state.previousValue?.currIndex) {
      requestAnimationFrame(() => {
        this.scrollToIndex(this.state.currIndex, changes.state.firstChange ? 'auto' : this.state.behavior);
      });
    }
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => {

      // We need to set the visibleElements in the viewport using intersection observer
      this.createIntersectionObserver(this.slider).pipe(
        tap((entry: IntersectionObserverEntry) => {
          entry.target.classList.toggle('g-item-visible', entry.isIntersecting);
          if (entry.isIntersecting) {
            this.visibleElements.set(entry.target, entry);
          } else {
            this.visibleElements.delete(entry.target);
          }
        }),
        takeUntil(this._destroyed$)
      ).subscribe();

      // Subscribe to slider scroll event
      fromEvent(this.slider, 'scroll', { passive: true }).pipe(
        debounceTime(50),
        filter(() => !this._isPanning),
        tap(() => this.onViewportScroll()),
        takeUntil(this._destroyed$)
      ).subscribe();

      // Detect if the size of the slider has changed detecting current index on scroll
      if (this._platform.isBrowser) {
        resizeObservable(this._el.nativeElement).pipe(
          debounceTime(this.config.resizeDebounceTime),
          tap(([entry]: ResizeObserverEntry[]) => this.onHostResize(entry)),
          takeUntil(this._destroyed$)
        ).subscribe();
      }
    });
  }

  ngAfterViewInit() {
    this.items.notifyOnChanges();
    this.items.changes.pipe(
      startWith(null),
      tap(() => {
        // Disconnect all and reconnect later
        this.visibleElements.forEach((item: IntersectionObserverEntry) => {
          this.intersectionObserver.unobserve(item.target);
        });

        // Connect with the new items
        this.items.toArray().map((item: GalleryItemComponent) => {
          this.intersectionObserver.observe(item.el.nativeElement);
        });
      }),
      takeUntil(this._destroyed$)
    ).subscribe();
  }

  ngAfterViewChecked() {
    this.slider.style.setProperty('--slider-centralize-start-size', this.adapter.getCentralizerStartSize() + 'px');
    this.slider.style.setProperty('--slider-centralize-end-size', this.adapter.getCentralizerEndSize() + 'px');
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    this.deactivateGestures();
  }

  onItemActivated(el: Element): void {
    // Auto-height feature
    if (this.config.autoHeight && el.clientHeight) {
      // Change slider height
      this.slider.style.height = `${ el.clientHeight }px`;
      // Change root component height
      (this._el.nativeElement as Element).parentElement.parentElement.parentElement.style.height = `${ el.clientHeight }px`;
    }
  }

  trackByFn(index: number, item: any) {
    return item.type;
  }

  private onHostResize(entry: ResizeObserverEntry): void {
    const width: number = Math.ceil(entry.contentRect.width);
    const height: number = Math.ceil(entry.contentRect.height);
    this.slider.style.width = `${ width }px`;
    if (this.config.contentVisibilityAuto) {
      this.slider.style.setProperty('--item-contain-intrinsic-size', `${ width }px ${ height }px`);
    }
  }

  private onViewportScroll(): void {
    // Check if the index value has no fraction
    this.visibleElements.forEach((entry: IntersectionObserverEntry) => {
      const allowedMargin: number = 10;
      const offsetDiff: number = (this.adapter.clientSize - this.adapter.getClientSize(entry.target as HTMLElement)) / 2;
      const rangeStart: number = this.adapter.scrollValue + offsetDiff;
      const rangeEnd: number = this.adapter.scrollValue + this.adapter.clientSize - offsetDiff;
      const elStart: number = this.adapter.getOffsetSize(entry.target as HTMLElement);
      const elEnd: number = elStart + this.adapter.getClientSize(entry.target as HTMLElement);

      const isStart: boolean = rangeStart + allowedMargin >= elStart && rangeStart - allowedMargin <= elStart;
      const isEnd: boolean = rangeEnd + allowedMargin >= elEnd && rangeEnd - allowedMargin <= elEnd;

      const index: number = +entry.target.getAttribute('galleryIndex');

      if (isStart && isEnd) {
        this._zone.run(() => this._gallery.ref(this.galleryId).set(index, 'smooth'));
      } else {
        // Reset position
        this.slider.style.scrollSnapType = this.adapter.scrollSnapType;
      }
      return;
    });
  }

  private scrollToIndex(value: number, behavior: ScrollBehavior, onEnd?: () => void): void {
    this.scrollHandler$.next({ value, behavior, onEnd });
  }

  private enableDisableGestures(): void {
    // Enable/Disable mouse sliding on desktop browser only
    if (!this._platform.IOS && !this._platform.ANDROID) {
      if (!this.config.mouseSlidingDisabled) {
        this.activateGestures();
      } else {
        this.deactivateGestures();
      }
    }
  }

  private activateGestures(): void {
    if (typeof Hammer !== 'undefined') {
      // Destroy hammer if a previous instance was created
      this.deactivateGestures();

      const direction: number = this.adapter.panDirection;

      // Activate gestures
      this._zone.runOutsideAngular(() => {
        this._hammer = new Hammer(this._el.nativeElement, { inputClass: Hammer.MouseInput });
        this._hammer.get('pan').set({ direction });

        let panOffset: number;

        // Set panOffset for sliding on pan start event
        this._hammer.on('panstart', () => {
          this._smoothScroll.dismissOngoingScroll(this.slider);
          panOffset = this.adapter.scrollValue;
          // Disable scroll-snap-type functionality
          this.slider.style.scrollSnapType = 'unset';
          this.slider.classList.add('g-sliding');
          this._isPanning = true;
        });

        this._hammer.on('panmove', (e: any) => this.slider.scrollTo(this.adapter.getPanValue(panOffset, e, 'auto')));

        this._hammer.on('panend', (e: any) => this.onPanEnd(e));
      });
    }
  }

  private deactivateGestures(): void {
    this._hammer?.destroy();
  }

  protected onPanEnd(e): void {
    this.slider.classList.remove('g-sliding');
    const delta: number = this.adapter.getPanDelta(e);
    const velocity: number = this.adapter.getPanVelocity(e);

    const galleryRef = this._gallery.ref(this.galleryId);

    this._zone.run(() => {
      // Check if scrolled item is great enough to navigate
      const el: Element = this.items.get(this.state.currIndex)?.el.nativeElement;
      if (Math.abs(delta) > (el.clientWidth || this.adapter.clientSize) / 2) {
        return delta > 0 ? galleryRef.prev('smooth', false) : galleryRef.next('smooth', false);
      }
      // Check if velocity is great enough to navigate
      if (Math.abs(velocity) > 0.3) {
        return velocity > 0 ? galleryRef.prev('smooth', false) : galleryRef.next('smooth', false);
      }
      // Need to scroll back manually since the currIndex did not change
      this.scrollToIndex(this.state.currIndex, 'smooth');
    });
  }

  private createIntersectionObserver(slider: HTMLElement): Observable<IntersectionObserverEntry> {
    return new Observable((observer: Subscriber<IntersectionObserverEntry[]>) => {
      this.intersectionObserver = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => observer.next(entries),
        { root: slider }
      );
      return () => this.intersectionObserver.disconnect();
    }).pipe(
      mergeMap((entries: IntersectionObserverEntry[]) => entries),
      distinctUntilChanged(),
    );
  }
}
