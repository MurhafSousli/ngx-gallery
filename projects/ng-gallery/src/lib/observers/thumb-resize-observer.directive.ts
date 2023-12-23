import {
  Directive,
  Input,
  Output,
  OnInit,
  OnChanges,
  OnDestroy,
  NgZone,
  ElementRef,
  SimpleChanges,
  EventEmitter
} from '@angular/core';
import { Subscription, tap, auditTime, animationFrameScheduler, debounceTime } from 'rxjs';
import { resizeObservable } from '../utils/resize-observer';
import { GalleryConfig } from '../models/config.model';
import { SliderAdapter } from '../components/adapters';

@Directive({
  selector: '[thumbResizeObserver]',
  standalone: true
})
export class ThumbResizeObserver implements OnChanges, OnInit, OnDestroy {

  private _resizeSubscription: Subscription;

  private get _viewport(): HTMLElement {
    return this._el.nativeElement;
  }

  @Input() config: GalleryConfig;

  @Input() adapter: SliderAdapter;

  @Output('thumbResizeObserver') resized: EventEmitter<void> = new EventEmitter();

  constructor(private _el: ElementRef<HTMLElement>, private _zone: NgZone) {
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => {
      this._resizeSubscription = resizeObservable(this._viewport).pipe(
        debounceTime(this.config.resizeDebounceTime, animationFrameScheduler),
        tap(() => {
          this.updateSliderSize();
          this.resized.emit();
        })
      ).subscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.config.firstChange) {
      this.updateSliderSize();
    }
  }

  ngOnDestroy(): void {
    this._resizeSubscription?.unsubscribe();
  }

  private updateSliderSize(): void {
    this._viewport.style.setProperty('--thumb-centralize-start-size', this.adapter.getCentralizerStartSize() + 'px');
    this._viewport.style.setProperty('--thumb-centralize-end-size', this.adapter.getCentralizerEndSize() + 'px');
  }
}
