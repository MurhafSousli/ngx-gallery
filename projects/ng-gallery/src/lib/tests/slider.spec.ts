import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { GalleryItemComponent } from '../components/gallery-item.component';
import { TestComponent } from './common';
import { SliderComponent } from '../components/slider/slider';
import { HorizontalAdapter, VerticalAdapter } from '../components/adapters';

describe('Gallery slider', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let sliderComponent: SliderComponent;

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

    const sliderComponentElement: DebugElement = fixture.debugElement.query(By.directive(SliderComponent));
    sliderComponent = sliderComponentElement.componentInstance;
  });

  it('should create slider component with default class and attributes', () => {
    expect(sliderComponent).toBeTruthy();
    expect(sliderComponent.nativeElement.classList).toContain('g-slider');
    expect(sliderComponent.nativeElement.getAttribute('centralised')).toBe('false');
    expect(sliderComponent.nativeElement.getAttribute('orientation')).toBe('horizontal');
    expect(sliderComponent.nativeElement.getAttribute('autosize')).toBe('false');
  });

  it('should use horizontal adapter when orientation config specifies "horizontal"', () => {
    component.gallery().galleryRef.setConfig({
      orientation: 'horizontal'
    });
    fixture.detectChanges();

    expect(sliderComponent.nativeElement.getAttribute('orientation')).toBe('horizontal');
    expect(sliderComponent.adapter()).toBeInstanceOf(HorizontalAdapter);
  });

  it('should use vertical adapter when orientation config specifies "vertical"', () => {
    component.gallery().galleryRef.setConfig({
      orientation: 'vertical'
    });
    fixture.detectChanges();

    expect(sliderComponent.nativeElement.getAttribute('orientation')).toBe('vertical');
    expect(sliderComponent.adapter()).toBeInstanceOf(VerticalAdapter);
  });

  it('should render the items loaded in the gallery', () => {
    const items: DebugElement[] = fixture.debugElement.queryAll(By.directive(GalleryItemComponent));
    expect(items.length).toBe(component.gallery().galleryRef.items().length);
  });
});
