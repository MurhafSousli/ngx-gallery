import { Component, ElementRef, signal, Signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryItemDef, Gallery, GalleryImage } from 'ng-gallery';
import { SliderItem } from '../slider-item/slider-item';
import { IntersectionSensor } from '../observers/intersection-sensor';


// Create Signal-based mocks
const mockGalleryRef = {
  activeIndex: signal(0),
  anchorIndex: signal(0)
};

const mockIntersectionSensor = {
  visibleEntries: signal<Record<number, any>>({})
};

@Component({
  imports: [SliderItem, GalleryImage, GalleryItemDef],
  template: `
    <li sliderItem
        [data]="{}"
        [index]="0"
        [count]="1"
        [template]="itemDef().templateRef">
    </li>

    <img *galleryItemDef galleryImage>

    @if (testErrorCase) {
      <img galleryImage>
    }
  `
})
class TestComponent {
  imgRecognizerDirective: Signal<GalleryImage> = viewChild(GalleryImage);
  imgRecognizerElementRef: Signal<ElementRef<HTMLElement>> = viewChild(GalleryImage, {read: ElementRef });
  itemDef: Signal<GalleryItemDef> = viewChild(GalleryItemDef);
  item: Signal<SliderItem> = viewChild(SliderItem);

  testErrorCase: boolean;
}

describe('GalleryImage Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Gallery, useValue: mockGalleryRef },
        { provide: IntersectionSensor, useValue: mockIntersectionSensor }
      ]
    }).compileComponents();
  });

  it('should create an instance', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.imgRecognizerDirective()).toBeTruthy();
  });

  it('should throw an error if used outside a SliderItem', () => {
    TestBed.resetTestingModule(); // Reset the module to allow provider overrides
    TestBed.configureTestingModule({
      providers: [
        { provide: SliderItem, useValue: null },
        { provide: Gallery, useValue: mockGalleryRef },
        { provide: IntersectionSensor, useValue: mockIntersectionSensor }
      ]
    });

    const errSpy = vi.spyOn(console, 'error');

    fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.testErrorCase = true;
    fixture.detectChanges();
    expect(errSpy).toHaveBeenCalledExactlyOnceWith('[NgGallery]: galleryImage directive should be only used inside gallery item templates!');
  });

  it('should set isItemContainImage to true on initialization', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(component.item().containsImage).toBe(true);
  });

  it('should update state to "ready" on image load', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.imgRecognizerElementRef().nativeElement.dispatchEvent(new Event('load'));
    expect(component.item().state()).toBe('ready');
  });

  it('should update state to "error" on image error', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.imgRecognizerElementRef().nativeElement.dispatchEvent(new Event('error'));
    expect(component.item().state()).toBe('error');
  });
});
