import { computed, effect, inject, Injectable, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { Subject } from 'rxjs';
import { GalleryError, GalleryItem } from '../models/gallery.model';
import { GALLERY_CONFIG, GalleryConfig } from '../models/config.model';
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

@Injectable()
export class GalleryRef implements OnDestroy {

  /** Stream that emits on item click */
  readonly itemClick: Subject<number> = new Subject<number>();

  /** Stream that emits on thumbnail click */
  readonly thumbClick: Subject<number> = new Subject<number>();

  /** Stream that emits when items is changed (items loaded, item added, item removed) */
  readonly itemsChanged: Subject<void> = new Subject<void>();

  /** Stream that emits when current index is changed */
  readonly indexChanged: Subject<void> = new Subject<void>();

  /** Stream that emits on an error occurs */
  readonly error: Subject<GalleryError> = new Subject<GalleryError>();

  /** Stream that emits when the player should start or stop */
  readonly playingChanged: Subject<void> = new Subject<void>();

  /** Gallery Events */

  readonly items: WritableSignal<GalleryItem[]> = signal([]);

  readonly currIndex: WritableSignal<number> = signal(0);

  readonly isPlaying: WritableSignal<boolean> = signal(false);

  readonly scrollBehavior: WritableSignal<ScrollBehavior> = signal(null);

  readonly action: WritableSignal<GalleryAction> = signal(null);

  readonly hasNext: Signal<boolean> = computed(() => this.currIndex() < this.items().length);

  readonly hasPrev: Signal<boolean> = computed(() => this.currIndex() > 0);

  /** Config signal */
  readonly config: WritableSignal<GalleryConfig> = signal(inject(GALLERY_CONFIG));

  setConfig(newConfig: GalleryConfig): void {
    this.config.update((config: GalleryConfig) => {
      return { ...config, ...newConfig };
    });
  }

  /**
   * Add gallery item
   */
  add(newItem: GalleryItem, active?: boolean): void {
    this.items.update((items: GalleryItem[]) => {
      return [...items, newItem];
    });
    if (active) {
      this.currIndex.set(this.items().length - 1);
    }
    this.itemsChanged.next();
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
    this.items.update((items: GalleryItem[]) => {
      return [
        ...items.slice(0, i),
        ...items.slice(i + 1, items.length)
      ];
    });
    this.currIndex.update((currIndex: number): number => i < 1 ? currIndex : i - 1);
    this.itemsChanged.next();
  }

  /**
   * Load items and reset the state
   */
  load(items: GalleryItem[]): void {
    if (items) {
      this.items.set(items);
      this.itemsChanged.next();
    }
  }

  /**
   * Set active item
   */
  set(i: number, behavior?: ScrollBehavior): void {
    if (i < 0 || i >= this.items().length) {
      console.error(`[NgGallery]: Unable to set the active item because the given index (${ i }) is outside the items range!`);
      return;
    }
    this.currIndex.set(i);
    if (behavior) {
      this.scrollBehavior.set(behavior);
    }
    this.indexChanged.next();
  }

  /**
   * Next item
   */
  next(behavior?: ScrollBehavior, loop: boolean = true): void {
    if (this.hasNext()) {
      this.set(this.currIndex() + 1, behavior);
    } else if (loop && this.config().loop) {
      this.set(0, behavior);
    }
  }

  /**
   * Prev item
   */
  prev(behavior?: ScrollBehavior, loop: boolean = true): void {
    if (this.hasPrev()) {
      this.set(this.currIndex() - 1, behavior);
    } else if (loop && this.config().loop) {
      this.set(this.items().length - 1, behavior);
    }
  }

  /**
   * Start gallery player
   */
  play(interval?: number): void {
    if (interval) {
      this.config.update((config: GalleryConfig) => {
        return { ...config, autoplayInterval: interval };
      });
    }
    this.isPlaying.set(true);
  }

  /**
   * Stop gallery player
   */
  stop(): void {
    this.isPlaying.set(false);
  }

  /**
   * Reset gallery to initial state
   */
  reset(): void {
    this.items.set([]);
  }

  /**
   * Destroy gallery
   */
  ngOnDestroy(): void {
    this.itemClick.complete();
    this.thumbClick.complete();
  }

}
