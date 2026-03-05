import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Gallery } from 'ng-gallery';
import { Slider } from '../slider/slider';
import { IntersectionSensor } from './intersection-sensor';
import { TestComponent } from '../tests/common';

describe('Intersection directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let intersectionSensor: IntersectionSensor;
  let sliderComponent: Slider;
  let gallery: Gallery;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    gallery = fixture.componentInstance.gallery();

    const intersectionSensorElement: DebugElement = fixture.debugElement.query(By.directive(IntersectionSensor));
    intersectionSensor = intersectionSensorElement.injector.get(IntersectionSensor);
    sliderComponent = fixture.debugElement.query(By.directive(Slider)).componentInstance;
  });

  it('should create [intersectionSensor] directive', () => {
    expect(intersectionSensor).toBeTruthy();
  });

  it('should detect the first slide as active on initialization', async () => {
    await vi.waitUntil(() => gallery.hasVisibleItems());

    const visibleItems: Record<number, IntersectionObserverEntry> = gallery.visibleEntries();
    const element: Element = visibleItems[0].target;

    // Wait until a visible class is applied to the slider item
    fixture.detectChanges();
    const queryElement: DebugElement = fixture.debugElement.query(By.css('[sliderItem].g-visible-item'));

    expect(Object.keys(visibleItems).length).toBe(1);
    expect(element).toBe(queryElement.nativeElement);
    expect(element).toHaveClass('g-visible-item');
    expect(intersectionSensor.anchorIndex()).toBe(0);
    expect(gallery.activeIndex()).toBe(0);
  });

  it('should detect when next item becomes visible on scroll then detect the previous leave after scroll', async () => {
    await vi.waitUntil(() => gallery.hasVisibleItems());

    expect(gallery.activeIndex()).toBe(0);
    gallery.next();

    // Wait for scroll starts and the next item is intersected, at this point both previous and next items are intersecting
    let visibleItems: Record<number, IntersectionObserverEntry>;
    await vi.waitFor(() => {
      visibleItems = gallery.visibleEntries();
      expect(Object.keys(visibleItems).length).toBe(2);
    })

    const queryElements: DebugElement[] = fixture.debugElement.queryAll(By.css('[sliderItem].g-visible-item'));

    expect(visibleItems[0].target).toBe(queryElements[0].nativeElement);
    expect(visibleItems[1].target).toBe(queryElements[1].nativeElement);

    // Wait until the scroll is ended and the new active item is set
    await vi.waitUntil(() => sliderComponent.status() === 'idle');

    const visibleItemsAfter: Record<number, IntersectionObserverEntry> = gallery.visibleEntries();
    const queryElementsAfter: DebugElement[] = fixture.debugElement.queryAll(By.css('[sliderItem].g-visible-item'));

    await vi.waitFor(() => {
      expect(Object.keys(visibleItemsAfter).length).toBe(1);
    });
    expect(visibleItemsAfter[1].target).toBe(queryElementsAfter[0].nativeElement);
    expect(gallery.activeIndex()).toBe(1);
  });


  it('should detect the live index', async () => {
    await vi.waitUntil(() => gallery.hasVisibleItems());
    expect(gallery.anchorIndex()).toBe(0);

    // If the slide is 400px, we scroll to 201px and wait for 16ms to make sure the live index is updated
    sliderComponent.nativeElement.scrollLeft = 201;
    await vi.waitFor(() => {
      expect(gallery.anchorIndex()).toBe(1);
    });

    // Then scroll back to 199px to make sure the live index is updated again
    sliderComponent.nativeElement.scrollLeft = 199;
    await vi.waitFor(() => {
      expect(gallery.anchorIndex()).toBe(0);
    });
  });
});
