import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LightBoxService {

  state: BehaviorSubject<LightBoxState>;

  constructor() {
    this.state = new BehaviorSubject<LightBoxState>(defaultState);
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

  reset(){
    this.state.next(defaultState);
  }
}

const defaultState ={
  images: undefined,
  currIndex: undefined,
  hasNext: undefined,
  hasPrev: undefined,
  active: false
};

export interface LightBoxState {
  active: boolean;
  images?: LightBoxImage[];
  currIndex?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
  //autoplay
  //interval
  //progressbar
  //progresscircle
}

export interface LightBoxImage {

  src: string;
  thumbnail?: string;
  text?: string;
}
