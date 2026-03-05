import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  Gallery,
  SliderItem,
  GalleryDebug,
  provideGalleryOptions
} from 'ng-gallery';
import { TestComponent } from './tests/common';
import { Slider } from './slider/slider';
import { BASE_SLIDER_OPTIONS } from './gallery-ref';

describe('Gallery component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let gallery: Gallery;
  let galleryElement: HTMLElement;
  let sliderComponent: Slider;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.scrollBehavior.set('auto');
    fixture.autoDetectChanges();

    gallery = component.gallery();
    const galleryComponentElement: DebugElement = fixture.debugElement.query(By.directive(Gallery));
    galleryElement = galleryComponentElement.nativeElement;

    const sliderComponentElement: DebugElement = fixture.debugElement.query(By.directive(Slider));
    sliderComponent = sliderComponentElement.componentInstance;

    await vi.waitUntil(() => gallery.hasVisibleItems());
  });

  it('should create gallery', () => {
    expect(gallery).toBeTruthy();
    expect(gallery.activeItem()).toBeTruthy();
    expect(gallery.itemDef()).toBeTruthy();
  });

  it('should load and render items in the gallery', () => {
    expect(gallery.items()).toBe(component.items());
    const items: DebugElement[] = fixture.debugElement.queryAll(By.directive(SliderItem));
    expect(items).toHaveLength(component.items().length);
  });

  it('should disable slider scroll', () => {
    component.disableScroll.set(true);
    fixture.detectChanges();

    expect(galleryElement).toHaveAttribute('scrollDisabled');
    expect(sliderComponent.nativeElement).toHaveStyle({
      overflow: 'hidden'
    });

    sliderComponent.nativeElement.scrollLeft = 100;
    expect(sliderComponent.nativeElement.scrollLeft).toBe(0);
  });

  it('should render the debug UI when config.debug is true', () => {
    component.debug.set(true);
    fixture.detectChanges();

    const debuggerUI: DebugElement = fixture.debugElement.query(By.directive(GalleryDebug));
    expect(debuggerUI).toBeTruthy();
  });
});


describe('Layout Resolution', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let gallery: Gallery;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.scrollBehavior.set('auto');
    fixture.autoDetectChanges();

    gallery = component.gallery();
  });

  it('should default to one item per view when no sizing inputs are provided', async () => {
    await vi.waitUntil(() => gallery.hasVisibleItems());
    const entries = Object.values(gallery.visibleEntries());
    expect(entries).toHaveLength(1);
    expect(gallery.hasNext()).toBe(true);
    expect(entries[0].target).toHaveStyle({
      width: '400px'
    });
  });

  it('should calculate item size based on itemsPerView', async () => {
    component.itemsPerView.set(4);
    fixture.detectChanges();
    await vi.waitUntil(() => gallery.hasVisibleItems());

    const entries = Object.values(gallery.visibleEntries());
    expect(entries.length).toBe(4);
    entries.forEach((entry: IntersectionObserverEntry) => {
      expect(entry.target).toHaveStyle({
        width: `${ 400 / 4 }px`,
      });
    });
  });

  it('should use itemSize and prioritize itemSize over itemsPerView when both are provided', async () => {
    component.itemsPerView.set(3);
    component.itemSize.set(200);
    fixture.detectChanges();
    await vi.waitUntil(() => gallery.hasVisibleItems());

    const entries = Object.values(gallery.visibleEntries());
    expect(entries.length).toBe(2);
    entries.forEach((entry: IntersectionObserverEntry) => {
      expect(entry.target).toHaveStyle({
        width: `200px`,
      });
    });
  });

  it('should not exceed viewport itemSize when item size when container width changes', async () => {
    component.itemSize.set(600);
    fixture.detectChanges();
    await vi.waitUntil(() => gallery.hasVisibleItems());

    const entries = Object.values(gallery.visibleEntries());
    expect(entries.length).toBe(1);
    // The width of the gallery is 400px
    entries.forEach((entry: IntersectionObserverEntry) => {
      expect(entry.target).toHaveStyle({
        width: `400px`,
      });
    });
  });
});

describe('Gallery Providers Coverage', () => {

  it('should execute the BASE_SLIDER_OPTIONS factory', () => {
    TestBed.resetTestingModule();

    TestBed.configureTestingModule({
      providers: [
        provideGalleryOptions({
          loop: true,
          itemSize: 'auto',
          forceSnap: false,
          disableScroll: false,
          scrollBehavior: 'smooth',
          scrollDuration: 300,
          disableMouseScroll: false,
        })
      ]
    });

    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const galleryDE = fixture.debugElement.query(By.directive(Gallery));
    // ✅ Resolve from component injector
    const options = galleryDE.injector.get(BASE_SLIDER_OPTIONS);

    expect(options.loop).toBe(true);
  });
});
