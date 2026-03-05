export interface SliderState {
  style: any;
  instant: boolean;
}

export interface WorkerState {
  value: number;
  instant: boolean;
}

export interface IndexChange {
  index: number;
  behavior: ScrollBehavior;
}
