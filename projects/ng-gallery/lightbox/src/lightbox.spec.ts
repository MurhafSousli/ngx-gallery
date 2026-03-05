import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Signal, viewChild, signal, WritableSignal, ApplicationRef } from '@angular/core';
import { Gallery, GalleryItemData } from 'ng-gallery';
import { LightboxModule, Lightbox } from 'ng-gallery/lightbox';
import { img1, img2, img3 } from '../../src/lib/tests/test-images';

@Component({
  imports: [LightboxModule],
  template: `
    <ng-template lightbox [disableAnimation]="disableAnimation()" #lightbox="lightbox">
      <gallery [items]="items">
        <img *galleryItemDef="let item"
             galleryImage
             [src]="item.src"/>
      </gallery>
    </ng-template>
  `
})
export class TestComponent {
  items: GalleryItemData[] = [
    { src: img1 },
    { src: img2 },
    { src: img3 }
  ];

  disableAnimation: WritableSignal<boolean> = signal(false);
  lightboxGallery: Signal<Gallery> = viewChild(Gallery);
  lightbox: Signal<Lightbox> = viewChild(Lightbox);
}

describe('Lightbox component', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let lightbox: Lightbox;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.autoDetectChanges();
    component = fixture.componentInstance;
    lightbox = component.lightbox();
  });

  it('should create lightbox directive on init but it should NOT create lightbox dialog component yet', () => {
    expect(lightbox).toBeDefined();
    expect(lightbox.lightboxRef).toBeUndefined();
  });

  it('should open lightbox.showModal() should open gallery with initial index 0', async () => {
    lightbox.showModal();
    expect(lightbox.lightboxRef.instance).toBeDefined();
    expect(lightbox.initialIndex()).toBe(0);
    fixture.detectChanges();

    expect(component.lightboxGallery().resolvedInitialIndex()).toBe(0);
    await vi.waitFor(() => {
      expect(component.lightboxGallery().activeIndex()).toBe(0);
    });
  });

  it('should open the gallery in lightbox on the target initial index', async () => {
    // Open the lightbox at index 2
    lightbox.showModal(2);
    expect(lightbox.initialIndex()).toBe(2);
    fixture.detectChanges();

    expect(component.lightboxGallery().resolvedInitialIndex()).toBe(2);
    await vi.waitFor(() => {
      expect(component.lightboxGallery().activeIndex()).toBe(2);
    });
  });

  it('should destroy lightbox immediately when animations are disabled', async () => {
    component.disableAnimation.set(true);
    fixture.detectChanges();

    lightbox.showModal();
    const dialogEl: HTMLDialogElement = lightbox.lightboxRef.instance.dialogElement;
    const destroySpy = vi.spyOn(lightbox.lightboxRef, 'destroy');

    dialogEl.close();

    // The close happens async
    await vi.waitFor(() => {
      expect(destroySpy).toHaveBeenCalled();
    });
    expect(dialogEl.open).toBe(false);
  });

  it('should wait for transitionend before destroying when animations are enabled', async () => {
    component.disableAnimation.set(false);
    fixture.detectChanges();

    lightbox.showModal();
    const dialogEl: HTMLDialogElement = lightbox.lightboxRef.instance.dialogElement;
    const destroySpy = vi.spyOn(lightbox.lightboxRef, 'destroy');

    dialogEl.close();

    // Wait for the 'close' EVENT specifically to ensure the logic inside the 'close' listener has run
    await new Promise(resolve => dialogEl.addEventListener('close', resolve, { once: true }));

    expect(destroySpy).not.toHaveBeenCalled();

    // Trigger the event that signals the end of the animation
    dialogEl.dispatchEvent(new TransitionEvent('transitionend', { bubbles: true }));

    await vi.waitFor(() => {
      expect(destroySpy).toHaveBeenCalled();
    });
    expect(dialogEl.open).toBe(false);
  });

  it('should destroy immediately if user prefers reduced motion, regardless of input', async () => {
    // Mock matchMedia to return true for reduced motion
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any);

    fixture.componentRef.setInput('disableAnimation', false);
    fixture.detectChanges();

    lightbox.showModal();
    const dialogEl: HTMLDialogElement = lightbox.lightboxRef.instance.dialogElement;
    const destroySpy = vi.spyOn(lightbox.lightboxRef, 'destroy');

    dialogEl.close();

    // Should bypass transitionend because of prefers-reduced-motion
    await vi.waitFor(() => {
      expect(destroySpy).toHaveBeenCalled();
    });
    expect(dialogEl.open).toBe(false);

    vi.restoreAllMocks(); // Clean up matchMedia mock
  });

  it('should detach from AppRef and remove from DOM during destroy', async () => {
    const internalAppRef: ApplicationRef = (lightbox as any).appRef;
    const detachSpy = vi.spyOn(internalAppRef, 'detachView');

    // Setup: Disable animation for a synchronous test
    component.disableAnimation.set(true);
    fixture.detectChanges();

    lightbox.showModal();
    const dialogEl: HTMLDialogElement = lightbox.lightboxRef.instance.dialogElement;

    // Verify it's actually in the body
    expect(document.body).toContainElement(dialogEl);

    dialogEl.close();

    await vi.waitFor(() => {
      // Check if it was detached from Angular's change detection
      expect(detachSpy).toHaveBeenCalled();
    });
    // Check if the component ref was actually destroyed
    expect(lightbox.lightboxRef).toBeNull();
    // Check if it was removed from the physical DOM
    expect(document.body).not.toContainElement(dialogEl);
  });
});
