import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Gallery, GalleryOrientation } from 'ng-gallery';
import { afterTimeout, TestComponent } from '../tests/common';
import { MouseSliding } from './mouse-sliding';
import { Slider } from '../slider/slider';

interface SwipeParams {
  func: 'next' | 'prev' | 'goTo';
  startIndex: number;
  expectedIndex: number;
  direction: 'left' | 'right' | 'top' | 'bottom';
}

interface PanParams {
  orientation: GalleryOrientation;
  steps: number[];
  start: number;
  up: number;
  expectedIndex: number;
}

describe('Mouse slider directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let mouseSliderElement: DebugElement;
  let mouseSliderDirective: MouseSliding;
  let sliderComponent: Slider;
  let gallery: Gallery;
  let sliderElement: HTMLElement;

  async function createComponent(): Promise<void> {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();

    gallery = fixture.componentInstance.gallery();
    mouseSliderElement = fixture.debugElement.query(By.directive(MouseSliding));
    mouseSliderDirective = mouseSliderElement.injector.get(MouseSliding);
    sliderComponent = fixture.debugElement.query(By.directive(Slider)).componentInstance;
    sliderElement = sliderComponent.nativeElement;

    await vi.waitUntil(() => gallery.hasVisibleItems());
  }

  function expectGesturesNotActivated(): void {
    sliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 500, buttons: 1 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 400, buttons: 1 }));
    // Sliding should remain false because the effect returned early
    expect(sliderComponent.status()).toBe('idle');
  }

  // --- STANDARD DESKTOP TESTS ---

  describe('Default Platform (Desktop)', () => {
    beforeEach(async () => await createComponent());
    afterEach(() => vi.clearAllMocks());

    async function swipe({ func, startIndex, expectedIndex, direction }: SwipeParams): Promise<void> {
      gallery.goTo({ index: startIndex, behavior: 'auto' });
      fixture.detectChanges();
      await vi.waitUntil(() => gallery.activeIndex() === startIndex);

      const funcSpy = vi.spyOn(gallery, func);
      const now: number = performance.now();

      // Starting in the dead center of your 400x300 viewport
      const start = { x: 200, y: 150 };
      const move = {
        x: direction === 'left' ? start.x - 100 : direction === 'right' ? start.x + 100 : start.x,
        y: direction === 'top' ? start.y - 100 : direction === 'bottom' ? start.y + 100 : start.y,
      };

      const emit = (type: string, x: number, y: number, time: number) => {
        const target = type === 'mousedown' ? sliderElement : document;
        target.dispatchEvent(new MouseEvent(type, {
          clientX: x, clientY: y,
          buttons: 1,
          bubbles: true,
          view: window,
          // @ts-expect-error - overriding timestamp for velocity math
          timeStamp: time
        }));
      };

      // 1. PRESS
      emit('mousedown', start.x, start.y, now);
      await new Promise(r => requestAnimationFrame(r));

      // 2. MOVE (The Threshold Breaker)
      // We move halfway. delta = 50px, time = 50ms. Velocity = 1.0 (Clears 0.3)
      const midX = (start.x + move.x) / 2;
      const midY = (start.y + move.y) / 2;
      emit('mousemove', midX, midY, now + 50);

      // Verify the component recognized the drag
      await vi.waitUntil(() => sliderComponent.status() === 'dragging');

      // 3. MOVE (The Final Position)
      emit('mousemove', move.x, move.y, now + 100);
      await new Promise(r => requestAnimationFrame(r));

      // 4. RELEASE
      // timeSinceLastMove will be 20ms (120 - 100), which is < 100ms limit.
      emit('mouseup', move.x, move.y, now + 120);

      // 5. ZONE SYNC
      // Because your code runs outside Angular, we need this to trigger the Spy check
      await vi.waitFor(() => {
        fixture.detectChanges();
        if (funcSpy.mock.calls.length === 0) {
          throw new Error(`Swipe ${ direction } failed to call ${ func }. Status: ${ sliderComponent.status() }`);
        }
        expect(funcSpy).toHaveBeenCalled();
      }, { timeout: 2000 });

      await vi.waitFor(() => {
        expect(sliderComponent.status()).toBe('scrolling');
      });

      await vi.waitFor(() => {
        expect(sliderComponent.status()).toBe('idle');
      });

      // 6. FINISH
      await vi.waitFor(() => {
        expect(gallery.activeIndex()).toBe(expectedIndex);
      });
    }

    it('[Horizontal] should trigger galleryRef.next() on a quick swipe left', async () => {
      // At index 0, swiping left moves to index 1 (Next)
      await swipe({ startIndex: 0, expectedIndex: 1, func: 'next', direction: 'left' });
    });

    it('[Horizontal RTL] should trigger galleryRef.prev() on a quick swipe left', async () => {
      component.dir.set('rtl');
      fixture.detectChanges();
      await swipe({ startIndex: 2, expectedIndex: 1, func: 'prev', direction: 'left' });
    });

    it('[Horizontal] should trigger galleryRef.prev() on a swipe right', async () => {
      await swipe({ startIndex: 2, expectedIndex: 1, func: 'prev', direction: 'right' });
    });

    it('[Horizontal RTL] should trigger galleryRef.next() on a swipe right', async () => {
      component.dir.set('rtl');
      fixture.detectChanges();
      await swipe({ startIndex: 0, expectedIndex: 1, func: 'next', direction: 'right' });
    });

    it('[Vertical] should trigger galleryRef.next() on a quick swipe top', async () => {
      component.orientation.set('vertical');
      await swipe({ startIndex: 0, expectedIndex: 1, func: 'next', direction: 'top' });
    });

    it('[Vertical] should trigger galleryRef.prev() on a quick swipe bottom', async () => {
      component.orientation.set('vertical');
      await swipe({ startIndex: 2, expectedIndex: 1, func: 'prev', direction: 'bottom' });
    });

    async function pan({ orientation, steps, start, up, expectedIndex }: PanParams): Promise<void> {
      const goToSpy = vi.spyOn(gallery, 'goTo');

      // Mousedown at the right edge of the viewport
      sliderElement.dispatchEvent(new MouseEvent('mousedown', {
        clientX: orientation === 'horizontal' ? start : 150,
        clientY: orientation === 'vertical' ? start : 150,
        buttons: 1
      }));

      for (const step of steps) {
        document.dispatchEvent(new MouseEvent('mousemove', {
          clientX: orientation === 'horizontal' ? step : 150,
          clientY: orientation === 'vertical' ? step : 150,
          buttons: 1
        }));
        // Allow the directive's scrollTo() to update the DOM
        await afterTimeout(100);
      }
      expect(sliderComponent.status()).toBe('dragging');

      // 3. Mouseup at the far left
      document.dispatchEvent(new MouseEvent('mouseup', {
        clientX: orientation === 'horizontal' ? up : 150,
        clientY: orientation === 'vertical' ? up : 150,
      }));
      expect(goToSpy).toHaveBeenCalledWith({ index: expectedIndex, behavior: 'smooth' });

      // Wait until IntersectionObserver detect it
      await vi.waitFor(() => {
        expect(sliderComponent.status()).toBe('scrolling');
      });

      await vi.waitFor(() => {
        expect(sliderComponent.status()).toBe('idle');
      });

      await vi.waitFor(() => {
        expect(gallery.activeIndex()).toBe(expectedIndex);
      });
    }


    it('should create [mouseSlider] directive', async () => {
      expect(mouseSliderDirective).toBeDefined();
      expect(sliderComponent.status()).toBe('idle');
    });

    it('[Horizontal] should set sliding state to true when dragged', async () => {
      // Spy on the native scrollTo method to verify execution
      const scrollSpy = vi.spyOn(sliderElement, 'scrollTo');

      // MOUSE DOWN (on the element)
      // We mock timeStamp to prepare for velocity calculations later
      const startEvent = new MouseEvent('mousedown', { clientX: 500, buttons: 1 });
      Object.defineProperty(startEvent, 'timeStamp', { value: 1000 }); // Time: 1000ms
      sliderElement.dispatchEvent(startEvent);

      // MOUSE MOVE (on the document)
      // Move 100px to the left
      const moveEvent = new MouseEvent('mousemove', { clientX: 400, buttons: 1 });
      Object.defineProperty(moveEvent, 'timeStamp', { value: 1050 }); // Time: 1050ms (50ms elapsed)
      document.dispatchEvent(moveEvent);

      expect(scrollSpy).toHaveBeenCalled();
      expect(sliderComponent.status()).toBe('dragging');
      fixture.detectChanges();
    });

    /** PAN TO CENTER (ITEM 0 TO ITEM 2) */
    it('[Horizontal] should select item 2 when panning forward by large movement and releasing', async () => {
      await pan({
        orientation: 'horizontal',
        start: 350,
        up: -400,
        steps: [300, 100, 0, -100, -400],
        expectedIndex: 2
      });
    });

    /** PAN TO CENTER (ITEM 0 TO ITEM 2) */
    it('[Vertical] should select item 2 when panning forward by large movement and releasing', async () => {
      component.orientation.set('vertical');
      fixture.detectChanges();
      await pan({
        orientation: 'vertical',
        start: 350,
        up: -400,
        steps: [300, 100, 0, -100, -400],
        expectedIndex: 2
      });
    });

    it('should allow swipe gestures ONLY if itemsPerView is 1 and itemSize is undefined', async () => {
      component.itemSize.set(300);
      fixture.detectChanges();
      await swipe({ startIndex: 1, expectedIndex: 1, func: 'goTo', direction: 'left' });
      await swipe({ startIndex: 2, expectedIndex: 2, func: 'goTo', direction: 'right' });
    });

    /** DISABLE MOUSE SCROLL */
    it('should NOT activate gestures when mouse scroll is disabled', () => {
      fixture.componentInstance.disableMouseScroll.set(true);

      fixture.detectChanges();
      expectGesturesNotActivated();
    });
  });

  // --- PLATFORM SPECIFIC TESTS ---

  describe('Mobile Platforms (Gestures Disabled)', () => {
    it('should not activate gestures when platform is Android', async () => {
      TestBed.overrideProvider(Platform, { useValue: { ANDROID: true } });
      await createComponent(); // Create after override

      expectGesturesNotActivated();
    });

    it('should not activate gestures when platform is iOS', async () => {
      TestBed.overrideProvider(Platform, { useValue: { IOS: true } });
      await createComponent();

      expectGesturesNotActivated();
    });
  });
});
