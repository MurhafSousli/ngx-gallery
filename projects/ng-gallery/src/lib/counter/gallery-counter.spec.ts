import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  Gallery,
  GalleryImage,
  GalleryItemDef,
  GalleryItemData,
  GalleryCounter
} from 'ng-gallery';
import { img1, img2, img3 } from '../tests/test-images';

@Component({
  imports: [Gallery, GalleryCounter, GalleryItemDef, GalleryImage],
  template: `
    <gallery [items]="items()" [style.width.px]="width" [style.height.px]="height">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>

      <gallery-counter [align]="align()"/>
    </gallery>
  `
})
export class TestComponent {
  items: WritableSignal<GalleryItemData[]> = signal([
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ]);
  width: number = 500;
  height: number = 300;

  align: WritableSignal<'top' | 'bottom'> = signal('top');

  gallery: Signal<Gallery> = viewChild(Gallery);
}

describe('Gallery counter component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let counterComponent: GalleryCounter;
  let counterComponentElement: DebugElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;

    counterComponentElement = fixture.debugElement.query(By.directive(GalleryCounter));
    counterComponent = counterComponentElement.componentInstance;
  });

  it('should create gallery-counter component', () => {
    expect(counterComponent).toBeTruthy();
    expect(counterComponentElement.nativeElement).toHaveClass('g-panel', 'g-counter');
  });

  it('should set the align attribute', async () => {
    await vi.waitUntil(() => component.gallery().hasVisibleItems());
    expect(counterComponent.align()).toBe('top');
    expect((counterComponentElement.nativeElement as HTMLElement).getAttribute('align')).toBe('top');

    // Change attribute value
    component.align.set('bottom');
    fixture.detectChanges();

    expect(counterComponent.align()).toBe('bottom');
    expect((counterComponentElement.nativeElement as HTMLElement).getAttribute('align')).toBe('bottom');
  });

  it('should calculate counter based on current index and total number of items', async () => {
    await vi.waitUntil(() => component.gallery().hasVisibleItems());
    expect(counterComponentElement.nativeElement).toHaveTextContent('1 / 3');

    component.gallery().next({ behavior: 'auto' });

    await vi.waitFor(() => {
      expect(counterComponentElement.nativeElement).toHaveTextContent('2 / 3');
    });
  });

  it('should display 0/0 if items array is empty', async () => {
    component.items.set([]);
    fixture.detectChanges();
    expect(counterComponentElement.nativeElement).toHaveTextContent('0 / 0');
  });
});
