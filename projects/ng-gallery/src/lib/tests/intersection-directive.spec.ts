import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GalleryRef } from 'ng-gallery';
import { afterTimeout, TestComponent } from './common';
import { IntersectionSensor } from '../observers/intersection-sensor.directive';

describe('Intersection directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let intersectionSensorDirective: IntersectionSensor;
  let galleryRef: GalleryRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        TestComponent
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const intersectionSensorElement: DebugElement = fixture.debugElement.query(By.directive(IntersectionSensor));
    intersectionSensorDirective = intersectionSensorElement.injector.get(IntersectionSensor);
    galleryRef = intersectionSensorElement.injector.get(GalleryRef);
  });

  it('should create [intersectionSensor] directive', () => {
    expect(intersectionSensorDirective).toBeTruthy();
  });

  it('should observe when items become visible as soon as possible', async () => {
    await afterTimeout(16);

    const visibleItems: Record<number, IntersectionObserverEntry> = galleryRef.visibleItems();
    const element: Element = visibleItems[0].target;
    const queryElement: DebugElement = fixture.debugElement.query(By.css('gallery-item.g-item-highlight'));

    expect(Object.keys(visibleItems).length).toBe(1);
    expect(element).toBe(queryElement.nativeElement);
    expect(element.classList.contains('g-item-highlight')).toBe(true);
    expect(galleryRef.currIndex()).toBe(0);
  });

  it('should detect when next item becomes visible on scroll then detect the previous leave after scroll', async () => {
    await afterTimeout(16);
    expect(galleryRef.currIndex()).toBe(0);
    galleryRef.next();

    await afterTimeout(200);
    const visibleItems: Record<number, IntersectionObserverEntry> = galleryRef.visibleItems();
    const queryElements: DebugElement[] = fixture.debugElement.queryAll(By.css('gallery-item.g-item-highlight'));

    expect(Object.keys(visibleItems).length).toBe(2);
    expect(visibleItems[0].target).toBe(queryElements[0].nativeElement);
    expect(visibleItems[1].target).toBe(queryElements[1].nativeElement);

    await afterTimeout(300);
    const visibleItemsAfter: Record<number, IntersectionObserverEntry> = galleryRef.visibleItems();
    const queryElementsAfter: DebugElement[] = fixture.debugElement.queryAll(By.css('gallery-item.g-item-highlight'));

    expect(Object.keys(visibleItems).length).toBe(1);
    expect(visibleItemsAfter[1].target).toBe(queryElementsAfter[0].nativeElement);
    expect(galleryRef.currIndex()).toBe(1);
  });
});
