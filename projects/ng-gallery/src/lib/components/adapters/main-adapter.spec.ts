import { Component, ElementRef, Signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
  HorizontalAdapter,
  VerticalAdapter
} from './main-adapters';
import { GalleryConfig } from 'ng-gallery';

@Component({
  selector: 'test-component',
  template: `
    <div class="slider" #slider>
      <div class="content" #content>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
      </div>
    </div>
  `,
  styles: [`
    .item {
      height: 50px;
      width: 50px;
    }
  `]
})
class TestComponent {
  slider: Signal<ElementRef<HTMLElement>> = viewChild('slider')
  content: Signal<ElementRef<HTMLElement>> = viewChild('content')
}

describe('HorizontalAdapter', () => {
  let adapter: VerticalAdapter;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let sliderElement: HTMLElement;
  let contentElement: HTMLElement;
  let config: GalleryConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to render the template

    sliderElement = component.slider().nativeElement;
    contentElement = component.content().nativeElement;
    config = {};
    adapter = new VerticalAdapter(sliderElement, config);

    sliderElement.style.width = '500px';
    sliderElement.style.overflowX = 'auto';

    contentElement.style.width = '1000px';

    config = {}; // Or a more specific config if needed
    adapter = new HorizontalAdapter(sliderElement, config);
  });

  it('should create an instance', () => {
    expect(adapter).toBeTruthy();
  });

  it('should have the correct hammerDirection', () => {
    expect(adapter.hammerDirection).toBe(DIRECTION_LEFT | DIRECTION_RIGHT);
  });

  it('should have the correct scrollSnapType', () => {
    expect(adapter.scrollSnapType).toBe('x mandatory');
  });

  it('should return the correct scrollValue', () => {
    sliderElement.scrollLeft = 100;
    expect(adapter.scrollValue).toBe(100);
  });

  it('should return the correct clientSize', () => {
    expect(adapter.clientSize).toBe(500);
  });

  it('should return the correct isContentLessThanContainer value', () => {
    expect(adapter.isContentLessThanContainer).toBe(false); // Content is wider than container in beforeEach setup

    (sliderElement.firstElementChild as HTMLElement).style.width = '400px';
    expect(adapter.isContentLessThanContainer).toBe(true); // Content is now less than container
  });

  it('getScrollToValue should return the correct scroll options', () => {
    const target = document.createElement('div');
    target.style.width = '100px';
    sliderElement.appendChild(target);

    const scrollToOptions = adapter.getScrollToValue(target, 'smooth');
    const expectedPosition = target.offsetLeft - ((adapter.clientSize - target.clientWidth) / 2);
    expect(scrollToOptions).toEqual({
      behavior: 'smooth',
      start: expectedPosition
    });
  });

  it('getRootMargin should return the correct root margin', () => {
    expect(adapter.getRootMargin()).toBe('1000px 0px 1000px 0px');
  });

  it('getElementRootMargin should return the correct element root margin', () => {
    const viewport = document.createElement('div');
    viewport.style.width = '500px';
    const el = document.createElement('div');
    el.style.width = '100px';

    const rootMargin = -1 * ((viewport.clientWidth - el.clientWidth) / 2) + 1;
    expect(adapter.getElementRootMargin(viewport, el)).toBe(`0px ${ rootMargin }px 0px ${ rootMargin }px`);
  });

  it('getCentralizerStartSize should return the correct size when content is less than container', () => {
    (sliderElement.firstElementChild as HTMLElement).style.width = '400px';
    const size = adapter.clientSize - (sliderElement.firstElementChild as HTMLElement).clientWidth;
    expect(adapter.getCentralizerStartSize()).toBe(size / 2);
  });

  it('getCentralizerStartSize should return the correct size when content is greater than or equal to container', () => {
    const expectedSize = (adapter.clientSize / 2) - ((sliderElement.firstElementChild as HTMLElement).firstElementChild?.clientWidth / 2);
    expect(adapter.getCentralizerStartSize()).toBe(expectedSize);
  });

  it('getCentralizerEndSize should return the correct size when content is less than container', () => {
    (sliderElement.firstElementChild as HTMLElement).style.width = '400px';
    const size = adapter.clientSize - (sliderElement.firstElementChild as HTMLElement).clientWidth;
    expect(adapter.getCentralizerEndSize()).toBe(size / 2);
  });

  it('getCentralizerEndSize should return the correct size when content is greater than or equal to container', () => {
    const expectedSize = (adapter.clientSize / 2) - ((sliderElement.firstElementChild as HTMLElement).lastElementChild?.clientWidth / 2);
    expect(adapter.getCentralizerEndSize()).toBe(expectedSize);
  });

  it('getHammerVelocity should return the correct velocity', () => {
    const e = { velocityX: 2.5 };
    expect(adapter.getHammerVelocity(e)).toBe(e.velocityX);
  });

  it('getHammerValue should return the correct scroll options', () => {
    const value = 100;
    const e = { deltaX: 50 };
    const scrollToOptions = adapter.getHammerValue(value, e, 'smooth');
    expect(scrollToOptions).toEqual({
      behavior: 'smooth',
      left: value - e.deltaX
    });
  });
});

