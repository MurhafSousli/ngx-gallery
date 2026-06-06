import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, signal, Signal, viewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Gallery, GalleryModule, GalleryItemData, GalleryNav } from 'ng-gallery';
import { img1, img2, img3 } from '../tests/test-images';

@Component({
  imports: [GalleryModule],
  template: `
    <gallery [items]="items"
             [style.width.px]="500"
             [style.height.px]="300"
             loop>
      <div *galleryItemDef="let item"></div>

      <gallery-nav>
        <button galleryNavButton="next" [disabled]="disabled()">Next</button>
        <button galleryNavButton="prev" [disabled]="disabled()">Prev</button>
      </gallery-nav>
    </gallery>
  `
})
export class TestComponent {
  items: GalleryItemData[] = [
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ];

  disabled = signal(false);

  gallery: Signal<Gallery> = viewChild(Gallery);
}

describe('Gallery nav buttons', () => {
  let fixture: ComponentFixture<TestComponent>;
  let navComponent: GalleryNav;
  let navComponentElement: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();

    navComponentElement = fixture.debugElement.query(By.directive(GalleryNav));
    navComponent = navComponentElement.injector.get(GalleryNav);
  });

  it('should create gallery-nav component with custom buttons', () => {
    expect(navComponent).toBeTruthy();
    const nextButton: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="next"]'));
    const prevButton: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="prev"]'));
    expect(nextButton.componentInstance).toBeDefined();
    expect(prevButton.componentInstance).toBeDefined();

    expect(nextButton.nativeElement).toHaveClass('g-nav-button', 'g-nav-next');
    expect(prevButton.nativeElement).toHaveClass('g-nav-button', 'g-nav-prev');

    expect(nextButton.nativeElement).toHaveTextContent('Next');
    expect(prevButton.nativeElement).toHaveTextContent('Prev');
  });

  it('should disable nav buttons', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();

    const nextButton: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="next"]'));
    const prevButton: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="prev"]'));

    expect(nextButton.nativeElement).toBeDisabled();
    expect(prevButton.nativeElement).toBeDisabled();
  });
});


@Component({
  imports: [GalleryModule],
  template: `
    <gallery [items]="items"
             [style.width.px]="500"
             [style.height.px]="300"
             loop>
      <div *galleryItemDef="let item"></div>

      <div gallerySlot="bottom">
        <button galleryNavButton="next">Next</button>
        <button galleryNavButton="prev">Prev</button>
      </div>
    </gallery>
  `
})
export class TestWithGallerySlotComponent {
  items: GalleryItemData[] = [
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ];
  width: number = 500;
  height: number = 300;

  gallery: Signal<Gallery> = viewChild(Gallery);
}

describe('Gallery nav buttons with gallerySlot', () => {
  let fixture: ComponentFixture<TestWithGallerySlotComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWithGallerySlotComponent);
    fixture.autoDetectChanges();
  });

  it('should create gallery-nav component with custom buttons', () => {
    const nextButton: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="next"]'));
    const prevButton: DebugElement = fixture.debugElement.query(By.css('[galleryNavButton="prev"]'));

    expect(nextButton.componentInstance).toBeDefined();
    expect(prevButton.componentInstance).toBeDefined();
  });
});

