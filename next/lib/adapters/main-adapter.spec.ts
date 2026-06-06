import { Component, ElementRef, Signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorizontalAdapter, VerticalAdapter } from './main-adapters';

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

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    sliderElement = component.slider().nativeElement;
    contentElement = component.content().nativeElement;
    adapter = new VerticalAdapter(sliderElement);

    sliderElement.style.width = '500px';
    sliderElement.style.overflowX = 'auto';

    contentElement.style.width = '1000px';

    adapter = new HorizontalAdapter(sliderElement);
  });

  it('should create an instance', () => {
    expect(adapter).toBeTruthy();
  });

  it('should have the correct scrollSnapType', () => {
    expect(adapter.scrollSnapType).toBe('inline mandatory');
  });

  it('should return the correct scrollValue', () => {
    sliderElement.scrollLeft = 100;
    expect(adapter.scrollValue).toBe(100);
  });

  it('should return the correct offsetSize', () => {
    expect(adapter.offsetSize).toBe('offsetWidth');
  });

  it('getRootMargin and getActiveEntryRootMargin should return the correct root margins', () => {
    expect(adapter.getVisibleEntriesRootMargin()).toBe('1000px 0px 1000px 0px');
    expect(adapter.getActiveEntryRootMarginForStart()).toBe('0px -99% 0px 0px');
    expect(adapter.getActiveEntryRootMarginForCenter()).toBe('0px -50% 0px -50%');
    expect(adapter.getActiveEntryRootMarginForEnd()).toBe('0px 0px 0px -99%');
  });
});

describe('VerticalAdapter', () => {
  let adapter: VerticalAdapter;
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let sliderElement: HTMLElement;
  let contentElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger change detection to render the template

    sliderElement = component.slider().nativeElement;
    contentElement = component.content().nativeElement;
    adapter = new VerticalAdapter(sliderElement);

    sliderElement.style.height = '500px';
    sliderElement.style.overflowX = 'auto';

    contentElement.style.height = '1000px';

    adapter = new VerticalAdapter(sliderElement);
  });

  it('should create an instance', () => {
    expect(adapter).toBeTruthy();
  });

  it('should have the correct scrollSnapType', () => {
    expect(adapter.scrollSnapType).toBe('block mandatory');
  });

  it('should return the correct scrollValue', () => {
    sliderElement.scrollTop = 100;
    expect(adapter.scrollValue).toBe(100);
  });

  it('should return the correct offsetSize', () => {
    expect(adapter.offsetSize).toBe('offsetHeight');
  });

  it('getRootMargin and getActiveEntryRootMargin should return the correct root margins', () => {
    expect(adapter.getVisibleEntriesRootMargin()).toBe('0px 1000px 0px 1000px');
    expect(adapter.getActiveEntryRootMarginForStart()).toBe('-99% 0px 0px 0px');
    expect(adapter.getActiveEntryRootMarginForCenter()).toBe('-50% 0px -50% 0px');
    expect(adapter.getActiveEntryRootMarginForEnd()).toBe('0px 0px -99% 0px');
  });
});
