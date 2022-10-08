import { SlidingDirection } from "./constants";

export interface SwipeCoordinates {
  x: number;
  y: number;
}

export interface TouchEventWithCoordinates extends SwipeCoordinates {
  timeStamp: number;
}

export interface SwipeStartEvent extends TouchEventWithCoordinates {
  direction: SlidingDirection;
}

export interface SwipeEvent {
  direction: SlidingDirection;
  distance: number;
  startEvent: SwipeStartEvent;
  moveEvent: TouchEventWithCoordinates;
  velocity: number
}

export interface SwipeSubscriptionConfig {
  domElement: HTMLElement;
  enableMouseEvents: boolean;
  onSwipeMove?: (event: SwipeEvent) => void;
  onSwipeEnd?: (event: SwipeEvent) => void;
}
