import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Gallery } from 'ng-gallery';
import { SliderItem } from '../slider-item/slider-item';
import { TestComponent } from '../tests/common';
import { Slider } from './slider';
import { HorizontalAdapter, VerticalAdapter } from '../adapters';

describe('Gallery slider', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let sliderComponent: Slider;
  let sliderElement: HTMLElement;
  let gallery: Gallery;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    gallery = component.gallery();

    const sliderComponentElement: DebugElement = fixture.debugElement.query(By.directive(Slider));
    sliderComponent = sliderComponentElement.componentInstance;
    sliderElement = sliderComponentElement.nativeElement;
  });

  it('should create slider component with default class and attributes', () => {
    expect(sliderComponent).toBeDefined();
    expect(sliderElement).toHaveClass('g-slider');
    expect(sliderElement).toHaveAttribute('orientation', 'horizontal');
    expect(sliderElement).toHaveAttribute('status', 'idle');
    expect(sliderElement).not.toHaveAttribute('forceSnap');
    expect(sliderElement).not.toHaveAttribute('autosize');
    expect(sliderComponent.adapter()).toBeInstanceOf(HorizontalAdapter);
  });

  it('should use horizontal adapter when orientation config specifies "horizontal"', () => {
    component.orientation.set('horizontal');
    fixture.detectChanges();

    expect(sliderElement).toHaveAttribute('orientation', 'horizontal');
    expect(sliderComponent.adapter()).toBeInstanceOf(HorizontalAdapter);
  });

  it('should use vertical adapter when orientation config specifies "vertical"', () => {
    component.orientation.set('vertical');
    fixture.detectChanges();

    expect(sliderElement).toHaveAttribute('orientation', 'vertical');
    expect(sliderComponent.adapter()).toBeInstanceOf(VerticalAdapter);
  });

  it('should set forceSnap attribute', () => {
    component.forceSnap.set(true);
    component.itemsPerView.set(3);
    fixture.detectChanges();
    expect(sliderElement).toHaveAttribute('forceSnap');
  });

  it('should set the status attribute when status signal changes', () => {
    sliderComponent.scrolling.set(true);
    fixture.detectChanges();
    expect(sliderElement).toHaveAttribute('status', 'scrolling');

    sliderComponent.dragging.set(true);
    fixture.detectChanges();
    expect(sliderElement).toHaveAttribute('status', 'dragging');
  });

  it('should render the items loaded in the gallery', () => {
    const items: DebugElement[] = fixture.debugElement.queryAll(By.directive(SliderItem));
    expect(items.length).toBe(gallery.items().length);
  });

  it('should compute "scrollSnapType" to none when gallery is scrolling', () => {
    sliderComponent.scrolling.set(true);
    fixture.detectChanges();

    expect(sliderElement).toHaveStyle({
      scrollSnapType: 'none'
    });
  });

  it('should compute "scrollSnapType" to none when gallery is sliding', () => {
    sliderComponent.dragging.set(true);
    fixture.detectChanges();

    expect(sliderElement).toHaveStyle({
      scrollSnapType: 'none'
    });
   });

  it('should compute "scrollSnapType" to adapter scroll snap type value', () => {
    expect(sliderComponent.status()).toBe('idle');
    expect(sliderElement).toHaveStyle({
      scrollSnapType: 'inline mandatory'
    });

    component.orientation.set('vertical');
    fixture.detectChanges();
    expect(sliderElement).toHaveStyle({
      scrollSnapType: 'block mandatory'
    });
  });
});
