import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GalleryModule, Gallery, GalleryPosition, GalleryDock } from 'ng-gallery';
import { GalleryLayoutDirective } from './gallery-layout';

@Component({
  imports: [GalleryModule],
  template: `
    <gallery>
      <img *galleryItemDef="let item" [src]="item.src"/>

      @for (pos of thumbPositions(); track pos) {
        <gallery-thumbs [position]="pos" [floating]="thumbsFloating()">
          <div *galleryItemDef="let item"></div>
        </gallery-thumbs>
      }

      @for (pos of boxPositions(); track pos) {
        <div [gallerySlot]="pos"></div>
      }
    </gallery>
  `
})
export class TestComponent {
  thumbPositions = signal<GalleryDock[]>([]);
  thumbsFloating = signal(false);
  boxPositions = signal<GalleryPosition[]>([]);
}

describe('Gallery Grid Template Logic', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let galleryLayout: GalleryLayoutDirective;
  let galleryLayoutElement: HTMLElement;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugEl = fixture.debugElement.query(By.directive(Gallery));
    galleryLayout = debugEl.injector.get(GalleryLayoutDirective);
    galleryLayoutElement = debugEl.nativeElement;
  });

  /** 1. DEFAULT STATE */
  it('should render a 1x1 grid when no children are present', () => {
    const expected = '"center" minmax(0, 1fr) / minmax(0, 1fr)';
    expect(galleryLayout.gridTemplate()).toBe(expected);
  });

  /** 2. SINGLE DOCK TESTS */
  it('should add a row for top dock', () => {
    component.boxPositions.set(['top']);
    fixture.detectChanges();

    const expected =
      '"top" auto\n' +
      '"center" minmax(0, 1fr) / minmax(0, 1fr)';
    expect(galleryLayout.gridTemplate()).toBe(expected);
  });

  it('should add a column for start (left) dock', () => {
    component.thumbPositions.set(['start']);
    fixture.detectChanges();

    const expected = '"start center" minmax(0, 1fr) / auto minmax(0, 1fr)';
    expect(galleryLayout.gridTemplate()).toBe(expected);
  });

  /** 3. FLOATING VS DOCKED */
  it('should ignore thumbs when floating is true', () => {
    component.thumbPositions.set(['start', 'top']);
    component.thumbsFloating.set(true);
    fixture.detectChanges();

    // Should stay 1x1 because floating elements don't occupy docks
    expect(galleryLayout.gridTemplate()).toBe('"center" minmax(0, 1fr) / minmax(0, 1fr)');
  });

  /** 4. MULTI-CHILD DOCK CONSOLIDATION */
  it('should not duplicate rows if multiple elements occupy the same dock', () => {
    component.thumbPositions.set(['bottom']);
    component.boxPositions.set(['bottom']);
    fixture.detectChanges();

    const expected =
      '"center" minmax(0, 1fr)\n' +
      '"bottom" auto / minmax(0, 1fr)';
    expect(galleryLayout.gridTemplate()).toBe(expected);
  });

  /** 5. THE "CORNER" LOGIC (Empty cells) */
  it('should insert dots in corners when horizontal and vertical docks coexist', () => {
    // Top and Start occupied
    component.thumbPositions.set(['top']);
    component.boxPositions.set(['start']);
    fixture.detectChanges();

    // Row 1: dot for the start column, 'top' for center
    // Row 2: 'start' area, 'center' area
    const expected =
      '"top top" auto\n' +
      '"start center" minmax(0, 1fr) / auto minmax(0, 1fr)';
    expect(galleryLayout.gridTemplate()).toBe(expected);
  });

  /** 6. THE FULL 3x3 GRID */
  it('should handle all docks simultaneously with correct corner dots', () => {
    component.thumbPositions.set(['top', 'bottom']);
    component.boxPositions.set(['start', 'end']);
    fixture.detectChanges();


    const expected =
      '"top top top" auto\n' +
      '"start center end" minmax(0, 1fr)\n' +
      '"bottom bottom bottom" auto / auto minmax(0, 1fr) auto';

    expect(galleryLayout.gridTemplate()).toBe(expected);
  });

  /** 7. DOM ATTRIBUTE SYNC */
  it('should sync gridTemplate signal to the host element style', () => {
    component.boxPositions.set(['end']);
    fixture.detectChanges();

    // Check the actual computed style on the element
    // Note: browsers might normalize spaces, so we check inclusion or use signal directly
    const style = galleryLayoutElement.style.gridTemplate;
    expect(style).toContain('center');
    expect(style).toContain('end');
  });

  it('should treat a dock as occupied only once if multiple elements share it', () => {
    // Both occupy 'bottom'
    component.thumbPositions.set(['bottom']);
    component.boxPositions.set(['bottom']);
    fixture.detectChanges();

    const expected =
      '"center" minmax(0, 1fr)\n' +
      '"bottom" auto / minmax(0, 1fr)';

    expect(galleryLayout.gridTemplate()).toBe(expected);
  });
});
