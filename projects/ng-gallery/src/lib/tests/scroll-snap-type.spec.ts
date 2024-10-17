import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TestComponent } from './common';
import { ScrollSnapType } from '../services/scroll-snap-type';
import { SmoothScroll } from '../smooth-scroll';
import { HammerSliding } from '../gestures/hammer-sliding.directive';
import { SliderComponent } from '../components/slider/slider';

describe('Scroll snap type directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let scrollSnapTypeDirective: ScrollSnapType;
  let smoothScrollDirective: SmoothScroll;
  let hammerSliderDirective: HammerSliding;
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
    fixture.detectChanges();

    const smoothScrollElement: DebugElement = fixture.debugElement.query(By.directive(SmoothScroll));
    smoothScrollDirective = smoothScrollElement.injector.get(SmoothScroll);

    const scrollSnapTypeElement: DebugElement = fixture.debugElement.query(By.directive(ScrollSnapType));
    scrollSnapTypeDirective = scrollSnapTypeElement.injector.get(ScrollSnapType);

    const hammerSliderElement: DebugElement = fixture.debugElement.query(By.directive(HammerSliding));
    hammerSliderDirective = hammerSliderElement.injector.get(HammerSliding);

    const sliderComponentElement: DebugElement = fixture.debugElement.query(By.directive(SliderComponent));
    sliderComponent = sliderComponentElement.componentInstance;
  });

  it('should create [scrollSnapType] directive', () => {
    expect(scrollSnapTypeDirective).toBeTruthy();
  });

  it('should compute "scrollSnapType" to none when gallery is scrolling', () => {
    smoothScrollDirective.scrolling.set(true);
    fixture.detectChanges();

    expect(scrollSnapTypeDirective.scrollSnapType()).toBe('none');
    expect(sliderComponent.nativeElement.style.getPropertyValue('--slider-scroll-snap-type')).toBe('none');
  });

  it('should compute "scrollSnapType" to none when gallery is sliding', () => {
    hammerSliderDirective.sliding.set(true);
    fixture.detectChanges();

    expect(scrollSnapTypeDirective.scrollSnapType()).toBe('none');
    expect(sliderComponent.nativeElement.style.getPropertyValue('--slider-scroll-snap-type')).toBe('none');
  });

  it('should compute "scrollSnapType" to adapter scroll snap type value', () => {
    smoothScrollDirective.scrolling.set(false);
    hammerSliderDirective.sliding.set(false);
    fixture.detectChanges();

    expect(scrollSnapTypeDirective.scrollSnapType()).toBe(sliderComponent.adapter().scrollSnapType);
    expect(sliderComponent.nativeElement.style.getPropertyValue('--slider-scroll-snap-type')).toBe(sliderComponent.adapter().scrollSnapType);
  });

});
