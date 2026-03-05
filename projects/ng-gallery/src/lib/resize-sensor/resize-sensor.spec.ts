import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Gallery } from 'ng-gallery';
import { TestComponent } from '../tests/common';
import { Slider } from '../slider/slider';
import { ResizeSensor } from './resize-sensor';

describe('Resize sensor directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let resizeSensorDirective: ResizeSensor;
  let sliderComponent: Slider;
  let gallery: Gallery;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    gallery = component.gallery();

    const resizeSensorElement: DebugElement = fixture.debugElement.query(By.directive(ResizeSensor));
    resizeSensorDirective = resizeSensorElement.injector.get(ResizeSensor);

    const sliderComponentElement: DebugElement = fixture.debugElement.query(By.directive(Slider));
    sliderComponent = sliderComponentElement.componentInstance;
  });

  it('should create [resizeSensor] directive', () => {
    expect(resizeSensorDirective).toBeTruthy();
  });

  function expectDistanceFromEdge(value: number) {
    expect(resizeSensorDirective.snapPaddingStart()).toBe(value);
    expect(resizeSensorDirective.snapPaddingEnd()).toBe(value);

    const startSize: string = getComputedStyle(sliderComponent.nativeElement, ':before').flexBasis;
    const endSize: string = getComputedStyle(sliderComponent.nativeElement, ':after').flexBasis;
    expect(startSize).toBe(value ? `${ value }px` : 'auto');
    expect(endSize).toBe(value ? `${ value }px` : 'auto');
  }

  it('should NOT have additional distance on edges when (content >= viewport) and itemsPreView=1', async () => {
    component.forceSnap.set(true);
    await vi.waitUntil(() => gallery.hasVisibleItems());
    expectDistanceFromEdge(null);
  });

  it('should have additional distance on edges when (content >= viewport) and itemsPreView>1', async () => {
    component.forceSnap.set(true);
    component.itemsPerView.set(2);
    await vi.waitUntil(() => gallery.hasVisibleItems());
    expectDistanceFromEdge(100);
  });

  it('should NOT have additional distance on edges when (content < viewport) and itemSize=auto', async () => {
    component.forceSnap.set(true);
    component.itemSize.set('auto');
    component.width.set(component.items().length * 200);
    component.height.set(200);
    await vi.waitUntil(() => gallery.hasVisibleItems());
    expectDistanceFromEdge(null);
  });

  it('should NOT have additional distance on edges when (content >= viewport) and itemSize={size}px', async () => {
    component.forceSnap.set(true);
    component.itemSize.set(300);
    await vi.waitUntil(() => gallery.hasVisibleItems());
    expectDistanceFromEdge(50);
  });

  it('should have additional distance when (content >= viewport) and itemSize=auto', async () => {
    component.forceSnap.set(true);
    component.itemSize.set('auto');
    await vi.waitUntil(() => gallery.hasVisibleItems());
    expectDistanceFromEdge(50);
  });

  it('should update the size signal when component size changes', async () => {
    const width: number = component.width();
    const height: number = component.height();
    await vi.waitUntil(() => gallery.hasVisibleItems());

    expect(resizeSensorDirective.viewportSize().width).toBe(width);
    expect(resizeSensorDirective.viewportSize().height).toBe(height);

    component.width.set(300);
    await vi.waitFor(() => {
      expect(resizeSensorDirective.viewportSize().width).toBe(300);
    });

    component.width.set(500);
    await vi.waitFor(() => {
      expect(resizeSensorDirective.viewportSize().width).toBe(500);
    });
  });
});
