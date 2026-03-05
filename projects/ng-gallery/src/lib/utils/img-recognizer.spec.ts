import { Component, Signal, viewChild, } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryItemDef, GalleryRef, ImgRecognizer } from 'ng-gallery';
import { ImgManager } from './img-manager';
import { SliderItem } from '../slider/slider-item/slider-item';

@Component({
  imports: [SliderItem, ImgRecognizer, GalleryItemDef],
  template: `
    <slider-item [data]="{}"
                 [currIndex]="0"
                 [index]="0"
                 [count]="1"
                 [template]="itemDef().templateRef"/>

    <img *galleryItemDef galleryImage>

    @if (testErrorCase) {
      <img galleryImage>
    }
  `
})
class TestComponent {
  imgRecognizerDirective: Signal<ImgRecognizer> = viewChild(ImgRecognizer);
  itemDef: Signal<GalleryItemDef> = viewChild(GalleryItemDef);
  item: Signal<SliderItem> = viewChild(SliderItem);

  testErrorCase: boolean;
}

describe('ImgRecognizer Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let imgManager: ImgManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [ImgManager, GalleryRef]
    }).compileComponents();

    imgManager = TestBed.inject(ImgManager);
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
      imports: [TestComponent],
      providers: [
        ImgManager,
        GalleryRef,
        {
          provide: SliderItem, useValue: null
        }
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.testErrorCase = true;
    expect(() => fixture.detectChanges()).toThrowError(
      '[NgGallery]: galleryImage directive should be only used inside gallery item templates!'
    );
  });

  it('should set isItemContainImage to true on initialization', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    expect(component.item().isItemContainImage).toBeTrue();
  });

  it('should register image in ImgManager when index is set', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    spyOn(imgManager, 'addItem');
    fixture.detectChanges();

    expect(imgManager.addItem).toHaveBeenCalledWith(0, {
      state$: component.item().state$,
      target: component.imgRecognizerDirective().nativeElement,
    });
  });

  it('should unregister image from ImgManager on cleanup', () => {
    fixture = TestBed.createComponent(TestComponent);

    spyOn(imgManager, 'deleteItem');
    fixture.detectChanges();

    fixture.destroy();
    expect(imgManager.deleteItem).toHaveBeenCalledWith(0);
  });

  it('should update state to "success" on image load', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.imgRecognizerDirective().nativeElement.dispatchEvent(new Event('load'));
    expect(component.item().state()).toBe('success');
  });

  it('should update state to "failed" on image error', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.imgRecognizerDirective().nativeElement.dispatchEvent(new Event('error'));
    expect(component.item().state()).toBe('failed');
  });
});
