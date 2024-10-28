import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GalleryRef } from 'ng-gallery';
import { getObservableFromContext, TestComponent } from './common';
import { IntersectionSensor } from '../observers/intersection-sensor.directive';
import { filter, firstValueFrom, Observable } from 'rxjs';

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
    await firstValueFrom(galleryRef.afterItemsVisible);

    const visibleItems: Record<number, IntersectionObserverEntry> = galleryRef.visibleItems();
    const element: Element = visibleItems[0].target;
    const queryElement: DebugElement = fixture.debugElement.query(By.css('gallery-item.g-item-highlight'));

    expect(Object.keys(visibleItems).length).toBe(1);
    expect(element).toBe(queryElement.nativeElement);
    expect(element.classList.contains('g-item-highlight')).toBe(true);
    expect(galleryRef.currIndex()).toBe(0);
  });

  it('should detect when next item becomes visible on scroll then detect the previous leave after scroll', async () => {
    await firstValueFrom(galleryRef.afterItemsVisible);

    expect(galleryRef.currIndex()).toBe(0);
    galleryRef.next();

    // Wait for scroll starts and the next item is detected, at this point both previous and next items are visible

    const visibleItemIsTwo$: Observable<any> = getObservableFromContext(galleryRef.visibleItems).pipe(
      filter((obj: Record<number, IntersectionObserverEntry>) => Object.keys(obj).length === 2)
    );
    await firstValueFrom(visibleItemIsTwo$);

    const visibleItems: Record<number, IntersectionObserverEntry> = galleryRef.visibleItems();
    const queryElements: DebugElement[] = fixture.debugElement.queryAll(By.css('gallery-item.g-item-highlight'));

    expect(Object.keys(visibleItems).length).toBe(2);
    expect(visibleItems[0].target).toBe(queryElements[0].nativeElement);
    expect(visibleItems[1].target).toBe(queryElements[1].nativeElement);

    // Wait until scroll is ended and the new active item is set

    const arrivedToNextItem$: Observable<any> = galleryRef.indexChanged.pipe(
      filter((currIndex: number) => currIndex === 1)
    );
    await firstValueFrom(arrivedToNextItem$);

    const visibleItemsAfter: Record<number, IntersectionObserverEntry> = galleryRef.visibleItems();
    const queryElementsAfter: DebugElement[] = fixture.debugElement.queryAll(By.css('gallery-item.g-item-highlight'));

    expect(Object.keys(visibleItems).length).toBe(1);
    expect(visibleItemsAfter[1].target).toBe(queryElementsAfter[0].nativeElement);
    expect(galleryRef.currIndex()).toBe(1);
  });
});
