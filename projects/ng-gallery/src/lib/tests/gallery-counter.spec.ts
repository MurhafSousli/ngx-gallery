import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement, Signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import {
  GalleryComponent,
  GalleryCounterComponent,
  GalleryItem,
  GalleryItemDef,
  GalleryRef,
  ImgRecognizer
} from 'ng-gallery';
import { img1, img2, img3 } from './test-images';
import { afterTimeout } from './common';

@Component({
  imports: [GalleryComponent, GalleryCounterComponent, GalleryItemDef, ImgRecognizer],
  template: `
    <gallery [items]="items" [style.width.px]="width" [style.height.px]="height">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>

      <gallery-counter [align]="align"/>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItem[] = [
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ];
  width: number = 500;
  height: number = 300;

  align: 'top' | 'bottom' = 'top';

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);
}

describe('Gallery counter component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let counterComponent: GalleryCounterComponent;
  let galleryRef: GalleryRef;
  let counterComponentElement: DebugElement;

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

    counterComponentElement = fixture.debugElement.query(By.directive(GalleryCounterComponent));
    counterComponent = counterComponentElement.injector.get(GalleryCounterComponent);
    galleryRef = counterComponentElement.injector.get(GalleryRef);
  });

  it('should create gallery-counter component', () => {
    expect(counterComponent).toBeTruthy();
    expect(galleryRef).toBeTruthy();
  });

  it('should set the align attribute', () => {
    expect(counterComponent.align()).toBe('top');
    expect((counterComponentElement.nativeElement as HTMLElement).getAttribute('align')).toBe('top');

    // Change attribute value
    component.align = 'bottom';
    fixture.detectChanges();

    expect(counterComponent.align()).toBe('bottom');
    expect((counterComponentElement.nativeElement as HTMLElement).getAttribute('align')).toBe('bottom');
  });

  it('should calculate counter based on current index and total number of items', async () => {
    await firstValueFrom(galleryRef.afterItemsVisible);
    expect(counterComponent.counter()).toBe('1 / 3');

    component.gallery().next('auto');
    await afterTimeout(100);
    expect(counterComponent.counter()).toBe('2 / 3');
  });
});
