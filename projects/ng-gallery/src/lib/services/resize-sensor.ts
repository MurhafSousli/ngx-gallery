import {
  Directive,
  signal,
  inject,
  effect,
  ElementRef,
  WritableSignal,
  EffectCleanupRegisterFn, OutputEmitterRef, output
} from '@angular/core';
import { Observable, Subscriber, Subscription, debounceTime, mergeMap, animationFrameScheduler } from 'rxjs';
import { GalleryRef } from './gallery-ref';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';

@Directive({
  standalone: true,
  selector: '[resizeSensor]'
})
export class ResizeSensor {

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  size: WritableSignal<DOMRectReadOnly> = signal(null);

  // TODO: rethink if it is better to just emit to output directly without converting the signal to observable
  resizeSensor: OutputEmitterRef<DOMRectReadOnly> = output<DOMRectReadOnly>();

  constructor() {
    let resizeSubscription$: Subscription;

    effect((onCleanup: EffectCleanupRegisterFn) => {
      resizeSubscription$?.unsubscribe();

      resizeSubscription$ = new Observable((subscriber: Subscriber<ResizeObserverEntry[]>) => {
        const resizeObserver: ResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => subscriber.next(entries));
        resizeObserver.observe(this.nativeElement);
        return () => resizeObserver.disconnect();
      }).pipe(
        mergeMap((entries: ResizeObserverEntry[]) => entries),
        debounceTime(this.galleryRef.config().resizeDebounceTime, animationFrameScheduler),
      ).subscribe((entry: ResizeObserverEntry) => {
        if (entry.contentRect.height) {
          this.size.set(entry.contentRect);
          this.resizeSensor.emit(entry.contentRect);
        }
      });

      onCleanup(() => resizeSubscription$?.unsubscribe());
    });
  }
}
