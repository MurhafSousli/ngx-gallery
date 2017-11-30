import { ComponentRef, Inject, Injectable } from '@angular/core';
import { ENTER, ESCAPE, RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from './gallery.token';
import { GalleryState, GalleryAction, GalleryItem, GalleryConfig } from '../models';
import { GalleryLightboxComponent } from '../components/gallery-lightbox/gallery-lightbox.component';
import { defaultConfig } from './gallery.default';
import { mergeDeep } from '../utils/merge-deep';
import { filter } from 'rxjs/operators';

@Injectable()
export class Gallery {

  /** Initial state */
  private _initialState: GalleryState = {
    action: GalleryAction.INIT,
    currIndex: 0,
    hasNext: false,
    hasPrev: false,
    play: false,
    loading: false
  };

  /** Gallery overlay ref */
  private _overlayRef: OverlayRef;
  /** Gallery overlay config */
  private _overlayConfig: OverlayConfig;

  /** Gallery state */
  state: GalleryState = this._initialState;
  state$ = new BehaviorSubject<GalleryState>(this._initialState);

  /** Gallery config */
  config: GalleryConfig = defaultConfig;
  config$ = new BehaviorSubject<GalleryConfig>(this.config);


  constructor(@Inject(CONFIG) config: GalleryConfig, public overlay: Overlay) {

    /** Set config */
    setTimeout(() => this.setConfig(config));
  }

  /** Handles global key presses while the lightbox is opened
   * @param {KeyboardEvent} event
   */
  private handleKeydown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case LEFT_ARROW:
        this.prev();
        break;
      case RIGHT_ARROW:
      case ENTER:
        this.next();
        break;
      case ESCAPE:
        this.close();
        break;
      default:
        return;
    }
  }

  /**
   * Set gallery state
   * @param {GalleryState} state
   */
  setState(state: GalleryState) {
    this.state = {...this.state, ...state};
    this.state$.next(this.state);
  }

  /**
   * Set gallery config
   * @param {GalleryConfig} config
   */
  setConfig(config: GalleryConfig) {
    this.config = mergeDeep(defaultConfig, config);
    this.config$.next(this.config);

    /** set overlay config */
    this._overlayConfig = {
      backdropClass: this.config.lightbox.backdropClass,
      panelClass: this.config.lightbox.panelClass,
      hasBackdrop: this.config.lightbox.hasBackdrop,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    };
  }


  /**
   * Load items and reset the state
   * @param {GalleryItem[]} items - Gallery images data
   */
  load(items: GalleryItem[]) {

    this.setState({
      action: GalleryAction.LOAD,
      items: items,
      hasNext: items.length > 1
    });
  }

  /**
   * Set active item
   * @param {number} i - Active Index
   * @param {GalleryAction} action - Action type
   */
  set(i: number, action?: GalleryAction) {

    this.setState({
      action: action || GalleryAction.OTHER,
      currIndex: i,
      hasNext: i < this.state.items.length - 1,
      hasPrev: i > 0,
      loading: true
    });
  }

  /**
   * Next item
   */
  next() {
    this.set((this.state.hasNext) ? (this.state.currIndex + 1) : 0, GalleryAction.NEXT);
  }

  /**
   * Prev item
   */
  prev() {
    this.set((this.state.hasPrev) ? (this.state.currIndex - 1) : (this.state.items.length - 1), GalleryAction.PREV);
  }

  /**
   * Reset gallery to initial state
   */
  reset() {
    this.setState(this._initialState);
  }

  /**
   * Start slide show
   */
  play() {
    this.setState({
      action: GalleryAction.PLAYING,
      play: true
    });
  }

  /**
   * End slide show
   */
  stop() {
    this.setState({
      action: GalleryAction.STOPPED,
      play: false
    });
  }

  /**
   * Open gallery lightbox
   * @param {number} i - Image index
   */
  open(i = 0) {
    this.set(i, GalleryAction.OPENED);
    this._overlayRef = this.overlay.create(this._overlayConfig);

    /** Attach gallery to the overlay */
    const galleryPortal = new ComponentPortal(GalleryLightboxComponent);
    const compRef: ComponentRef<GalleryLightboxComponent> = this._overlayRef.attach(galleryPortal);

    /** Close overlay on backdropClick */
    this._overlayRef.backdropClick().subscribe(() => this.close());

    /** Activate keyboard listener */
    compRef.instance.keyDown.subscribe((ev) => this.handleKeydown(ev));
  }

  /**
   * Close gallery lightbox
   */
  close() {
    this.setState({
      action: GalleryAction.CLOSED,
      play: false
    });

    /** If overlay is already opened */
    if (this._overlayRef.hasAttached()) {
      this._overlayRef.dispose();
    }
  }

  /** Gallery Events */

  /**
   * Emits when gallery is initialized/reset
   * @returns {Observable<GalleryState>}
   */
  initialized() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.INIT));
  }

  /**
   * Emits when images is loaded into the gallery
   * @returns {Observable<GalleryState>}
   */
  loaded() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.LOAD));
  }

  /**
   * Emits when image is changed
   * @returns {Observable<GalleryState>}
   */
  imageChanged() {
    return this.state$.pipe(filter((state: GalleryState) =>
      state.action === (GalleryAction.NEXT || GalleryAction.PREV || GalleryAction.THUMB_CLICK || GalleryAction.BULLET_CLICK)
    ));
  }

  /**
   * Emits when image lazy loading is started/completed
   * @returns {Observable<GalleryState>}
   */
  imageLoading() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === (GalleryAction.LOADING_START || GalleryAction.LOADING_END)));
  }

  /**
   * Emits when navigation is clicked
   * @returns {Observable<GalleryState>}
   */
  navigationClick() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === (GalleryAction.NEXT || GalleryAction.PREV)));
  }

  /**
   * Emits when thumbnail is clicked
   * @returns {Observable<GalleryState>}
   */
  thumbnailClick() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.THUMB_CLICK));
  }

  /**
   * Emits when bullet is clicked
   * @returns {Observable<GalleryState>}
   */
  bulletClick() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.BULLET_CLICK));
  }

  /**
   * Emits when lightbox is opened
   * @returns {Observable<GalleryState>}
   */
  opened() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.OPENED));
  }

  /**
   * Emits when lightbox is closed
   * @returns {Observable<GalleryState>}
   */
  closed() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.CLOSED));
  }

  /**
   * Emits when slide show is started
   * @returns {Observable<GalleryState>}
   */
  playing() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.PLAYING));
  }

  /**
   * Emits when slide show is stopped
   * @returns {Observable<GalleryState>}
   */
  stopped() {
    return this.state$.pipe(filter((state: GalleryState) => state.action === GalleryAction.STOPPED));
  }

}