describe('VerticalAdapter', () => {
  let adapter: VerticalAdapter;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let sliderElement: HTMLElement;
  let contentElement: HTMLElement;
  let config: GalleryConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to render the template

    sliderElement = component.slider().nativeElement;
    contentElement = component.content().nativeElement;
    config = {};
    adapter = new VerticalAdapter(sliderElement, config);

    sliderElement.style.height = '500px';
    sliderElement.style.overflowX = 'auto';

    contentElement.style.height = '1000px';

    config = {};
    adapter = new VerticalAdapter(sliderElement, config);
  });

  it('should create an instance', () => {
    expect(adapter).toBeTruthy();
  });

  it('should have the correct hammerDirection', () => {
    expect(adapter.hammerDirection).toBe(DIRECTION_UP | DIRECTION_DOWN);
  });

  it('should have the correct scrollSnapType', () => {
    expect(adapter.scrollSnapType).toBe('y mandatory');
  });

  it('should return the correct scrollValue', () => {
    sliderElement.scrollTop = 100;
    expect(adapter.scrollValue).toBe(100);
  });

  it('should return the correct clientSize', () => {
    expect(adapter.clientSize).toBe(500);
  });

  it('should return the correct isContentLessThanContainer value', () => {
    expect(adapter.isContentLessThanContainer).toBe(false); // Content is taller than container in beforeEach setup

    (sliderElement.firstElementChild as HTMLElement).style.height = '400px';
    expect(adapter.isContentLessThanContainer).toBe(true); // Content is now less than container
  });

  it('getScrollToValue should return the correct scroll options', () => {
    const target = document.createElement('div');
    target.style.height = '100px';
    sliderElement.appendChild(target);

    const scrollToOptions = adapter.getScrollToValue(target, 'smooth');
    const expectedPosition = target.offsetTop - ((adapter.clientSize - target.clientHeight) / 2);
    expect(scrollToOptions).toEqual({
      behavior: 'smooth',
      top: expectedPosition
    });
  });

  it('getRootMargin should return the correct root margin', () => {
    expect(adapter.getRootMargin()).toBe('0px 1000px 0px 1000px');
  });

  it('getElementRootMargin should return the correct element root margin', () => {
    const viewport = document.createElement('div');
    viewport.style.height = '500px';
    const el = document.createElement('div');
    el.style.height = '100px';

    const rootMargin = -1 * ((viewport.clientHeight - el.clientHeight) / 2) + 1;
    expect(adapter.getElementRootMargin(viewport, el)).toBe(`${ rootMargin }px 0px ${ rootMargin }px 0px`);
  });

  it('getCentralizerStartSize should return the correct size when content is less than container', () => {
    (sliderElement.firstElementChild as HTMLElement).style.height = '400px';
    const size = adapter.clientSize - (sliderElement.firstElementChild as HTMLElement).clientHeight;
    expect(adapter.getCentralizerStartSize()).toBe(size / 2);
  });

  it('getCentralizerStartSize should return the correct size when content is greater than or equal to container', () => {
    const expectedSize = (adapter.clientSize / 2) - ((sliderElement.firstElementChild as HTMLElement).firstElementChild?.clientHeight / 2);
    expect(adapter.getCentralizerStartSize()).toBe(expectedSize);
  });

  it('getCentralizerEndSize should return the correct size when content is less than container', () => {
    (sliderElement.firstElementChild as HTMLElement).style.height = '400px';
    const size = adapter.clientSize - (sliderElement.firstElementChild as HTMLElement).clientHeight;
    expect(adapter.getCentralizerEndSize()).toBe(size / 2);
  });

  it('getCentralizerEndSize should return the correct size when content is greater than or equal to container', () => {
    const expectedSize = (adapter.clientSize / 2) - ((sliderElement.firstElementChild as HTMLElement).lastElementChild?.clientHeight / 2);
    expect(adapter.getCentralizerEndSize()).toBe(expectedSize);
  });

  it('getHammerVelocity should return the correct velocity', () => {
    const e = { velocityY: 2.5 };
    expect(adapter.getHammerVelocity(e)).toBe(e.velocityY);
  });

  it('getHammerValue should return the correct scroll options', () => {
    const value = 100;
    const e = { deltaY: 50 };
    const scrollToOptions = adapter.getHammerValue(value, e, 'smooth');
    expect(scrollToOptions).toEqual({
      behavior: 'smooth',
      top: value - e.deltaY
    });
  });
});
