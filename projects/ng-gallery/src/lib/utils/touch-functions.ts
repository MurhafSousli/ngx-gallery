import { fromEvent, merge, race, Subscription } from 'rxjs';
import { elementAt, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { SlidingDirection } from '../models/constants';
import { SwipeSubscriptionConfig, SwipeStartEvent, SwipeCoordinates, SwipeEvent, TouchEventWithCoordinates } from '../models/swipe.model';


export function createSwipeSubscription({ domElement, onSwipeMove, onSwipeEnd }: SwipeSubscriptionConfig): Subscription {
  if (!(domElement instanceof HTMLElement)) {
    throw new Error('Provided domElement should be an instance of HTMLElement');
  }

  if ((typeof onSwipeMove !== 'function') && (typeof onSwipeEnd !== 'function')) {
    throw new Error('At least one of the following swipe event handler functions should be provided: onSwipeMove and/or onSwipeEnd');
  }

  const touchStarts$ = merge(
    fromEvent<TouchEvent>(domElement, 'touchstart', { passive: true }).pipe(map(getTouchCoordinates)),
    fromEvent<MouseEvent>(domElement, 'mousedown', { passive: true }).pipe(map(getMouseCoordinates))
  );
  const touchMoves$ = merge(
    fromEvent<TouchEvent>(domElement, 'touchmove', { passive: true }).pipe(map(getTouchCoordinates)),
    fromEvent<MouseEvent>(domElement, 'mousemove', { passive: true }).pipe(map(getMouseCoordinates))
  );
  const touchEnds$ = merge(
    fromEvent<TouchEvent>(domElement, 'touchend', { passive: true }).pipe(map(getTouchCoordinates)),
    fromEvent<MouseEvent>(domElement, 'mouseup', { passive: true }).pipe(map(getMouseCoordinates)),
    fromEvent<MouseEvent>(domElement, 'mouseout', { passive: true }).pipe(map(getMouseCoordinates))
  );
  const touchCancels$ = fromEvent<TouchEvent>(domElement, 'touchcancel', { passive: true }) ;

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
  ).subscribe();
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