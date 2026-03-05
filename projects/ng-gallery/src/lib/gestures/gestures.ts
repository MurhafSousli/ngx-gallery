import { Directionality } from '@angular/cdk/bidi';
import { Observable, Subject, fromEvent, switchMap, takeUntil, tap, finalize } from 'rxjs';
import { SliderAdapter } from '../adapters';

export class Gestures {

  panStart: Subject<void> = new Subject<void>();
  panMove: Subject<number> = new Subject<number>();
  panEnd: Subject<'swipeNext' | 'swipePrev' | null> = new Subject<'swipeNext' | 'swipePrev' | null>();

  constructor(private el: HTMLElement,
              private doc: Document,
              private adapter: SliderAdapter,
              private dir: Directionality,
              destroy$: Observable<void>) {
    this.activateGestures().pipe(takeUntil(destroy$)).subscribe();
  }

  private activateGestures(): Observable<any> {
    const mouseDown$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.el, 'mousedown');
    const mouseMove$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.doc, 'mousemove', { capture: true });
    const mouseUp$: Observable<MouseEvent> = fromEvent<MouseEvent>(this.doc, 'mouseup');

    const THRESHOLD: number = 10;

    return mouseDown$.pipe(
      switchMap((startEvent: MouseEvent) => {
        // Initialize with mousedown values as a fallback
        let startScrollValue: number = this.adapter.scrollValue;
        let startDraggingProperty: number = this.adapter.getDraggingProperty(startEvent);

        let isDragging: boolean = false;

        // TRACKING RECENT MOVEMENT
        let lastMoveEvent: MouseEvent = startEvent;
        let velocity: number = 0;

        return mouseMove$.pipe(
          tap((moveEvent: MouseEvent) => {
            // Total distance for threshold check
            const distance: number = Math.hypot(
              moveEvent.clientX - startEvent.clientX,
              moveEvent.clientY - startEvent.clientY
            );

            // Threshold Check (Like Hammer's internal recognizer)
            if (!isDragging && distance > THRESHOLD) {
              isDragging = true;
              /**
               *  RE-SYNC ON START
               * If a smooth scroll was active, the scroll position changed between 'mousedown' and 'threshold reached'.
               * We must capture the ACTUAL current scroll position NOW to prevent the "jump" back to the
               * coordinates where the user first clicked.
               */
              startScrollValue = this.adapter.scrollValue;
              /**
               * We also update the 'zero point' for the mouse. By setting this to the
               * current moveEvent, we ensure the 'delta' starts at 0 from this frame.
               * This prevents a 10px jump (the threshold distance) on the first frame.
               */
              startDraggingProperty = this.adapter.getDraggingProperty(moveEvent);

              this.panStart.next();
            }

            if (isDragging) {
              moveEvent.preventDefault();

              // INSTANTANEOUS VELOCITY CALCULATION
              // Calculate velocity based on change since the LAST move event, not the START event
              const deltaProperty: number = this.adapter.getDraggingProperty(moveEvent) - this.adapter.getDraggingProperty(lastMoveEvent);
              const deltaTime: number = moveEvent.timeStamp - lastMoveEvent.timeStamp;

              if (deltaTime > 0) {
                // We use a simple moving average (Low-pass filter) to smooth out jitter
                const currentVelocity: number = deltaProperty / deltaTime;
                velocity = (currentVelocity * 0.8) + (velocity * 0.2);
              }
              lastMoveEvent = moveEvent; // Update the reference for the next frame

              // Apply scroll: (Current Scroll Position at Drag Start) - (Mouse Movement since Drag Start)
              const delta: number = this.adapter.getDraggingProperty(moveEvent) - startDraggingProperty;
              this.panMove.next(startScrollValue - delta);
            }
          }),
          takeUntil(mouseUp$),
          finalize(() => {
            // If dragging was not recognized, skip
            if (!isDragging) return;
            // Check if the last movement was too long ago (user paused before release)
            const timeSinceLastMove: number = this.doc.defaultView.performance.now() - lastMoveEvent.timeStamp;
            if (timeSinceLastMove > 100) {
              velocity = 0; // User stopped moving before letting go
            }

            // Navigate toward the neighbor item if scrolling velocity was high enough
            if (Math.abs(velocity) > 0.3) {
              if (this.dir.value === 'rtl') {
                this.panEnd.next(velocity < 0 ? 'swipePrev' : 'swipeNext');
              } else {
                this.panEnd.next(velocity > 0 ? 'swipePrev' : 'swipeNext');
              }
            } else {
              this.panEnd.next(null);
            }
          })
        );
      })
    );
  }
}
