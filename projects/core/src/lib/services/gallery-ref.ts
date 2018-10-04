import { BehaviorSubject, Subject, Observable, of, EMPTY} from 'rxjs';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { defaultConfig, defaultState } from '../utils/gallery.default';
import { GalleryAction, GalleryConfig, GalleryError, GalleryItem, GalleryState } from '../models';
import { IframeItem, ImageItem, VideoItem, YoutubeItem } from '../components/templates';

const filterActions = (actions: string[]) => {
  return filter((state: GalleryState) => actions.indexOf(state.action) > -1);
};

export class GalleryRef {

  /** Stream that emits gallery state */
  private readonly _state: BehaviorSubject<GalleryState>;

  /** Stream that emits gallery config */
  private readonly _config: BehaviorSubject<GalleryConfig>;

  /** Stream that emits on item click */
  readonly itemClick = new Subject<number>();

  /** Stream that emits on thumbnail click */
  readonly thumbClick = new Subject<number>();

  /** Stream that emits on an error occurs */
  readonly error = new Subject<GalleryError>();

  /** Gallery Events */

  /** Stream that emits gallery state */
  readonly state: Observable<GalleryState>;

  /** Stream that emits gallery config */
  readonly config: Observable<GalleryConfig>;

  /** Stream that emits when gallery is initialized/reset */
  get initialized(): Observable<GalleryState> {
    return this.state.pipe(filterActions([GalleryAction.INITIALIZED]));
  }

  /** Stream that emits when items is changed (items loaded, item added, item removed) */
  get itemsChanged(): Observable<GalleryState> {
    return this.state.pipe(filterActions([GalleryAction.ITEMS_CHANGED]));
  }

  /** Stream that emits when current item is changed */
  get indexChanged(): Observable<GalleryState> {
    return this.state.pipe(filterActions([GalleryAction.INDEX_CHANGED]));
  }

  /** Stream that emits when the player should start or stop */
  get playingChanged(): Observable<GalleryState> {
    return this.state.pipe(filterActions([GalleryAction.PLAY, GalleryAction.STOP]));
  }

  /** Stream that emits when the player should start or stop */
  private get playerActions(): Observable<GalleryState> {
    return this.state.pipe(filterActions([GalleryAction.PLAY, GalleryAction.STOP, GalleryAction.INDEX_CHANGED]));
  }

  constructor(config: GalleryConfig = defaultConfig, private deleteInstance: Function) {
    this._state = new BehaviorSubject<GalleryState>(defaultState);
    this._config = new BehaviorSubject<GalleryConfig>(defaultConfig);
    this.state = this._state.asObservable();
    this.config = this._config.asObservable();
    this.setConfig(config);
  }

  /**
   * Activate player actions listener
   */
  activatePlayer(): Observable<GalleryState> {
    return this.playerActions.pipe(
      switchMap((e: GalleryState) =>
        e.isPlaying ? of({}).pipe(
          delay(this._config.value.playerInterval),
          tap(() => this.next())
        ) : EMPTY
      )
    );
  }

  /**
   * Set gallery state
   * @param state
   */
  private setState(state: GalleryState) {
    this._state.next({...this._state.value, ...state});
  }

  /**
   * Set gallery config
   * @param config
   */
  setConfig(config: GalleryConfig) {
    this._config.next({...this._config.value, ...config});
  }

  /** Add gallery item
   * @param item - Gallery item object
   * @param active - Set the new item as current slide
   */
  add(item: GalleryItem, active?: boolean) {

    const items = [...this._state.value.items, item];
    this.setState({
      action: GalleryAction.ITEMS_CHANGED,
      items: items,
      hasNext: items.length > 1,
      currIndex: active ? items.length - 1 : this._state.value.currIndex
    });
  }

  /**
   * Add image item
   * @param data
   * @param active
   */
  addImage(data: any, active?: boolean) {
    this.add(new ImageItem(data), active);
  }

  /**
   * Add video item
   * @param data
   * @param active
   */
  addVideo(data: any, active?: boolean) {
    this.add(new VideoItem(data), active);
  }

  /**
   * Add iframe item
   * @param data
   * @param active
   */
  addIframe(data: any, active?: boolean) {
    this.add(new IframeItem(data), active);
  }

  /**
   * Add youtube item
   * @param data
   * @param active
   */
  addYoutube(data: any, active?: boolean) {
    this.add(new YoutubeItem(data), active);
  }

  /** Remove gallery item
   * @param i - Item index
   */
  remove(i: number) {
    const items = [
      ...this._state.value.items.slice(0, i),
      ...this._state.value.items.slice(i + 1, this._state.value.items.length)
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
   */
  set(i: number) {
    if (i !== this._state.value.currIndex) {
      this.setState({
        action: GalleryAction.INDEX_CHANGED,
        currIndex: i,
        hasNext: i < this._state.value.items.length - 1,
        hasPrev: i > 0
      });
    }
  }

  /**
   * Next item
   */
  next() {
    if (this._state.value.hasNext) {
      this.set(this._state.value.currIndex + 1);
    } else if (this._config.value.loop) {
      this.set(0);
    }
  }

  /**
   * Prev item
   */
  prev() {
    if (this._state.value.hasPrev) {
      this.set(this._state.value.currIndex - 1);
    } else if (this._config.value.loop) {
      this.set(this._state.value.items.length - 1);
    }
  }

  /**
   * Start gallery player
   * @param interval
   */
  play(interval?: number) {
    if (interval) {
      this.setConfig({playerInterval: interval});
    }
    this.setState({action: GalleryAction.PLAY, isPlaying: true});
  }

  /**
   * Stop gallery player
   */
  stop() {
    this.setState({action: GalleryAction.STOP, isPlaying: false});
  }

  /**
   * Reset gallery to initial state
   */
  reset() {
    this.setState(defaultState);
  }

  /**
   * Destroy gallery
   */
  destroy() {
    this._state.complete();
    this._config.complete();
    this.itemClick.complete();
    this.thumbClick.complete();
    this.deleteInstance();
  }

}
