import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators/filter';
import { Observable } from 'rxjs/Observable';
import { defaultConfig, defaultState } from '../utils/gallery.default';
import {
  GalleryState,
  GalleryConfig,
  GalleryAction,
  GalleryItem
} from '../models';

export class GalleryRef {
  state$: BehaviorSubject<GalleryState>;
  config$: BehaviorSubject<GalleryConfig>;

  constructor(
    public config: GalleryConfig = defaultConfig,
    public state: GalleryState = defaultState
  ) {
    this.state$ = new BehaviorSubject<GalleryState>(state);
    this.config$ = new BehaviorSubject<GalleryConfig>(defaultConfig);
    this.setConfig(config);
  }

  /**
   * Set gallery config
   * @param config
   */
  setConfig(config: GalleryConfig) {
    this.config = { ...defaultConfig, ...this.config, ...config };
    this.config$.next(this.config);
  }

  /**
   * Set gallery state
   * @param state
   */
  setState(state: GalleryState) {
    this.state = { ...this.state, ...state };
    this.state$.next(this.state);
  }

  /** Add gallery item
   * @param item - Gallery item object
   * @param active - Set the new item as current slide
   */
  add(item: GalleryItem, active?: boolean) {
    const items = [...this.state.items, item];
    this.setState({
      action: GalleryAction.ITEMS_CHANGED,
      items: items,
      hasNext: items.length > 1,
      currIndex: active ? items.length - 1 : this.state.currIndex
    });
  }

  /** Remove gallery item
   * @param i - Item index
   */
  remove(i: number) {
    const items = [
      ...this.state.items.slice(0, i),
      ...this.state.items.slice(i + 1, this.state.items.length)
    ];
    this.setState({
      action: GalleryAction.ITEMS_CHANGED,
      items: items,
      hasNext: items.length > 1,
      hasPrev: i > 0
    });
  }

  /**
   * Load items and reset the state
   * @param items - Gallery images data
   */
  load(items: GalleryItem[]) {
    if (items) {
      this.setState({
        action: GalleryAction.ITEMS_CHANGED,
        items: items,
        hasNext: items.length > 1,
        hasPrev: false
      });
    }
  }

  /**
   * Set active item
   * @param i - Active Index
   * @param action - Action type
   */
  set(i: number) {
    if (i !== this.state.currIndex) {
      this.setState({
        action: GalleryAction.INDEX_CHANGED,
        currIndex: i,
        hasNext: i < this.state.items.length - 1,
        hasPrev: i > 0
      });
    }
  }

  /**
   * Next item
   */
  next() {
    if (this.state.hasNext) {
      this.set(this.state.currIndex + 1);
    } else if (this.config.loop) {
      this.set(0);
    }
  }

  /**
   * Prev item
   */
  prev() {
    if (this.state.hasPrev) {
      this.set(this.state.currIndex - 1);
    } else if (this.config.loop) {
      this.set(this.state.items.length - 1);
    }
  }

  /**
   * Reset gallery to initial state
   */
  reset() {
    this.setState(defaultState);
  }

  /**
   * Destroy GalleryRef (for internal use only)
   */
  destroy() {
    this.state$.complete();
    this.config$.complete();
  }

  /** Gallery Events */

  /**
   * Stream that emits when gallery is initialized/reset
   */
  initialized(): Observable<GalleryState> {
    return this.state$.pipe(
      filter(
        (state: GalleryState) => state.action === GalleryAction.INITIALIZED
      )
    );
  }

  /**
   * Stream that emits when items is changed (items loaded, item added, item removed)
   */
  itemsChanged(): Observable<GalleryState> {
    return this.state$.pipe(
      filter(
        (state: GalleryState) => state.action === GalleryAction.ITEMS_CHANGED
      )
    );
  }

  /**
   * Stream that emits when current item is changed
   */
  indexChanged(): Observable<GalleryState> {
    return this.state$.pipe(
      filter(
        (state: GalleryState) => state.action === GalleryAction.INDEX_CHANGED
      )
    );
  }
}
