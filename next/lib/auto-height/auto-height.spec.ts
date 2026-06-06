import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, signal, viewChild, DebugElement, Signal, WritableSignal } from '@angular/core';
import { Gallery, GalleryModule } from 'ng-gallery';
import { GalleryAutoHeight } from './auto-height';
import { SliderItem } from '../slider-item/slider-item';
import { ResizeSensor } from '../resize-sensor/resize-sensor';

@Component({
  imports: [GalleryModule],
  template: `
    <gallery autoHeight [items]="items" style="border: none" [style.width.px]="width()">
      <div *galleryItemDef="let item; let i = index"
           style="background: #354c6d; color: white; display: flex; justify-content: center; align-items: center;"
           [style.height.px]="200 * (i + 1)">
        {{ i + 1 }}
      </div>
    </gallery>
  `
})
export class TestComponent {
  items: string[] = ['1', '2', '3'];
  width: WritableSignal<number> = signal(400);
  height: WritableSignal<number> = signal(300);

  gallery: Signal<Gallery> = viewChild(Gallery);
}


describe('Auto-height directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let gallery: Gallery;
  let autoHeightDirective: GalleryAutoHeight;
  let autoHeightElement: HTMLElement;
  let resizeSensorElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    const autoHeightDebugElement: DebugElement = fixture.debugElement.query(By.directive(GalleryAutoHeight));
    autoHeightElement = autoHeightDebugElement.nativeElement;
    autoHeightDirective = autoHeightDebugElement.injector.get(GalleryAutoHeight);
    const resizeSensorDebugElement: DebugElement = fixture.debugElement.query(By.directive(ResizeSensor));
    resizeSensorElement = resizeSensorDebugElement.nativeElement;
    gallery = fixture.componentInstance.gallery();
  });

  it('should create [autoHeight] directive and apply the proper styles', () => {
    expect(autoHeightDirective).toBeDefined();
    expect(autoHeightElement).toHaveAttribute('autoHeight');
  });

  it('should set the slider\'s transition duration via CSS variable', () => {
    autoHeightElement.style.setProperty('--_slider-size-transition-duration', '1s');
    expect(autoHeightElement).toHaveStyle({
      height: 'auto'
    });
    expect(resizeSensorElement).toHaveStyle({
      transitionDuration: '1s',
    });
  });

  it('should forward the proper CSS variables to slider item', async () => {
    const sliderElement: HTMLElement = resizeSensorElement;
    const initialActiveItem: SliderItem = gallery.activeItem();
    const activeItemElement: HTMLElement = initialActiveItem.nativeElement;

    expect(activeItemElement).toHaveStyle({
      willChange: '"scroll-position, inline-size, block-size"',
    });

    const expectedHeight: number = 200;
    // Wait for the data to be ready and the resize animation/transition to finish
    await vi.waitFor(() => {
      expect(initialActiveItem.state()).toBe('ready');

      expect(autoHeightDirective.activeItemHeight()).toBe(expectedHeight);

      expect(sliderElement).toHaveStyle({
        height: `${ expectedHeight }px`,
      });

      // The width of the slide should be equal to the slider's width, it should not be 100% for non-image slides
      expect(activeItemElement).toHaveStyle({
        height: `${ expectedHeight }px`,
        width: `${ sliderElement.clientWidth }px`,
      });
    });
  });

  it('should change height when moving between slides of different sizes', async () => {
    const sliderElement: HTMLElement = resizeSensorElement;

    // Wait for the data to be ready and the resize animation/transition to finish
    await vi.waitFor(() => {
      const expectedHeight: number = 200;
      const initialActiveItem: SliderItem = gallery.activeItem();
      expect(initialActiveItem.state()).toBe('ready');

      expect(autoHeightDirective.activeItemHeight()).toBe(expectedHeight);
      expect(sliderElement).toHaveStyle({
        height: `${ expectedHeight }px`,
      });
    });

    gallery.next();

    await vi.waitUntil(() => gallery.activeIndex() === 1);

    await vi.waitFor(() => {
      const expectedHeight: number = 400;
      const nextActiveItem: SliderItem = gallery.activeItem();
      expect(nextActiveItem.state()).toBe('ready');

      expect(autoHeightDirective.activeItemHeight()).toBe(expectedHeight);
      expect(sliderElement).toHaveStyle({
        height: `${ expectedHeight }px`,
      });
    });
  });
});
