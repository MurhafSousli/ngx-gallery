import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { defaultConfig, defaultState } from '../utils/gallery.default';
import { GalleryState, GalleryConfig, GalleryAction, GalleryItem } from '../models';
import { ImageItem, VideoItem, IframeItem, YoutubeItem } from '../components/templates';

export class GalleryRef {

  /** Stream that emits gallery state */
  private readonly _state$: BehaviorSubject<GalleryState>;

  /** Stream that emits gallery config */
  private readonly _config$: BehaviorSubject<GalleryConfig>;

  /** Stream that emits item click */
  readonly itemClick = new Subject<number>();

  /** Stream that emits thumbnail click */
  readonly thumbClick = new Subject<number>();

  /** Gallery Events */

  /** Stream that emits gallery state */
  get state$(): Observable<GalleryState> {
    return this._state$.asObservable();
  }

  /** Stream that emits gallery config */
  get config$(): Observable<GalleryConfig> {
    return this._config$.asObservable();
  }

  /** Stream that emits when gallery is initialized/reset */
  get initialized(): Observable<GalleryState> {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.INITIALIZED));
  }

  /** Stream that emits when items is changed (items loaded, item added, item removed) */
  get itemsChanged(): Observable<GalleryState> {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.ITEMS_CHANGED));
  }

  /** Stream that emits when current item is changed */
  get indexChanged(): Observable<GalleryState> {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.INDEX_CHANGED));
  }

  constructor(public config: GalleryConfig = defaultConfig, public state: GalleryState = defaultState) {
    this._state$ = new BehaviorSubject<GalleryState>(state);
    this._config$ = new BehaviorSubject<GalleryConfig>(defaultConfig);
    this.setConfig(config);
  }

  /**
   * Set gallery state
   * @param state
   */
  private setState(state: GalleryState) {
    this.state = {...this.state, ...state};
    this._state$.next(this.state);
  }

  /**
   * Set gallery config
   * @param config
   */
  setConfig(config: GalleryConfig) {
    this.config = {...defaultConfig, ...this.config, ...config};
    this._config$.next(this.config);
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

  addImage(data: any, active?: boolean) {
    this.add(new ImageItem(data), active);
  }

  addVideo(data: any, active?: boolean) {
    this.add(new VideoItem(data), active);
  }

  addIframe(data: any, active?: boolean) {
    this.add(new IframeItem(data), active);
  }

  addYoutube(data: any, active?: boolean) {
    this.add(new YoutubeItem(data), active);
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
    this._state$.complete();
    this._config$.complete();
    this.itemClick.complete();
    this.thumbClick.complete();
  }

}
