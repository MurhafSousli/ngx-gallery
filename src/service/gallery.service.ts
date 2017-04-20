import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GalleryState, GalleryImage } from './gallery.state';
import { GalleryConfig } from './gallery.config';
import { defaultState, defaultConfig } from './gallery.default';

@Injectable()
export class GalleryService {

  state: BehaviorSubject<GalleryState>;
  config: GalleryConfig = defaultConfig;

  constructor( @Optional() config: GalleryConfig) {
    this.state = new BehaviorSubject<GalleryState>(defaultState);
    this.config = Object.assign({}, defaultConfig, config);
  }

  load(images: GalleryImage[]) {

    this.state.next({
      images: images,
      currIndex: 0,
      hasNext: images.length > 1,
      hasPrev: false,
      active: false
    });
  }

  setCurrent(index: number) {
    const state = this.state.getValue();

    this.state.next(Object.assign({}, state, {
      prevIndex: state.currIndex,
      currIndex: index,
      hasNext: index < state.images.length - 1,
      hasPrev: index > 0,
      active: true
    }));
  }

  next() {
    const state = this.state.getValue();

    if (state.hasNext) {
      const index = state.currIndex + 1;
      this.setCurrent(index);
    } else {
      this.setCurrent(0);
    }
  }

  prev() {
    const state = this.state.getValue();

    if (state.hasPrev) {
      const index = state.currIndex - 1;
      this.setCurrent(index);
    } else {
      this.setCurrent(state.images.length - 1);
    }
  }

  close() {
    const state = this.state.getValue();

    this.state.next(Object.assign({}, state, {
      active: false
    }));
  }

  reset() {
    this.state.next(defaultState);
  }
}
