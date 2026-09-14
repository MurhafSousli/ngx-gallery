import { Directive, inject, effect, untracked, afterRenderEffect, ElementRef } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { GalleryRef } from '../gallery-ref';
import { SmoothScrollManager } from './animate-scroll';
import { NavigationTarget } from '../models/slider.model';
import { SliderContext } from '../slider/slider.token';
import { ResizeSensorContext } from '../resize-sensor/resize-sensor.token';

@Directive({
  selector: '[smoothScroll]'
})
export class SmoothScroll {

  private readonly dir: Directionality = inject(Directionality);

  private readonly galleryRef: GalleryRef = inject(GalleryRef);

  private readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  private readonly slider: SliderContext = inject(SliderContext, { self: true });

  private readonly resizeSensor: ResizeSensorContext = inject(ResizeSensorContext, { self: true });

  private scrollTaskCount: number = 0;

  private activeManager: SmoothScrollManager;

  constructor() {
    // The normal effect doesn't work with the initial index, because it runs before the right conditions are met
    afterRenderEffect({
      read: () => {
        const state: NavigationTarget = this.galleryRef.navigationState();
        if (state.source !== 'init' || !this.resizeSensor.isScrollable()) return;
        this.scrollToIndex(state.index, { duration: 0 });
      }
    });

    /**
     *  Do NOT use afterNextRender here.
     *  It introduces a render frame where neither mouseSliding nor smoothScrolling
     *  is true, re-enabling scroll-snap and causing jumpy navigation.
     *  `effect()` must run before render to keep snap disabled.
     */
    effect(() => {
      const state: NavigationTarget = this.galleryRef.navigationState();
      // Only start scrolling if the viewport is scrollable, this ensures scrolling to the initial index
      if (state.source === 'init'
        // Avoid navigation source that sync from touch navigation
        || state.source === 'sync'
        || !this.resizeSensor.isScrollable()) return;

      const scrollBehavior: ScrollBehavior = state.behavior || this.galleryRef.scrollBehavior();

      untracked(() => {
        if (scrollBehavior === 'auto') {
          this.scrollToIndex(state.index, { duration: 0 });
          return;
        }

        this.scrollToIndex(state.index, {
          duration: this.galleryRef.scrollDuration()
        });
      });
    });
  }

  async scrollToIndex(index: number, options: { duration: number }): Promise<void> {
    const el: HTMLElement = this.galleryRef.renderedItems()[index]?.nativeElement;
    if (!el) return;

    // Cancel any existing scroll immediately
    this.stop();

    // Increment task ID to track the most recent request
    const taskId: number = ++this.scrollTaskCount;
    this.slider.scrolling.set(true);

    this.activeManager = new SmoothScrollManager(
      this.nativeElement,
      this.dir.valueSignal(),
      this.galleryRef.scrollEase()
    );

    try {
      const snapAlign = this.galleryRef.snapAlign();
      await this.activeManager.scrollToElement(el, {
        duration: options.duration,
        start: snapAlign === 'start' ? 0 : undefined,
        end: snapAlign === 'end' ? 0 : undefined,
        center: snapAlign === 'center'
      });
    } finally {
      // Only set idle if no other scroll task has started since
      if (taskId === this.scrollTaskCount) {
        this.slider.scrolling.set(false);
        this.activeManager = null;
      }
    }
  }

  stop(): void {
    if (this.activeManager) {
      this.activeManager.stop();
      this.activeManager = null;
    }
  }
}
