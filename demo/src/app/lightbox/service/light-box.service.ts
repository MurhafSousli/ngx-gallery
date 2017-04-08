import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class LightBoxService {

  state: BehaviorSubject<LightBoxState>;
  config: LightBoxConfig = defaultConfig;

  constructor( @Optional() config: LightBoxConfig) {
    console.log('service works');
    this.state = new BehaviorSubject<LightBoxState>(defaultState);
    this.config = Object.assign({}, defaultConfig, config);
  }

  load(images: LightBoxImage[]) {

    this.state.next({
      images: images,
      currIndex: 0,
      hasNext: images.length > 1,
      hasPrev: false,
      active: false
    });
  }

  setCurrent(index: number) {
    let state = this.state.getValue();

    this.state.next(Object.assign({}, state, {
      currIndex: index,
      hasNext: index < state.images.length - 1,
      hasPrev: index > 0,
      active: true
    }));
  }

  next() {
    let state = this.state.getValue();

    if (state.hasNext) {
      let index = state.currIndex + 1;
      this.setCurrent(index);
    } else {
      this.setCurrent(0);
    }
  }

  prev() {
    let state = this.state.getValue();

    if (state.hasPrev) {
      let index = state.currIndex - 1;
      this.setCurrent(index);
    } else {
      this.setCurrent(state.images.length - 1);
    }
  }

  close() {
    let state = this.state.getValue();

    this.state.next(Object.assign({}, state, {
      active: false
    }));
  }

  reset() {
    this.state.next(defaultState);
  }
}

const defaultState = {
  images: undefined,
  currIndex: undefined,
  hasNext: undefined,
  hasPrev: undefined,
  active: false
};

const defaultConfig = {
  width: 1000,
  height: 500,
  thumb: {
    width: 90,
    height: 60,
    position: true,
    overlay: false
  }
}

export interface LightBoxState {
  active: boolean;
  images?: LightBoxImage[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface LightBoxImage {

  src: string;
  thumbnail?: string;
  text?: string;
}

export interface LightBoxConfig {
  width?,
  height?,
  transition?,
  thumb?: {
    width?;
    height?;
    position?;
    overlay?;
  }
}
