import { Component, DebugElement, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { userEvent } from '@vitest/browser/context';
import { GalleryAutoplay, Gallery, GalleryItemData, GalleryModule } from 'ng-gallery';
import { img1, img2, img3 } from '../tests/test-images';
import { afterTimeout } from '../tests/common';

@Component({
  imports: [GalleryModule],
  template: `
    <gallery [autoplay]="autoplay()" [autoplayInterval]="autoplayInterval()" [autoplayScrollBehavior]="autoplayBehavior()"
             [items]="items" [style.width.px]="width()" [style.height.px]="height()">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItemData[] = [
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ];
  width: WritableSignal<number> = signal(400);
  height: WritableSignal<number> = signal(300);
  autoplay: WritableSignal<boolean> = signal(true);
  autoplayInterval: WritableSignal<number> = signal(300);
  autoplayBehavior: WritableSignal<ScrollBehavior> = signal('smooth');
  mode: WritableSignal<'spinner' | 'progressbar'> = signal('spinner');

  gallery: Signal<Gallery> = viewChild(Gallery);
}


describe('Autoplay Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let autoplayDirective: GalleryAutoplay;
  let autoplayDirectiveElement: DebugElement;
  let gallery: Gallery;

  let element: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    gallery = component.gallery();

    element = fixture.debugElement.query(By.directive(GalleryAutoplay)).nativeElement;
    autoplayDirectiveElement = fixture.debugElement.query(By.directive(GalleryAutoplay));
    autoplayDirective = autoplayDirectiveElement.injector.get(GalleryAutoplay);

    // Wait for the gallery to be ready so the effect starts the animation
    const img = fixture.componentInstance.gallery().activeItem();
    await vi.waitUntil(() => img.state() === 'ready');
  });

  /**
   * Helper to get the current animation instance from the element
   */
  function getAutoplayAnimation(): Animation {
    return element.getAnimations().find(anim =>
      !(anim instanceof CSSAnimation) // Exclude transitions/CSS animations
    );
  }

  it('should create autoplay directive', () => {
    expect(autoplayDirective).toBeTruthy();
  });

  it('should navigate to next slide automatically when enabled', async () => {
    const nextSpy = vi.spyOn(gallery, 'next');
    await vi.waitFor(() => {
      expect(nextSpy).toHaveBeenCalled();
    });
  });

  it('should stop the timer and animation when disabled', async () => {
    const nextSpy = vi.spyOn(gallery, 'next');

    // 1. Initial State: Autoplay is ON
    await vi.waitFor(() => {
      expect(nextSpy).toHaveBeenCalled();
    });
    nextSpy.mockClear(); // Reset spy for the next phase

    // 2. Action: Disable Autoplay
    component.autoplay.set(false);
    fixture.detectChanges();

    const anim = getAutoplayAnimation();
    expect(anim).toBeUndefined();

    // 4. Final check: Ensure the 'next' function isn't called again
    await afterTimeout(autoplayDirective.autoplayInterval() + 100);
    expect(nextSpy).not.toHaveBeenCalled();
  });

  it('should pause animation when mouse enters and resume when it leaves', async () => {
    // 1. Hover the element
    await userEvent.hover(element);

    // 2. Poll for the status, capturing the *current* animation state on every tick
    await vi.waitFor(() => {
      const anim = getAutoplayAnimation();
      expect(anim).toBeTruthy();
      expect(anim!.playState).toBe('paused');
    });

    // 3. Leave the element
    await userEvent.unhover(element);

    // 4. Poll for resumption
    await vi.waitFor(() => {
      const anim = getAutoplayAnimation();
      expect(anim).toBeTruthy();
      expect(anim!.playState).toBe('running');
    });
  });

  it('should pause on pointerdown and resume on pointerup', async () => {
    // 1. Simulate Pointer Down
    element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));

    // Use async waitFor to let the animation engine catch up with the paused status
    await vi.waitFor(() => {
      const anim = getAutoplayAnimation();
      expect(anim?.playState).toBe('paused');
    });

    // 2. Simulate Pointer Up
    element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    await vi.waitFor(() => {
      const anim = getAutoplayAnimation();
      expect(anim?.playState).toBe('running');
    });
  });

  it('should handle complex interaction: hover then click', async () => {
    const anim: Animation = getAutoplayAnimation();

    // 1. Hover
    await userEvent.hover(element);
    await vi.waitFor(() => expect(anim?.playState).toBe('paused'));

    // 2. Pointer Down (using native dispatch as userEvent might not have a "hold" for pointer)
    element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));

    // 3. Unhover while holding
    await userEvent.unhover(element);

    // Should STILL be paused because pointer is down
    expect(anim?.playState).toBe('paused');

    // 4. Release
    element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    // Should finally resume
    await vi.waitFor(() => expect(anim?.playState).toBe('running'));
  });

  it('should visually freeze the progress variable during pause', async () => {
    // 1. Set the long interval
    component.autoplayInterval.set(2000);

    const getProgress = () => {
      const value = getComputedStyle(element).getPropertyValue('--g-autoplay-progress').trim();
      return parseFloat(value) || 0;
    };

    // 2. Wait for a FRESH animation to start (must be > 0 and < 0.3)
    // This ensures we aren't looking at a '1' from a previous test
    await vi.waitFor(() => {
      const p = getProgress();
      if (p >= 0.5) throw new Error('Waiting for old animation to clear...');
      return p > 0.01;
    }, { timeout: 4000 });

    // 3. Pause
    element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));

    const anim: Animation = getAutoplayAnimation();
    await vi.waitFor(() => expect(anim?.playState).toBe('paused'));

    const progressAtPause = getProgress();

    // 4. Verify it stays frozen
    await afterTimeout(150);
    expect(getProgress()).toBe(progressAtPause);

    // 5. Resume
    element.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));

    // 6. Wait for the browser to render at least two more frames
    // We use a slightly longer timeout and a more relaxed check
    await vi.waitFor(() => {
      const current = getProgress();
      // In a 2000ms animation, we need to wait long enough for
      // the change to be detectable via getComputedStyle
      if (current <= progressAtPause) {
        throw new Error(`Still stuck at ${ current }. Animation state: ${ anim?.playState }`);
      }
      return true;
    }, { timeout: 2000, interval: 50 });

    expect(getProgress()).toBeGreaterThan(progressAtPause);
  });

  it('should clean up animation and listeners on destroy', () => {
    const anim: Animation = getAutoplayAnimation();
    const cancelSpy = vi.spyOn(anim!, 'cancel');

    fixture.destroy();

    expect(cancelSpy).toHaveBeenCalled();
  });
});
