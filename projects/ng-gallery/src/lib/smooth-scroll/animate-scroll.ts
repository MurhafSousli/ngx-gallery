import { Direction } from '@angular/cdk/bidi';
import {
  SmoothScrollStep,
  BezierEasingOptions,
  SmoothScrollToOptions,
  SmoothScrollToElementOptions
} from './smooth-scroll.model';

export class SmoothScrollManager {

  private currentScrollAbortController: AbortController | null = null;
  private currentAnimation: Animation | null = null;

  constructor(private scrollable: HTMLElement, private dir: Direction, private defaultEasing: BezierEasingOptions) {
  }

  private scrollElement(el: Element, x: number, y: number): void {
    el.scrollLeft = x;
    el.scrollTop = y;
  }

  private stopCurrentScroll(): void {
    this.currentAnimation?.cancel();
    this.currentAnimation = null;

    this.currentScrollAbortController?.abort();
    this.currentScrollAbortController = null;
  }

  private getScrollAbortController(): AbortController {
    this.stopCurrentScroll();
    this.currentScrollAbortController = new AbortController();
    return this.currentScrollAbortController;
  }

  private animateScroll(el: Element, context: SmoothScrollStep, signal: AbortSignal): Promise<void> {
    let cancelled: boolean = false;

    return new Promise(resolve => {
      const { startX, startY, x, y, duration, easing } = context;

      const animation: Animation = el.animate([], {
        duration,
        easing: `cubic-bezier(${ easing.x1 }, ${ easing.y1 }, ${ easing.x2 }, ${ easing.y2 })`,
        fill: 'both'
      });

      let cleaned: boolean = false;

      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;

        signal.removeEventListener('abort', onAbort);
        if (this.currentAnimation === animation) {
          this.currentAnimation = null;
        }
        resolve();
      };

      const onAbort = () => {
        cancelled = true;
        animation.cancel();
        cleanup();
      };

      signal.addEventListener('abort', onAbort, { once: true });

      this.currentAnimation = animation;

      const dx: number = x - startX;
      const dy: number = y - startY;

      const update = () => {
        if (cancelled || animation.playState !== 'running') {
          return;
        }

        const timing: ComputedEffectTiming = animation.effect!.getComputedTiming();
        const progress: number = timing.progress ?? 0;

        el.scrollLeft = startX + dx * progress;
        el.scrollTop = startY + dy * progress;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      animation.onfinish = () => {
        if (cancelled) {
          cleanup();
          return;
        }

        this.scrollElement(el, x, y);
        cleanup();
      };

      animation.oncancel = () => {
        cleanup();
      };

      animation.play();
      requestAnimationFrame(update);
    });
  }

  scrollTo(customOptions: SmoothScrollToOptions): Promise<void> {
    const el: Element = this.scrollable;
    const isRtl: boolean = this.dir === 'rtl';

    const options: SmoothScrollToOptions = {
      ...customOptions,
      ...{
        left: customOptions.left == null ? (isRtl ? customOptions.end : customOptions.start) : customOptions.left,
        right: customOptions.right == null ? (isRtl ? customOptions.start : customOptions.end) : customOptions.right
      }
    };

    if (options.bottom != null) {
      options.top = el.scrollHeight - el.clientHeight - options.bottom;
    }

    if (isRtl) {
      if (options.left != null) {
        options.right = el.scrollWidth - el.clientWidth - options.left;
      }
      options.left = options.right ? -options.right : options.right;
    } else {
      if (options.right != null) {
        options.left = el.scrollWidth - el.clientWidth - options.right;
      }
    }

    return this.applyScroll(el, options);
  }

  scrollToElement(target: HTMLElement, customOptions: SmoothScrollToElementOptions = {}): Promise<void> {
    const isRtl: boolean = this.dir === 'rtl';

    const targetTop: number = target.offsetTop;
    const targetLeft: number = target.offsetLeft;
    const targetWidth: number = target.offsetWidth;
    const targetHeight: number = target.offsetHeight;

    // clientWidth/Height represents the visible "window" (excluding scrollbars/borders)
    const viewportWidth: number = this.scrollable.clientWidth;
    const viewportHeight: number = this.scrollable.clientHeight;

    const options: SmoothScrollToOptions = {
      ...customOptions,
      top: targetTop + (customOptions.top || 0),
      left: customOptions.left == null ? (isRtl ? customOptions.end : customOptions.start) : customOptions.left,
      right: customOptions.right == null ? (isRtl ? customOptions.start : customOptions.end) : customOptions.right
    };

    // Center alignment: (Target Position) - (Half of Viewport) + (Half of Target)
    if (customOptions.center) {
      options.left = targetLeft - (viewportWidth / 2) + (targetWidth / 2);
      options.top = targetTop - (viewportHeight / 2) + (targetHeight / 2);
      return this.applyScroll(this.scrollable, options);
    }

    // Bottom alignment: Align the bottom edge of the target with the bottom edge of the viewport
    if (options.bottom != null) {
      const bottomEdgeOffset: number = viewportHeight - targetHeight;
      options.top = targetTop - bottomEdgeOffset + (customOptions.bottom || 0);
    }

    // Horizontal Logic
    if (isRtl) {
      // Standard RTL scroll positions often start at 0 and move into negative values
      // depending on the browser engine. This calculation assumes standard offsetLeft.
      options.left = targetLeft + (options.left || 0);
      if (options.right != null) {
        options.left = (targetLeft + targetWidth) - viewportWidth + (options.right || 0);
      }
    } else {
      options.left = targetLeft + (options.left || 0);
      if (options.right != null) {
        options.left = (targetLeft + targetWidth) - viewportWidth + (options.right || 0);
      }
    }

    const computedOptions: SmoothScrollToOptions = {
      top: options.top,
      left: options.left,
      easing: options.easing,
      duration: options.duration
    };

    return this.applyScroll(this.scrollable, computedOptions);
  }

  stop(): void {
    this.stopCurrentScroll();
  }

  private applyScroll(el: Element, options: SmoothScrollToOptions): Promise<void> {
    if (!options.duration) {
      this.scrollElement(el, options.left ?? el.scrollLeft, options.top ?? el.scrollTop);
      return Promise.resolve();
    }

    const abortController: AbortController = this.getScrollAbortController();

    const context: SmoothScrollStep = {
      startX: el.scrollLeft,
      startY: el.scrollTop,
      x: options.left ?? el.scrollLeft,
      y: options.top ?? el.scrollTop,
      duration: options.duration,
      easing: options.easing ?? this.defaultEasing
    };

    return this.animateScroll(el, context, abortController.signal);
  }
}
