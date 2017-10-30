import { ComponentRef, Inject, Injectable } from '@angular/core';
import { ENTER, ESCAPE, RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { BlockScrollStrategy, GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { CONFIG } from './gallery.token';
import { GalleryOverlayComponent } from '../components/gallery-overlay/gallery-overlay.component';
import { GalleryState, GalleryConfig, GalleryItem } from '../models';
import { defaultConfig } from './gallery.default';
import { mergeDeep } from '../utils/merge-deep';

@Injectable()
export class Gallery {

  /** Gallery portal for dialog usage */
  private galleryPortal = new ComponentPortal(GalleryOverlayComponent);

  /** Initial state */
  private initialState: GalleryState = {
    currIndex: 0,
    hasNext: false,
    hasPrev: false,
    play: false
  };

  /** Gallery state */
  state: GalleryState = this.initialState;
  state$ = new BehaviorSubject<GalleryState>(this.initialState);

  /** Gallery config */
  config: GalleryConfig = defaultConfig;
  config$ = new BehaviorSubject<GalleryConfig>(this.config);

  /** Gallery overlay config */
  overlayConfig: OverlayConfig;

  /** Gallery overlay ref */
  overlayRef: OverlayRef;

  constructor(@Inject(CONFIG) config: GalleryConfig, private overlay: Overlay, private viewportRuler: ViewportRuler) {

    /** Start config worker */
    this.configWorker().subscribe();

    /** Start player worker */
    this.playerWorker().subscribe();

    this.setConfig(config);
  }

  /** Load items and reset the state */
  load(items: GalleryItem[]) {

    this.setState({
      items: items,
      hasNext: items.length > 1
    });
  }

  /** Set active item
   * @param {number} i Active Index
   **/
  set(i: number) {

    this.setState({
      currIndex: i,
      hasNext: i < this.state.items.length - 1,
      hasPrev: i > 0
    });
  }

  /** Next item */
  next() {

    if (this.state.hasNext) {
      const index = this.state.currIndex + 1;
      this.set(index);
    } else {
      this.set(0);
    }
  }

  /** Prev item */
  prev() {

    if (this.state.hasPrev) {
      const index = this.state.currIndex - 1;
      this.set(index);
    } else {
      this.set(this.state.items.length - 1);
    }
  }

  /** Reset gallery to initial state */
  reset() {
    this.setState(this.initialState);
  }

  /** Set gallery state
   * @param {GalleryState} state
   **/
  setState(state: GalleryState) {
    this.state = {...this.state, ...state};
    this.state$.next(this.state);
  }


  /** Set gallery config
   * @param {GalleryConfig} config
   **/
  setConfig(config: GalleryConfig) {
    // if (config.overlay) {
    //   /** Set overlay config */
    //   if (config.overlay.positionStrategy === 'GlobalPositionStrategy') {
    //     this.config.overlay.positionStrategy = new GlobalPositionStrategy().centerHorizontally();
    //   } else {
    //     // ConnectedPositionStrategy
    //     this.config.overlay.positionStrategy = new GlobalPositionStrategy().centerHorizontally();
    //   }
    //
    //   if (config.overlay.scrollStrategy === 'BlockScrollStrategy') {
    //     this.config.overlay.scrollStrategy = new BlockScrollStrategy(this.viewportRuler);
    //   } else if (config.overlay.scrollStrategy === 'NoopScrollStrategy') {
    //     this.config.overlay.scrollStrategy = new NoopScrollStrategy();
    //   } else {
    //     /** TODO: Check if CloseScrollStrategy useful for gallery */
    //     // CloseScrollStrategy
    //     // this.config.overlay.scrollStrategy = new CloseScrollStrategy();
    //   }
    // }

    this.config = mergeDeep(this.config, config);

    /** set overlay config */
    this.overlayConfig = {
      backdropClass: this.config.overlay.backdropClass,
      panelClass: this.config.overlay.panelClass,
      hasBackdrop: this.config.overlay.hasBackdrop || true,
      positionStrategy: new GlobalPositionStrategy().centerHorizontally(),
      scrollStrategy: new BlockScrollStrategy(this.viewportRuler)
    };
  }

  /** Start slide show
   * @param {number} interval Time in ms before setting the next item
   **/
  play() {
    this.setState({
      play: true
    });
  }

  /** End slide show */
  stop() {
    this.setState({
      play: false
    });
  }

  /** Open gallery in an overlay
   * @param {number} i Image index
   **/
  open(i = 0) {
    this.set(i);
    this.overlayRef = this.overlay.create(this.overlayConfig);
    const compRef: ComponentRef<GalleryOverlayComponent> = this.overlayRef.attach(this.galleryPortal);

    /** Close overlay on backdropClick */
    this.overlayRef.backdropClick().subscribe(() => this.close());

    /** Activate keyboard listener */
    compRef.instance.keyDown.subscribe((ev) => this.handleKeydown(ev));
  }

  /** Close gallery overlay */
  close() {
    /** Stop player if started */
    this.stop();
    /** If overlay is already opened */
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
  }

  /** Handles global key presses while gallery overlay is opened
   * @param {KeyboardEvent} event
   **/
  handleKeydown(event: KeyboardEvent) {
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

  /** Start player according to the state */
  playerWorker() {
    return this.state$.filter(state => state.play)
      .switchMap(() => Observable.interval(this.config.player.interval)
        .takeWhile(() => this.state.play)
        .do(() => this.next()));
  }

  /** Set config async */
  configWorker() {
    return this.config$.do((config: GalleryConfig) => this.setConfig(config));
  }
}
