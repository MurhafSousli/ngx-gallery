import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement, Signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  GalleryBulletsComponent,
  GalleryComponent,
  GalleryItemData,
  GalleryItemDef,
  GalleryRef,
  ImgRecognizer
} from 'ng-gallery';
import { img1, img2, img3 } from './test-images';

@Component({
  imports: [GalleryComponent, GalleryBulletsComponent, GalleryItemDef, ImgRecognizer],
  template: `
    <gallery [items]="items" [style.width.px]="width" [style.height.px]="height">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>

      <gallery-bullets [align]="align" [disabled]="disabled" [size]="size" [scrollBehavior]="scrollBehavior"/>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItemData[] = [
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ];
  width: number = 500;
  height: number = 300;

  align: 'top' | 'bottom' = 'top';
  disabled: boolean = false;
  size: number = 6;
  scrollBehavior: ScrollBehavior = 'smooth';

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);
}

describe('Gallery bullets component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let bulletsComponent: GalleryBulletsComponent;
  let galleryRef: GalleryRef;
  let bulletsComponentElement: DebugElement;

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

    bulletsComponentElement = fixture.debugElement.query(By.directive(GalleryBulletsComponent));
    bulletsComponent = bulletsComponentElement.injector.get(GalleryBulletsComponent);
    galleryRef = bulletsComponentElement.injector.get(GalleryRef);
  });

  it('should create gallery-bullets component', () => {
    expect(bulletsComponent).toBeTruthy();
    expect(galleryRef).toBeTruthy();
  });

  it('should set the align attribute', () => {
    expect(bulletsComponent.align()).toBe('top');
    expect((bulletsComponentElement.nativeElement as HTMLElement).getAttribute('align')).toBe('top');

    // Change attribute value
    component.align = 'bottom';
    fixture.detectChanges();

    expect(bulletsComponent.align()).toBe('bottom');
    expect((bulletsComponentElement.nativeElement as HTMLElement).getAttribute('align')).toBe('bottom');
  });

  it('should set the disabled attribute', () => {
    expect(bulletsComponent.disabled()).toBeFalse();
    expect((bulletsComponentElement.nativeElement as HTMLElement).getAttribute('disabled')).toBe('false');

    // Change attribute value
    component.disabled = true;
    fixture.detectChanges();

    expect(bulletsComponent.disabled()).toBeTrue();
    expect((bulletsComponentElement.nativeElement as HTMLElement).getAttribute('disabled')).toBe('true');
  });

  it('should set the size input', () => {
    expect(bulletsComponent.size()).toBe(6);

    // Change size value
    component.size = 10;
    fixture.detectChanges();

    expect(bulletsComponent.size()).toBe(10);
  });

  it('should set the scrollBehavior input', () => {
    expect(bulletsComponent.scrollBehavior()).toBe('smooth');

    // Change size value
    component.scrollBehavior = 'auto';
    fixture.detectChanges();

    expect(bulletsComponent.scrollBehavior()).toBe('auto');
  });
});
