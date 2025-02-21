import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement, Signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  GalleryThumbsComponent,
  GalleryComponent,
  GalleryItem,
  GalleryItemDef,
  GalleryRef,
  ImgRecognizer
} from 'ng-gallery';
import { img1, img2, img3 } from './test-images';

@Component({
  imports: [GalleryComponent, GalleryThumbsComponent, GalleryItemDef, ImgRecognizer],
  template: `
    <gallery [items]="items" [style.width.px]="width" [style.height.px]="height">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>

      <gallery-thumbs [position]="position"
                      [centralized]="centralized"
                      [imageSize]="imageSize"
                      [autosize]="autosize"
                      [thumbWidth]="thumbWidth"
                      [thumbHeight]="thumbHeight"
                      [disabled]="disabled"
                      [disableScroll]="scrollDisabled"/>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItem[] = [
    { src: img1, thumb: img1 },
    { src: img2, thumb: img2 },
    { src: img3, thumb: img3 }
  ];
  width: number = 500;
  height: number = 300;

  scrollBehavior: ScrollBehavior = 'smooth';
  position: 'top' | 'left' | 'right' | 'bottom' = 'bottom';
  imageSize: 'cover' | 'contain' = 'cover';
  centralized: boolean = false;
  autosize: boolean = false;
  disabled: boolean = false;
  scrollDisabled: boolean = false;
  thumbWidth: number = 60;
  thumbHeight: number = 60;

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);
}

describe('Gallery thumbs component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let thumbsComponent: GalleryThumbsComponent;
  let galleryRef: GalleryRef;
  let thumbsComponentElement: DebugElement;

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

    thumbsComponentElement = fixture.debugElement.query(By.directive(GalleryThumbsComponent));
    thumbsComponent = thumbsComponentElement.injector.get(GalleryThumbsComponent);
    galleryRef = thumbsComponentElement.injector.get(GalleryRef);
  });

  it('should create gallery-thumbs component', () => {
    expect(thumbsComponent).toBeTruthy();
    expect(galleryRef).toBeTruthy();
  });

  it('should set the orientation', () => {
    component.position = 'bottom';
    fixture.detectChanges();
    expect(thumbsComponent.orientation()).toBe('horizontal');
    expect((thumbsComponentElement.nativeElement as HTMLElement).style.getPropertyValue('grid-area')).toBe('bottom');

    component.position = 'left';
    fixture.detectChanges();
    expect(thumbsComponent.orientation()).toBe('vertical');
    expect((thumbsComponentElement.nativeElement as HTMLElement).style.getPropertyValue('grid-area')).toBe('left');

    component.position = 'top';
    fixture.detectChanges();
    expect(thumbsComponent.orientation()).toBe('horizontal');
    expect((thumbsComponentElement.nativeElement as HTMLElement).style.getPropertyValue('grid-area')).toBe('top');

    component.position = 'right';
    fixture.detectChanges();
    expect(thumbsComponent.orientation()).toBe('vertical');
    expect((thumbsComponentElement.nativeElement as HTMLElement).style.getPropertyValue('grid-area')).toBe('right');
  });

  it('should set the imageSize attribute', () => {
    component.imageSize = 'cover';
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('imageSize')).toBe('cover');

    component.imageSize = 'contain';
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('imageSize')).toBe('contain');
  });

  it('should set the autosize attribute', () => {
    component.autosize = false;
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('autosize')).toBe('false');

    component.autosize = true;
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('autosize')).toBe('true');
  });

  it('should set the disabled attribute', () => {
    component.disabled = false;
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('disabled')).toBe('false');

    component.disabled = true;
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('disabled')).toBe('true');
  });

  it('should set the scrollDisabled attribute', () => {
    component.scrollDisabled = false;
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('scrollDisabled')).toBe('false');

    component.scrollDisabled = true;
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).getAttribute('scrollDisabled')).toBe('true');
  });

  it('should set the thumbWidth and thumbHeight CSS variable', () => {
    component.thumbWidth = 100;
    component.thumbHeight = 100;
    fixture.detectChanges();
    expect((thumbsComponentElement.nativeElement as HTMLElement).style.getPropertyValue('--g-thumb-width')).toBe('100px');
    expect((thumbsComponentElement.nativeElement as HTMLElement).style.getPropertyValue('--g-thumb-height')).toBe('100px');
  });
});
