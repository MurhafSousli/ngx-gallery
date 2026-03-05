import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement, Signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  GalleryNavComponent,
  GalleryComponent,
  GalleryItemData,
  GalleryItemDef,
  GalleryRef,
  ImgRecognizer
} from 'ng-gallery';
import { img1, img2, img3 } from '../tests/test-images';
import { Dir, Direction } from '@angular/cdk/bidi';

@Component({
  imports: [GalleryComponent, Dir, GalleryNavComponent, GalleryItemDef, ImgRecognizer],
  template: `
    <gallery [dir]="dir" [items]="items" [style.width.px]="width" [style.height.px]="height">
      <img *galleryItemDef="let item"
           galleryImage
           [src]="item.src"/>

      <gallery-nav [scrollBehavior]="scrollBehavior"/>
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

  scrollBehavior: ScrollBehavior = 'smooth';
  dir: Direction = 'ltr';

  gallery: Signal<GalleryComponent> = viewChild(GalleryComponent);
}

describe('Gallery nav component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let navComponent: GalleryNavComponent;
  let galleryRef: GalleryRef;
  let navComponentElement: DebugElement;

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

    navComponentElement = fixture.debugElement.query(By.directive(GalleryNavComponent));
    navComponent = navComponentElement.injector.get(GalleryNavComponent);
    galleryRef = navComponentElement.injector.get(GalleryRef);
  });

  it('should create gallery-nav component', () => {
    expect(navComponent).toBeTruthy();
    expect(galleryRef).toBeTruthy();
    expect(navComponent.dir).toBeTruthy();
    expect(navComponent.navIcon()).toBeTruthy();
  });

  it('should set dir attribute', () => {
    expect((navComponentElement.nativeElement as HTMLElement).getAttribute('dir')).toBe('ltr');

    component.dir = 'rtl';
    fixture.detectChanges();

    expect((navComponentElement.nativeElement as HTMLElement).getAttribute('dir')).toBe('rtl');
  });

  it('should set the scrollBehavior input', () => {
    expect(navComponent.scrollBehavior()).toBe('smooth');

    // Change size value
    component.scrollBehavior = 'auto';
    fixture.detectChanges();

    expect(navComponent.scrollBehavior()).toBe('auto');
  });
});
