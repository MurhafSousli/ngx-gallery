import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { SliderItem } from '../slider/slider-item/slider-item';
import { TestComponent } from '../tests/common';
import { GalleryRef } from 'ng-gallery';


describe('Gallery component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideNoopAnimations(),
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create gallery', () => {
    expect(component.gallery()).toBeTruthy();
  });

  it('should load and render items in the gallery', () => {
    expect(component.gallery().galleryRef.items()).toBe(component.items);
    const items: DebugElement[] = fixture.debugElement.queryAll(By.directive(SliderItem));
    expect(items.length).toBe(3);
  });

  it('should trigger forward galleryRef functions', () => {
    const galleryRef: GalleryRef = component.gallery().galleryRef;

    spyOn(component.gallery().galleryRef, 'next');
    component.gallery().next('auto', true);
    expect(galleryRef.next).toHaveBeenCalledOnceWith('auto', true);

    spyOn(component.gallery().galleryRef, 'prev');
    component.gallery().prev('auto', true);
    expect(galleryRef.prev).toHaveBeenCalledOnceWith('auto', true);

    spyOn(component.gallery().galleryRef, 'set');
    component.gallery().set(5, 'auto');
    expect(galleryRef.set).toHaveBeenCalledOnceWith(5, 'auto');

    spyOn(component.gallery().galleryRef, 'reset');
    component.gallery().reset();
    expect(galleryRef.reset).toHaveBeenCalled();

    spyOn(component.gallery().galleryRef, 'play');
    component.gallery().play(3000);
    expect(galleryRef.play).toHaveBeenCalledOnceWith(3000);

    spyOn(component.gallery().galleryRef, 'stop');
    component.gallery().stop();
    expect(galleryRef.stop).toHaveBeenCalled();
  });
});

// it('should trigger pan event', () => {
//   // Find the element
//   const pannableElement = fixture.debugElement.query(By.css('.pannable')).nativeElement;
//
//   // Create a mock Pan event
//   const panEvent = new Event('pan');
//   Object.assign(panEvent, {
//     deltaX: 100, // Pan distance in X axis
//     deltaY: 0,   // Pan distance in Y axis
//     type: 'pan',
//   });
//
//   // Dispatch the event
//   pannableElement.dispatchEvent(panEvent);
//
//   // Assert the expected behavior
//   expect(component.panEventTriggered).toBeTrue();
// });
