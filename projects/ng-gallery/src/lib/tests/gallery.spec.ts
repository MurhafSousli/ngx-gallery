import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { TestComponent } from './common';


describe('Gallery component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create gallery', () => {
    expect(component.gallery()).toBeTruthy();
  });

  it('should load and render items in the gallery', () => {
    expect(component.gallery().galleryRef.items()).toBe(component.items);
    const items: DebugElement[] = fixture.debugElement.queryAll(By.directive(GalleryItemComponent));
    expect(items.length).toBe(3);
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
