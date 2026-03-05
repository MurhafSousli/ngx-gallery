import { Component, DebugElement, ElementRef, Signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Gallery } from 'ng-gallery';
import { LightboxModule, Lightbox, LightboxFor } from 'ng-gallery/lightbox';

@Component({
  imports: [LightboxModule],
  template: `
    <ng-template lightbox #lightbox="lightbox" disableAnimation>
      <gallery [items]="items">
        <div *galleryItemDef="let item"></div>
      </gallery>
    </ng-template>

    <button [lightboxFor]="lightbox">Open Lightbox</button>
  `
})
export class lightboxForBasicComponent {
  items = ['1', '2', '3'];
  lightbox: Signal<Lightbox> = viewChild(Lightbox);
  lightboxFor: Signal<LightboxFor> = viewChild(LightboxFor);
  lightboxForElement: Signal<ElementRef<HTMLButtonElement>> = viewChild(LightboxFor, { read: ElementRef });
}

@Component({
  imports: [LightboxModule],
  template: `
    <ng-template lightbox #lightbox="lightbox" disableAnimation>
      <gallery #lightboxGallery [items]="items">
        <div *galleryItemDef="let item"></div>
      </gallery>
    </ng-template>

    <gallery [items]="items">
      <div gallerySlot>
        <button [lightboxFor]="lightbox">OPEN</button>
      </div>
      <div *galleryItemDef="let item"></div>
    </gallery>
  `
})
export class lightboxForWithGalleryParentComponent {
  items = ['1', '2', '3'];

  lightboxGallery: Signal<Gallery> = viewChild('lightboxGallery');
  lightbox: Signal<Lightbox> = viewChild(Lightbox);
  lightboxForElement: Signal<ElementRef<HTMLButtonElement>> = viewChild(LightboxFor, { read: ElementRef });
}

describe('LightboxFor directive', () => {
  describe('Basic usage', () => {
    let fixture: ComponentFixture<lightboxForBasicComponent>;
    let component: lightboxForBasicComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(lightboxForBasicComponent);
      fixture.autoDetectChanges();
      component = fixture.componentInstance;
    });

    it('should create lightbox directive on init but it should NOT create lightbox dialog component', () => {
      expect(component.lightbox()).toBeDefined();
      expect(component.lightbox().lightboxRef).toBeUndefined();
      expect(component.lightboxFor()).toBeDefined();
    });

    it('should open lightbox by trigger button click', async () => {
      const showModalSpy = vi.spyOn(component.lightbox(), 'showModal');
      component.lightboxForElement().nativeElement.click();

      expect(showModalSpy).toHaveBeenCalledExactlyOnceWith(0);
      expect(component.lightbox().lightboxRef.instance).toBeDefined();
      expect(component.lightbox().initialIndex()).toBe(0);
    });
  });

  describe('LightboxFor button inside gallery component', () => {
    let fixture: ComponentFixture<lightboxForWithGalleryParentComponent>;
    let component: lightboxForWithGalleryParentComponent;
    let gallery: Gallery;

    beforeEach(() => {
      fixture = TestBed.createComponent(lightboxForWithGalleryParentComponent);
      fixture.autoDetectChanges();
      component = fixture.componentInstance;

      const galleryDebugElement: DebugElement = fixture.debugElement.query(By.directive(Gallery));
      gallery = galleryDebugElement.componentInstance;
    });

    it('should open lightbox by trigger button click', async () => {
      gallery.goTo({ index: 1, behavior: 'auto' });
      await vi.waitUntil(() => gallery.activeIndex() === 1);

      const showModalSpy = vi.spyOn(component.lightbox(), 'showModal');
      component.lightboxForElement().nativeElement.click();

      expect(showModalSpy).toHaveBeenCalledExactlyOnceWith(1);
      expect(component.lightbox().lightboxRef.instance).toBeDefined();
      expect(component.lightbox().initialIndex()).toBe(1);
      fixture.detectChanges();

      expect(component.lightboxGallery().resolvedInitialIndex()).toBe(1);
      await vi.waitFor(() => {
        expect(component.lightboxGallery().activeIndex()).toBe(1);
      });
    });
  });
});
