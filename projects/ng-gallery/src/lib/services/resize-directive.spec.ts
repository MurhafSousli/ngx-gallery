import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GalleryRef } from 'ng-gallery';
import { firstValueFrom } from 'rxjs';
import { afterTimeout, TestComponent } from '../tests/common';
import { SliderComponent } from '../slider/slider/slider';
import { ResizeSensor } from './resize-sensor';

describe('Resize sensor directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let resizeSensorDirective: ResizeSensor;
  let sliderComponent: SliderComponent;
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
    component = fixture.componentInstance;
    fixture.detectChanges();

    const resizeSensorElement: DebugElement = fixture.debugElement.query(By.directive(ResizeSensor));
    resizeSensorDirective = resizeSensorElement.injector.get(ResizeSensor);
    galleryRef = resizeSensorElement.injector.get(GalleryRef);

    const sliderComponentElement: DebugElement = fixture.debugElement.query(By.directive(SliderComponent));
    sliderComponent = sliderComponentElement.componentInstance;
  });

  it('should create [resizeSensor] directive', () => {
    expect(resizeSensorDirective).toBeTruthy();
  });

  it('should compute "centralizeStart" size when content >= viewport', async () => {
    await firstValueFrom(galleryRef.afterItemsVisible);
    expect(resizeSensorDirective.centralizeStart()).toBe(0);
    expect(resizeSensorDirective.centralizeStart()).toBe(0);
    expect(sliderComponent.nativeElement.style.getPropertyValue('--centralize-start-size')).toBe('0px');
    expect(sliderComponent.nativeElement.style.getPropertyValue('--centralize-end-size')).toBe('0px');
  });

  it('should compute "centralizeStart" size when content < viewport', async () => {
    await firstValueFrom(galleryRef.afterItemsVisible);
    sliderComponent.galleryRef.setConfig({
      itemAutosize: true,
      centralized: true
    });
    component.width = 800;
    component.height = 200;

    fixture.detectChanges();

    expect(resizeSensorDirective.centralizeStart()).toBe(100);
    expect(resizeSensorDirective.centralizeStart()).toBe(100);
    expect(sliderComponent.nativeElement.style.getPropertyValue('--centralize-start-size')).toBe('100px');
    expect(sliderComponent.nativeElement.style.getPropertyValue('--centralize-end-size')).toBe('100px');
  });

  it('should compute "centralizeStart" size when content >= viewport', async () => {
    await firstValueFrom(galleryRef.afterItemsVisible);
    expect(resizeSensorDirective.centralizeStart()).toBe(0);
    expect(resizeSensorDirective.centralizeStart()).toBe(0);
    expect(sliderComponent.nativeElement.style.getPropertyValue('--centralize-start-size')).toBe('0px');
    expect(sliderComponent.nativeElement.style.getPropertyValue('--centralize-end-size')).toBe('0px');
  });

  it('should update the size signal when component size changes', async () => {
    await firstValueFrom(galleryRef.afterItemsVisible);
    expect(resizeSensorDirective.slideSize().width).toBe(500);
    expect(resizeSensorDirective.slideSize().height).toBe(300);
    expect(sliderComponent.nativeElement.style.getPropertyValue('--slider-width')).toBe('500px');
    expect(sliderComponent.nativeElement.style.getPropertyValue('--slider-height')).toBe('300px');

    component.width = 400;
    fixture.detectChanges();
    await afterTimeout(40);

    expect(resizeSensorDirective.slideSize().width).toBe(400);
    expect(sliderComponent.nativeElement.style.getPropertyValue('--slider-width')).toBe('400px');
  });

});
