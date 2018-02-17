import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  OnChanges,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryItem, GalleryState } from '../models';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <gallery-core [state]="galleryRef.state$ | async"
                  [config]="galleryRef.config$ | async"
                  (indexChange)="onIndexChange($event)"></gallery-core>
    <ng-content></ng-content>
  `
})
export class GalleryComponent implements OnInit, OnChanges, OnDestroy {

  galleryRef: GalleryRef;
  @Input() id: string;
  @Input() items: GalleryItem [];
  @Input() gestures: boolean = this._gallery.config.gestures;
  @Input() panSensitivity: number = this._gallery.config.panSensitivity;
  @Input() zoomOut: number = this._gallery.config.zoomOut;
  @Input() dots: boolean = this._gallery.config.dots;
  @Input() thumb: boolean = this._gallery.config.thumb;
  @Input() nav: boolean = this._gallery.config.nav;
  @Input() counter: boolean = this._gallery.config.counter;
  @Input() thumbWidth: number = this._gallery.config.thumbWidth;
  @Input() thumbHeight: number = this._gallery.config.thumbHeight;
  @Input() disableThumb: boolean = this._gallery.config.disableThumb;
  @Input() thumbPosition: 'top' | 'left' | 'right' | 'bottom' = this._gallery.config.thumbPosition;
  @Input() slidingDirection: 'horizontal' | 'vertical' = this._gallery.config.slidingDirection;
  @Input() destroyRef = true;

  @Output() indexChange = new EventEmitter<GalleryState>();
  @Output() itemsChange = new EventEmitter<GalleryState>();

  private _itemChange$: Subscription;
  private _indexChange$: Subscription;

  constructor(private _gallery: Gallery) {
  }

  private getConfig() {
    return {
      gestures: this.gestures,
      panSensitivity: this.panSensitivity,
      zoomOut: this.zoomOut,
      counter: this.counter,
      nav: this.nav,
      dots: this.dots,
      thumb: this.thumb,
      thumbWidth: this.thumbWidth,
      thumbHeight: this.thumbHeight,
      thumbPosition: this.thumbPosition,
      disableThumb: this.disableThumb,
      slidingDirection: this.slidingDirection
    };
  }

  onIndexChange(i) {
    switch (i) {
      case 'next':
        this.galleryRef.next();
        break;
      case 'prev':
        this.galleryRef.prev();
        break;
      default:
        this.galleryRef.set(i);
    }
  }

  ngOnChanges() {
    if (this.galleryRef instanceof GalleryRef) {
      this.galleryRef.setConfig(this.getConfig());

      if (this.items !== this.galleryRef.state.items) {
        this.load(this.items);
      }
    }
  }

  ngOnInit() {
    // Get gallery instance by id
    this.galleryRef = this._gallery.ref(this.id);
    this.galleryRef.setConfig(this.getConfig());
    this.load(this.items);

    /** Subscribes to indexChange and itemsChange events when user bind them */
    if (this.indexChange.observers.length) {
      this._indexChange$ = this.galleryRef.indexChanged().subscribe((e: GalleryState) => this.indexChange.next(e));
    }
    if (this.itemsChange.observers.length) {
      this._itemChange$ = this.galleryRef.itemsChanged().subscribe((e: GalleryState) => this.itemsChange.next(e));
    }
  }

  ngOnDestroy() {
    if (this._indexChange$) {
      this._indexChange$.unsubscribe();
    }
    if (this._itemChange$) {
      this._itemChange$.unsubscribe();
    }
    if (this.destroyRef) {
      this.galleryRef.reset();
    }
  }

  load(items: GalleryItem[]) {
    this.galleryRef.load(items);
  }

  add(item: GalleryItem, active?: boolean) {
    this.galleryRef.add(item, active);
  }

  remove(i: number) {
    this.galleryRef.remove(i);
  }

  next() {
    this.galleryRef.next();
  }

  prev() {
    this.galleryRef.prev();
  }

  set(i: number) {
    this.galleryRef.set(i);
  }

  reset() {
    this.galleryRef.reset();
  }
}
