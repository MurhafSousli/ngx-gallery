import { BehaviorSubject, Subject, Observable, filter } from 'rxjs';
import { defaultState } from '../utils/gallery.default';
import { GalleryError, GalleryItem, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { GalleryAction } from '../models/constants';
import {
  IframeItem,
  IframeItemData,
  ImageItem,
  ImageItemData,
  VideoItem,
  VideoItemData,
  VimeoItem,
  VimeoItemData,
  YoutubeItem,
  YoutubeItemData
} from '../components/templates/items.model';

const filterActions = (actions: string[]) => {
  return filter((state: GalleryState) => actions.indexOf(state.action) > -1);
};

export class GalleryRef {

  /** Stream that emits gallery state */
  private readonly _state: BehaviorSubject<GalleryState>;

  /** Stream that emits gallery config */
  private readonly _config: BehaviorSubject<GalleryConfig>;

  /** Stream that emits on item click */
  readonly itemClick: Subject<number> = new Subject<number>();

  /** Stream that emits on thumbnail click */
  readonly thumbClick: Subject<number> = new Subject<number>();

  /** Stream that emits on an error occurs */
  readonly error: Subject<GalleryError> = new Subject<GalleryError>();

  /** Gallery Events */

  /** Stream that emits gallery state */
  readonly state: Observable<GalleryState>;

  /** Stream that emits gallery config */
  readonly config: Observable<GalleryConfig>;

  get stateSnapshot(): GalleryState {
    return this._state.value;
  }

  get configSnapshot(): GalleryConfig {
    return this._config.value;
  }

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

  constructor(config: GalleryConfig, private deleteInstance: () => void) {
    this._state = new BehaviorSubject<GalleryState>(defaultState);
    this._config = new BehaviorSubject<GalleryConfig>(config);
    this.state = this._state.asObservable();
    this.config = this._config.asObservable();
  }

  /**
   * Set gallery state
   */
  private setState(state: GalleryState): void {
    this._state.next({ ...this.stateSnapshot, ...state });
  }

  /**
   * Set gallery config
   */
  setConfig(config: GalleryConfig): void {
    this._config.next({ ...this._config.value, ...config });
  }

  /**
   * Add gallery item
   */
  add(item: GalleryItem, active?: boolean): void {
    const items: GalleryItem[] = [...this.stateSnapshot.items, item];
    this.setState({
      action: GalleryAction.ITEMS_CHANGED,
      items,
      hasNext: items.length > 1,
      currIndex: active ? items.length - 1 : this.stateSnapshot.currIndex
    });
  }

  /**
   * Add image item
   */
  addImage(data: ImageItemData, active?: boolean): void {
    this.add(new ImageItem(data), active);
  }

  /**
   * Add video item
   */
  addVideo(data: VideoItemData, active?: boolean): void {
    this.add(new VideoItem(data), active);
  }

  /**
   * Add iframe item
   */
  addIframe(data: IframeItemData, active?: boolean): void {
    this.add(new IframeItem(data), active);
  }

  /**
   * Add Youtube item
   */
  addYoutube(data: YoutubeItemData, active?: boolean): void {
    this.add(new YoutubeItem(data), active);
  }

  /**
   * Add Vimeo item
   */
  addVimeo(data: VimeoItemData, active?: boolean): void {
    this.add(new VimeoItem(data), active);
  }

  /**
   * Remove gallery item
   */
  remove(i: number): void {
    const state: GalleryState = this.stateSnapshot;
    const items: GalleryItem[] = [
      ...state.items.slice(0, i),
      ...state.items.slice(i + 1, state.items.length)
    ];
    this.setState({
      action: GalleryAction.ITEMS_CHANGED,
      currIndex: i < 1 ? state.currIndex : i - 1,
      items,
      hasNext: items.length > 1,
      hasPrev: i > 0
    });
  }

  /**
   * Load items and reset the state
   */
  load(items: GalleryItem[]): void {
    if (items) {
      this.setState({
        action: GalleryAction.ITEMS_CHANGED,
        items,
        hasNext: items.length > 1,
        hasPrev: false
      });
    }
  }

  /**
   * Set active item
   */
  set(i: number, behavior: ScrollBehavior = this._config.value.scrollBehavior): void {
    if (i < 0 || i >= this.stateSnapshot.items.length) {
      console.error(`[NgGallery]: Unable to set the active item because the given index (${ i }) is outside the items range!`);
      return;
    }
    if (i !== this.stateSnapshot.currIndex) {
      this.setState({
        behavior,
        action: GalleryAction.INDEX_CHANGED,
        currIndex: i,
        hasNext: i < this.stateSnapshot.items.length - 1,
        hasPrev: i > 0
      });
    }
  }

  /**
   * Next item
   */
  next(behavior: ScrollBehavior = this._config.value.scrollBehavior, loop: boolean = true): void {
    if (this.stateSnapshot.hasNext) {
      this.set(this.stateSnapshot.currIndex + 1, behavior);
    } else if (loop && this._config.value.loop) {
      this.set(0, behavior);
    }
  }

  /**
   * Prev item
   */
  prev(behavior: ScrollBehavior = this._config.value.scrollBehavior, loop: boolean = true): void {
    if (this.stateSnapshot.hasPrev) {
      this.set(this.stateSnapshot.currIndex - 1, behavior);
    } else if (loop && this._config.value.loop) {
      this.set(this.stateSnapshot.items.length - 1, behavior);
    }
  }

  /**
   * Start gallery player
   */
  play(interval?: number): void {
    if (interval) {
      this.setConfig({ autoplayInterval: interval });
    }
    this.setState({ action: GalleryAction.PLAY, behavior: 'auto', isPlaying: true });
  }

  /**
   * Stop gallery player
   */
  stop(): void {
    this.setState({ action: GalleryAction.STOP, isPlaying: false });
  }

  /**
   * Reset gallery to initial state
   */
  reset(): void {
    this.setState(defaultState);
  }

  /**
   * Destroy gallery
   */
  destroy(): void {
    this._state.complete();
    this._config.complete();
    this.itemClick.complete();
    this.thumbClick.complete();
    this.deleteInstance();
  }

}
