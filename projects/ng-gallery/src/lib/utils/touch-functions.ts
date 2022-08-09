import { fromEvent, race, Subscription } from 'rxjs';
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

  const touchStarts$ = fromEvent<TouchEvent>(domElement, 'mousedown').pipe(map(getTouchCoordinates));
  const touchMoves$ = fromEvent<TouchEvent>(domElement, 'touchmove').pipe(map(getTouchCoordinates));
  const touchEnds$ = fromEvent<TouchEvent>(domElement, 'touchend').pipe(map(getTouchCoordinates));
  const touchCancels$ = fromEvent<TouchEvent>(domElement, 'touchcancel');
 
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

function getTouchCoordinates(touchEvent: TouchEvent): TouchEventWithCoordinates {
  console.log(touchEvent);
  return {
    x: touchEvent.changedTouches[0].clientX,
    y: touchEvent.changedTouches[0].clientY,
    sourceEvent: touchEvent
  };
}

function getTouchDistance(startCoordinates: TouchEventWithCoordinates, moveCoordinates: TouchEventWithCoordinates): SwipeCoordinates {
  return {
    x: moveCoordinates.x - startCoordinates.x,
    y: moveCoordinates.y - startCoordinates.y
  };
}

function getTouchDirection(startCoordinates: TouchEventWithCoordinates, moveCoordinates: TouchEventWithCoordinates): SlidingDirection {
  const { x, y } = getTouchDistance(startCoordinates, moveCoordinates);
  return Math.abs(x) < Math.abs(y) ? SlidingDirection.Vertical : SlidingDirection.Horizontal;
}

function getSwipeEvent(touchStartEvent: SwipeStartEvent, coordinates: TouchEventWithCoordinates): SwipeEvent {
  
  const distance = getTouchDistance(touchStartEvent, coordinates);
  return {
    moveEvent: coordinates,
    startEvent: touchStartEvent,
    direction: touchStartEvent.direction,
    distance: distance[touchStartEvent.direction === SlidingDirection.Horizontal ? 'x' : 'y']
  };
}