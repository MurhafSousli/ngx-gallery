import { fromEvent, merge, race } from 'rxjs';
import { elementAt, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SlidingDirection } from '../models/constants';
import { SwipeSubscriptionConfig, SwipeStartEvent, SwipeCoordinates, SwipeEvent, TouchEventWithCoordinates } from '../models/swipe.model';


export const createSwipeSubscription = (config: SwipeSubscriptionConfig) => merge(
  getMouseObservable(config),
  getTouchObservable(config)
).subscribe();


// Mouse swipe events observable
const getMouseObservable = ({ domElement, onSwipeMove, onSwipeEnd }: SwipeSubscriptionConfig) => {
  const mouseUp$ = fromEvent<MouseEvent>(domElement, 'mouseup', { passive: true });
  const mouseMoves$ = fromEvent<MouseEvent>(domElement, 'mousemove', { passive: true });
  const mouseDown$ = fromEvent<MouseEvent>(domElement, 'mousedown', { passive: true });
  const mouseOut$ = fromEvent<MouseEvent>(domElement, 'mouseout', { passive: true });

  const mouseStartsWithDirection$ = mouseDown$.pipe(
    map(getMouseCoordinates),
    switchMap(mouseStartEvent => mouseMoves$.pipe(
      elementAt(3),
      takeUntil(mouseUp$),
      map(getMouseCoordinates),
      map(mouseMoveEvent => ({
        ...mouseMoveEvent,
        direction: getTouchDirection(mouseStartEvent, mouseMoveEvent)
      } as SwipeStartEvent)
      )
    ))
  );

  return mouseStartsWithDirection$.pipe(
    switchMap(mouseStartEvent => mouseMoves$.pipe(
      map(getMouseCoordinates),
      tap(coordinates => onSwipeMove(getSwipeEvent(mouseStartEvent, coordinates))),
      takeUntil(
        merge(mouseUp$, mouseOut$).pipe(
          map(getMouseCoordinates),
          tap(coordinates => onSwipeEnd(getSwipeEvent(mouseStartEvent, coordinates))),
        ))
    ))
  );
};

// Touch swipe events observable
const getTouchObservable = ({ domElement, onSwipeMove, onSwipeEnd }: SwipeSubscriptionConfig) => {
  const touchStarts$ = fromEvent<TouchEvent>(domElement, 'touchstart', { passive: true });
  const touchMoves$ = fromEvent<TouchEvent>(domElement, 'touchmove', { passive: true });
  const touchEnds$ = fromEvent<TouchEvent>(domElement, 'touchend', { passive: true });
  const touchCancels$ = fromEvent<TouchEvent>(domElement, 'touchcancel', { passive: true });

  const touchStartsWithDirection$ = touchStarts$.pipe(
    map(getTouchCoordinates),
    switchMap(touchStartEvent => touchMoves$.pipe(
      elementAt(3),
      takeUntil(race(
        touchEnds$,
        touchCancels$
      )),
      map(getTouchCoordinates),
      map(touchMoveEvent => ({
        ...touchMoveEvent,
        direction: getTouchDirection(touchStartEvent, touchMoveEvent)
      } as SwipeStartEvent)
      )
    ))
  );

  return touchStartsWithDirection$.pipe(
    switchMap(touchStartEvent => touchMoves$.pipe(
      map(getTouchCoordinates),
      tap(coordinates => onSwipeMove(getSwipeEvent(touchStartEvent, coordinates))),
      takeUntil(race(
        touchEnds$.pipe(
          map(getTouchCoordinates),
          tap(coordinates => onSwipeEnd(getSwipeEvent(touchStartEvent, coordinates))),
        ),
        touchCancels$
      ))
    ))
  );
};

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
};

const getSwipeEvent = (startEvent: SwipeStartEvent, moveEvent: TouchEventWithCoordinates): SwipeEvent => {
  const distance = getTouchDistance(startEvent, moveEvent)[startEvent.direction === SlidingDirection.Horizontal ? 'x' : 'y'];
  return {
    moveEvent,
    startEvent,
    direction: startEvent.direction,
    distance,
    velocity: distance / (moveEvent.timeStamp - startEvent.timeStamp)
  };
};