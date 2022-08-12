import { fromEvent, merge, race } from 'rxjs';
import { elementAt, finalize, map, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { SlidingDirection } from '../models/constants';
import { SwipeSubscriptionConfig, SwipeStartEvent, SwipeCoordinates, SwipeEvent, TouchEventWithCoordinates } from '../models/swipe.model';


export const createSwipeSubscription = (config: SwipeSubscriptionConfig) => merge(
  getMouseObservable(config),
  getTouchObservable(config)
).subscribe();


// Mouse swipe events observable
const getMouseObservable = ({ domElement, onSwipeMove, onSwipeEnd }: SwipeSubscriptionConfig) => {
  const mouseDown$ = fromEvent<MouseEvent>(domElement, 'mousedown', { passive: true });
  const mouseUp$ = fromEvent<MouseEvent>(domElement, 'mouseup', { passive: true });
  const mouseOut$ = fromEvent<MouseEvent>(domElement, 'mouseout', { passive: true });

  const mouseStarts$ = mouseDown$.pipe(map(getMouseCoordinates));
  const mouseMoves$ = fromEvent<MouseEvent>(domElement, 'mousemove', { passive: true }).pipe(map(getMouseCoordinates));
  const mouseEnds$ = merge(mouseUp$, mouseOut$);

  let mousedownFlag = false;
  const mousedownSubscription = mouseDown$.subscribe(() => mousedownFlag = true);
  const mouseupSubsctiption = mouseEnds$.subscribe(() => mousedownFlag = false);

  const mouseStartsWithDirection$ = mouseStarts$.pipe(
    finalize(() => {
      mousedownSubscription.unsubscribe();
      mouseupSubsctiption.unsubscribe();
    }),
    switchMap(mouseStartEvent => mouseMoves$.pipe(
      elementAt(3),
      takeWhile(() => mousedownFlag),
      map(mouseMoveEvent => ({
        ...mouseMoveEvent,
        direction: getTouchDirection(mouseStartEvent, mouseMoveEvent)
      } as SwipeStartEvent)
      ))
    )
  );

  return mouseStartsWithDirection$.pipe(
    switchMap(mouseStartEvent => mouseMoves$.pipe(
      tap(coordinates => {
        if (typeof onSwipeMove !== 'function') { return; }
        
        onSwipeMove(getSwipeEvent(mouseStartEvent, coordinates));
      }),
      takeUntil(
        mouseEnds$.pipe(
          map(getMouseCoordinates),
          tap(coordinates => {
            if (typeof onSwipeEnd !== 'function') { return; }
            onSwipeEnd(getSwipeEvent(mouseStartEvent, coordinates));
          }),
        ))
    )),
  );
}

// Touch swipe events observable
const getTouchObservable = ({ domElement, onSwipeMove, onSwipeEnd }: SwipeSubscriptionConfig) => {
  const touchStarts$ = fromEvent<TouchEvent>(domElement, 'touchstart', { passive: true }).pipe(map(getTouchCoordinates));
  const touchMoves$ = fromEvent<TouchEvent>(domElement, 'touchmove', { passive: true }).pipe(map(getTouchCoordinates));
  const touchEnds$ = fromEvent<TouchEvent>(domElement, 'touchend', { passive: true }).pipe(map(getTouchCoordinates));
  const touchCancels$ = fromEvent<TouchEvent>(domElement, 'touchcancel', { passive: true });

  const touchStartsWithDirection$ = touchStarts$.pipe(
    switchMap(touchStartEvent => touchMoves$.pipe(
      elementAt(3),
      map(touchMoveEvent => ({
        ...touchMoveEvent,
        direction: getTouchDirection(touchStartEvent, touchMoveEvent)
      } as SwipeStartEvent)
      ))
    )
  );

  return touchStartsWithDirection$.pipe(
    switchMap(touchStartEvent => touchMoves$.pipe(
      tap(coordinates => {
        if (typeof onSwipeMove !== 'function') { return; }
        onSwipeMove(getSwipeEvent(touchStartEvent, coordinates));
      }),
      takeUntil(race(
        touchEnds$.pipe(
          tap(coordinates => {
            if (typeof onSwipeEnd !== 'function') { return; }
            onSwipeEnd(getSwipeEvent(touchStartEvent, coordinates));
          }),
        ),
        touchCancels$
      ))
    ))
  );
}

const getTouchCoordinates = (touchEvent: TouchEvent): TouchEventWithCoordinates => ({
  x: touchEvent.changedTouches[0].clientX,
  y: touchEvent.changedTouches[0].clientY,
  timeStamp: touchEvent.timeStamp
});

const getMouseCoordinates = (touchEvent: MouseEvent): TouchEventWithCoordinates => ({
  x: touchEvent.clientX,
  y: touchEvent.clientY,
  timeStamp: touchEvent.timeStamp
});

const getTouchDistance = (startCoordinates: TouchEventWithCoordinates, moveCoordinates: TouchEventWithCoordinates): SwipeCoordinates => ({
  x: moveCoordinates.x - startCoordinates.x,
  y: moveCoordinates.y - startCoordinates.y
});


const getTouchDirection = (startCoordinates: TouchEventWithCoordinates, moveCoordinates: TouchEventWithCoordinates): SlidingDirection => {
  const { x, y } = getTouchDistance(startCoordinates, moveCoordinates);
  return Math.abs(x) < Math.abs(y) ? SlidingDirection.Vertical : SlidingDirection.Horizontal;
}

const getSwipeEvent = (startEvent: SwipeStartEvent, moveEvent: TouchEventWithCoordinates): SwipeEvent => {

  const distance = getTouchDistance(startEvent, moveEvent)[startEvent.direction === SlidingDirection.Horizontal ? 'x' : 'y'];
  return {
    moveEvent,
    startEvent,
    direction: startEvent.direction,
    distance,
    velocity: distance / (moveEvent.timeStamp - startEvent.timeStamp)
  };
}