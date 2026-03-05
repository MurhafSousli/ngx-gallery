import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Gallery } from 'ng-gallery';
import { TestComponent } from './tests/common';
import { Slider } from './slider/slider';
import { ResizeSensor } from './resize-sensor/resize-sensor';
import { IntersectionSensor } from './observers/intersection-sensor';

describe('Resize sensor directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let resizeSensorDirective: ResizeSensor;
  let intersectionSensorDirective: IntersectionSensor;
  let sliderComponent: Slider;
  let gallery: Gallery;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    gallery = component.gallery();

    const resizeSensorElement: DebugElement = fixture.debugElement.query(By.directive(ResizeSensor));
    resizeSensorDirective = resizeSensorElement.injector.get(ResizeSensor);

    const intersectionSensorElement: DebugElement = fixture.debugElement.query(By.directive(IntersectionSensor));
    intersectionSensorDirective = intersectionSensorElement.injector.get(IntersectionSensor);

    const sliderComponentElement: DebugElement = fixture.debugElement.query(By.directive(Slider));
    sliderComponent = sliderComponentElement.componentInstance;
  });

  /**
   * Snap Alignment & Intersection Observer (Snap Anchor)
   */
  describe('snapAlign: Positioning the Snap Anchor', () => {

    it('should anchor to the center by default (rootMargin: 0px -50%)', async () => {
      // Test: snapAlign is 'center'
      // Result: The active index changes exactly when an item crosses the viewport midline.
      component.itemsPerView.set(3);
      component.snapAlign.set('center');
      await vi.waitUntil(() => gallery.hasVisibleItems());
      expectDistanceFromEdge(null, null);
      expect(intersectionSensorDirective.anchorIndex()).toBe(1);
      expect(intersectionSensorDirective.stableIndex()).toBe(1);
      expect(intersectionSensorDirective['snapAlignRootMargin']()).toBe('0px -50% 0px -50%');
      gallery.goTo({ index: gallery.itemsCount() - 1, behavior: 'auto' });
      await vi.waitUntil(() => gallery.activeIndex() === gallery.itemsCount() - 2);
      expect(intersectionSensorDirective.anchorIndex()).toBe(gallery.itemsCount() - 2);
      expect(intersectionSensorDirective.stableIndex()).toBe(gallery.itemsCount() - 2);
    });

    it('should anchor to the leading edge when set to "start"', async () => {
      // Test: snapAlign is 'start'
      // Result: The active index changes the moment an item's start edge touches the gallery start.
      component.itemsPerView.set(3);
      component.snapAlign.set('start');
      await vi.waitUntil(() => gallery.hasVisibleItems());
      expectDistanceFromEdge(null, null);
      expect(intersectionSensorDirective.anchorIndex()).toBe(0);
      expect(intersectionSensorDirective.stableIndex()).toBe(0);
      expect(intersectionSensorDirective['snapAlignRootMargin']()).toBe('0px -99% 0px 0px');
      gallery.goTo({ index: gallery.itemsCount() - 1, behavior: 'auto' });
      await vi.waitUntil(() => gallery.activeIndex() === gallery.itemsCount() - 3);
      expect(intersectionSensorDirective.anchorIndex()).toBe(gallery.itemsCount() - 3);
      expect(intersectionSensorDirective.stableIndex()).toBe(gallery.itemsCount() - 3);
    });

    it('should anchor to the trailing edge when set to "end"', async () => {
      // Test: snapAlign is 'end'
      // Result: The active index changes the moment an item's end edge touches the gallery end.
      component.itemsPerView.set(3);
      component.snapAlign.set('end');
      await vi.waitUntil(() => gallery.hasVisibleItems());
      expectDistanceFromEdge(null, null);
      expect(intersectionSensorDirective.anchorIndex()).toBe(2);
      expect(intersectionSensorDirective.stableIndex()).toBe(2);
      expect(intersectionSensorDirective['snapAlignRootMargin']()).toBe('0px 0px 0px -99%');
      gallery.goTo({ index: gallery.itemsCount() - 1, behavior: 'auto' });
      await vi.waitUntil(() => gallery.activeIndex() === gallery.itemsCount() - 1);
      expect(intersectionSensorDirective.anchorIndex()).toBe(gallery.itemsCount() - 1);
      expect(intersectionSensorDirective.stableIndex()).toBe(gallery.itemsCount() - 1);
    });
  });

  describe('forceSnap: Boundary Padding (The "Reach")', () => {

    describe('When more than one item is visible', () => {

      it('should calculate (Viewport - Item) / 2 for both sides when snapAlign is "center"', async () => {
        // Setup: itemsPerView: 2, forceSnap: true, snapAlign: 'center'
        // Result: snapPaddingStart and snapPaddingEnd should be equal and non-zero.
        component.itemsPerView.set(2);
        component.forceSnap.set(true);
        component.snapAlign.set('center');
        await vi.waitUntil(() => gallery.hasVisibleItems());
        expectDistanceFromEdge(100, 100);
        expect(intersectionSensorDirective.anchorIndex()).toBe(0);
        expect(intersectionSensorDirective.stableIndex()).toBe(0);
        gallery.goTo({ index: gallery.itemsCount() - 1, behavior: 'auto' });
        await vi.waitUntil(() => gallery.activeIndex() === gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.anchorIndex()).toBe(gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.stableIndex()).toBe(gallery.itemsCount() - 1);
      });

      it('should only pad the end when snapAlign is "start"', async () => {
        // Setup: itemsPerView: 2, forceSnap: true, snapAlign: 'start'
        // Result: snapPaddingStart is 0, snapPaddingEnd is (Viewport - LastItem).
        component.itemsPerView.set(2);
        component.forceSnap.set(true);
        component.snapAlign.set('start');
        await vi.waitUntil(() => gallery.hasVisibleItems());
        expectDistanceFromEdge(null, 200);
        expect(intersectionSensorDirective.anchorIndex()).toBe(0);
        expect(intersectionSensorDirective.stableIndex()).toBe(0);
        gallery.goTo({ index: gallery.itemsCount() - 1, behavior: 'auto' });
        await vi.waitUntil(() => gallery.activeIndex() === gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.anchorIndex()).toBe(gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.stableIndex()).toBe(gallery.itemsCount() - 1);
      });

      it('should only pad the start when snapAlign is "end"', async () => {
        // Setup: itemsPerView: 2, forceSnap: true, snapAlign: 'end'
        // Result: snapPaddingEnd is 0, snapPaddingStart is (Viewport - FirstItem).
        component.itemsPerView.set(2);
        component.forceSnap.set(true);
        component.snapAlign.set('end');
        await vi.waitUntil(() => gallery.hasVisibleItems());
        expectDistanceFromEdge(200, null);
        expect(intersectionSensorDirective.anchorIndex()).toBe(0);
        expect(intersectionSensorDirective.stableIndex()).toBe(0);
        gallery.goTo({ index: gallery.itemsCount() - 1, behavior: 'auto' });
        await vi.waitUntil(() => gallery.activeIndex() === gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.anchorIndex()).toBe(gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.stableIndex()).toBe(gallery.itemsCount() - 1);
      });
    });

    describe('When only one item is visible (Viewport Constraint)', () => {
      it('should return 0 padding even if forceSnap is true', async () => {
        // Setup: itemsPerView: 1, forceSnap: true
        // Result: Both padding signals should be 0 because the item already fills the anchor.
        component.itemsPerView.set(1);
        component.forceSnap.set(true);
        await vi.waitUntil(() => gallery.hasVisibleItems());
        expectDistanceFromEdge(null, null);
        expect(intersectionSensorDirective.anchorIndex()).toBe(0);
        expect(intersectionSensorDirective.stableIndex()).toBe(0);
        gallery.goTo({ index: gallery.itemsCount() - 1, behavior: 'auto' });
        await vi.waitUntil(() => gallery.activeIndex() === gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.anchorIndex()).toBe(gallery.itemsCount() - 1);
        expect(intersectionSensorDirective.stableIndex()).toBe(gallery.itemsCount() - 1);
      });
    });
  });

  function expectDistanceFromEdge(start: number, end: number) {
    expect(resizeSensorDirective.snapPaddingStart()).toBe(start);
    expect(resizeSensorDirective.snapPaddingEnd()).toBe(end);

    const startSize: string = getComputedStyle(sliderComponent.nativeElement, ':before').flexBasis;
    const endSize: string = getComputedStyle(sliderComponent.nativeElement, ':after').flexBasis;
    expect(startSize).toBe(start ? `${ start }px` : 'auto');
    expect(endSize).toBe(end ? `${ end }px` : 'auto');
  }


});
