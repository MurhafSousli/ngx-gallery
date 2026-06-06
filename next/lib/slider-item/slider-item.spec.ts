import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SliderItem } from './slider-item';
import { TestComponent, TestItemStateComponent } from '../tests/common';

describe('SliderItem component', () => {
  describe('SliderItem as image', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    let items: SliderItem[];

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.autoDetectChanges();
      component = fixture.componentInstance;
      items = fixture.debugElement.queryAll(By.directive(SliderItem)).map(item => item.componentInstance);
      await vi.waitUntil(() => component.gallery().hasVisibleItems());
    });

    it('should create the component and render slider items', () => {
      expect(items.length).toBeDefined();
    });

    it('should initialize with correct host attributes and signals', async () => {
      await vi.waitFor(() => {
        expect(items[0].index()).toBe(0);
        expect(items[0].data()).toBe(component.gallery().items()[0]);
        expect(items[0].count()).toBe(component.gallery().items().length);
        expect(items[0].template()).toBe(component.gallery().itemDef().templateRef);
        expect(items[0].active()).toBe(true);
        expect(items[0].anchor()).toBe(true);
        expect(items[0].visible()).toBe(true);

        // DOM Checks
        expect(items[0].nativeElement).toHaveClass('g-slider-item');
        expect(items[0].nativeElement).toHaveClass('g-active-item');
        expect(items[0].nativeElement).toHaveAttribute('state', 'ready');
        expect(items[0].nativeElement).toHaveAttribute('galleryIndex', '0');
        expect(items[0].nativeElement).not.toHaveAttribute('inert');
      })
    });

    it('should sync active state when gallery index changes', async () => {
      component.gallery().goTo({ index: 1, behavior: 'auto' });
      await vi.waitUntil(() => component.gallery().activeIndex() === 1);

      expect(items[0].active()).toBe(false);
      expect(items[0].anchor()).toBe(false);
      expect(items[0].visible()).toBe(false);

      expect(items[1].active()).toBe(true);
      expect(items[1].anchor()).toBe(true);
      expect(items[1].visible()).toBe(true);

      // DOM Checks
      expect(items[0].nativeElement).not.toHaveClass('g-active-item');
      expect(items[0].nativeElement).toHaveAttribute('inert');

      expect(items[1].nativeElement).toHaveClass('g-active-item');
      expect(items[1].nativeElement).not.toHaveAttribute('inert');
    });

    it('should compute a comprehensive itemContext for the template', async () => {
      await vi.waitFor(() => {
        expect(items[0].itemContext()).toEqual({
          $implicit: component.gallery().items()[0],
          index: 0,
          count: component.items().length,
          active: true,
          anchor: true,
          visible: true,
          state: 'ready',
          first: true,
          last: false
        });
      });
    });
  });

  describe('SliderItem as non image', () => {
    let component: SliderItem;
    let fixture: ComponentFixture<SliderItem>;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderItem);
      fixture.autoDetectChanges();
      component = fixture.componentInstance;
    });

    it('should transition state to "ready" when containsImage is false', () => {
      component.containsImage = false;
      component.ngAfterViewInit();
      fixture.detectChanges();

      expect(component.state()).toBe('ready');
      expect(fixture.nativeElement).toHaveAttribute('state', 'ready');
    });
  });

  describe('SliderItem loader and error templates', () => {
    let component: TestItemStateComponent;
    let fixture: ComponentFixture<TestItemStateComponent>;

    let items: DebugElement[];

    beforeEach(async () => {
      fixture = TestBed.createComponent(TestItemStateComponent);
      fixture.autoDetectChanges();
      component = fixture.componentInstance;
      items = fixture.debugElement.queryAll(By.directive(SliderItem));
      await vi.waitUntil(() => component.gallery().hasVisibleItems());
    });

    it('should NOT show loading or error templates when item state is ready', () => {
      items[0].componentInstance.state.set('ready');
      fixture.detectChanges();

      const loader = items[0].query(By.css('.g-item-loader'));
      const error = items[0].query(By.css('.g-item-error'));

      expect(loader).toBeNull();
      expect(error).toBeNull();
    });

    it('should show loading template when item state is loading', () => {
      items[0].componentInstance.state.set('loading');
      fixture.detectChanges();
      expect(items[0].query(By.css('.g-item-loader'))).toBeTruthy();
    });

    it('should show error template when item state is error', () => {
      items[0].componentInstance.state.set('error');
      fixture.detectChanges();
      expect(items[0].query(By.css('.g-item-error'))).toBeTruthy();
    });
  });
});
