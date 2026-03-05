import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { Gallery, GalleryOrientation } from 'ng-gallery';
import { afterTimeout, TestComponent } from '../tests/common';
import { SmoothScroll } from './smooth-scroll.directive';
import { Slider } from '../slider/slider';

describe('Smooth scroll directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let sliderElement: HTMLElement;
  let smoothScrollDirective: SmoothScroll;
  let sliderComponent: Slider;
  let gallery: Gallery;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    gallery = component.gallery();

    const smoothScrollElement: DebugElement = fixture.debugElement.query(By.directive(SmoothScroll));
    smoothScrollDirective = smoothScrollElement.injector.get(SmoothScroll);

    sliderComponent = fixture.debugElement.query(By.directive(Slider)).componentInstance;
    sliderElement = sliderComponent.nativeElement;
  });

  async function testSmoothScrollTo(index: number, position: number, orientation: GalleryOrientation, dir: Direction = 'ltr'): Promise<void> {
    component.orientation.set(orientation);
    component.dir.set(dir);
    await vi.waitUntil(() => gallery.hasVisibleItems());

    // Trigger index change
    gallery.goTo({ index });
    fixture.detectChanges();
    expect(sliderComponent.status()).toBe('scrolling');

    await vi.waitFor(() => {
      expect(gallery.activeIndex()).toBe(index);
    });
    expect(sliderComponent.status()).toBe('idle');
    expect(orientation === 'horizontal' ? sliderElement.scrollLeft : sliderElement.scrollTop).toBe(position);
  }

  it('should create [smoothScroll] directive', async () => {
    expect(smoothScrollDirective).toBeDefined();
    expect(sliderComponent.status()).toBe('idle');
  });

  it('should scroll instantly to target item on gallery index changes', async () => {
    await vi.waitUntil(() => gallery.hasVisibleItems());
    // Trigger index change
    gallery.goTo({ index: 1, behavior: 'auto' });
    fixture.detectChanges();

    // Verify the scrolling signal is set to true
    expect(sliderComponent.status()).toBe('scrolling');

    await vi.waitFor(() => {
      expect(gallery.activeIndex()).toBe(1);
    });
    expect(sliderComponent.status()).toBe('idle');
    const scrollPosition: number = component.width();
    expect(sliderElement.scrollLeft).toBe(scrollPosition);
  });

  it('should scroll smoothly to target item on gallery index changes', async () => {
    await testSmoothScrollTo(1, component.width(), 'horizontal');
  });

  it('[RTL] should scroll smoothly to target item on gallery index changes', async () => {
    await testSmoothScrollTo(1, -component.width(), 'horizontal', 'rtl');
  });

  it('[Vertical] should scroll smoothly to target item on gallery index changes', async () => {
    await testSmoothScrollTo(1, component.height(), 'vertical');
  });

  it('should not set status signal to "idle" if another scroll is triggered before the first animation is done', async () => {
    await vi.waitUntil(() => gallery.hasVisibleItems());

    // Trigger index change
    gallery.goTo({ index: 1 });
    fixture.detectChanges();

    // Verify status is set to scrolling
    expect(sliderComponent.status()).toBe('scrolling');

    // Wait a bit but before the scroll animation ends
    await afterTimeout(200);
    // Trigger another scroll
    gallery.goTo({ index: 2 });
    fixture.detectChanges();

    // Verify status is still scrolling
    expect(sliderComponent.status()).toBe('scrolling');

    await vi.waitFor(() => {
      expect(gallery.activeIndex()).toBe(2);
    });
    expect(sliderComponent.status()).toBe('idle');
    const scrollPosition: number = component.width() * 2;
    expect(sliderElement.scrollLeft).toBe(scrollPosition);
  });


  it('should cancel any ongoing scroll if user interrupted the scroll with sliding', async () => {
    await vi.waitUntil(() => gallery.hasVisibleItems());

    // Trigger index change
    gallery.goTo({ index: 1 });
    fixture.detectChanges();

    expect(sliderComponent.status()).toBe('scrolling');

    // Wait a bit but before the scroll animation ends
    await afterTimeout(200);

    sliderElement.dispatchEvent(new MouseEvent('mousedown', { clientX: 500, buttons: 1 }));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 400, buttons: 1 }));

    fixture.detectChanges();
    expect(sliderComponent.status()).toBe('dragging');
  });
});
