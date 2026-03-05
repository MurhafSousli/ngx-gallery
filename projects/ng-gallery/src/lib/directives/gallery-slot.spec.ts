import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GalleryAlign, GallerySlot, GalleryPosition } from 'ng-gallery';

@Component({
  template: `
    <div [gallerySlot]="position()" [gallerySlotAlign]="align()" [gallerySlotJustify]="justify()"></div>
  `,
  imports: [GallerySlot]
})
class TestComponent {
  gallerySlot: Signal<GallerySlot> = viewChild(GallerySlot);

  position: WritableSignal<GalleryPosition | ''> = signal(null);
  align: WritableSignal<GalleryAlign> = signal('center');
  justify: WritableSignal<GalleryAlign> = signal('center');
}

describe('GallerySlot Directive', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    element = fixture.debugElement.query(By.directive(GallerySlot)).nativeElement;
  });

  it('should create the directive', () => {
    expect(component.gallerySlot()).toBeTruthy();
  });

  it('should apply default values when input is empty', () => {
    component.position.set('');
    fixture.detectChanges();

    const styles: CSSStyleDeclaration = getComputedStyle(element);
    expect(styles.gridArea).toBe('center');
  });

  it('should reflect signal changes to host styles', () => {
    component.position.set('top');
    component.align.set('start');
    component.justify.set('end');
    fixture.detectChanges();

    const styles: CSSStyleDeclaration = getComputedStyle(element);
    expect(styles.gridArea).toBe('top');
    expect(styles.alignSelf).toBe('start');
    expect(styles.justifySelf).toBe('end');
  });
});
