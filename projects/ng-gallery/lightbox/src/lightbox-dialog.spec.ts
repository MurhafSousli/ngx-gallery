import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, viewChild, Signal, WritableSignal, signal } from '@angular/core';
import {
  Lightbox,
  LightboxDialog,
  LightboxModule,
  DialogClosePolicy
} from 'ng-gallery/lightbox';
import { DIALOG_CLOSEDBY_SUPPORTED } from './lightbox-closedby.token';

@Component({
  selector: 'lightbox-host',
  template: `
    <ng-template #basic lightbox
                 [panelClass]="class()"
                 [closedBy]="closedBy()"
                 [hideCloseButton]="hideCloseButton()"
                 [disableAnimation]="disableAnimation()"
                 [ariaLabel]="ariaLabel()"
                 [ariaLabelledBy]="ariaLabelledBy()">
      <div class="projected">Hello Lightbox</div>
    </ng-template>

    <ng-template #custom lightbox [closedBy]="closedBy()" [hideCloseButton]="hideCloseButton()">
      <div class="projected">Hello Lightbox</div>
      <button lightboxCloseButton id="custom-close-button" aria-label="Close modal">Custom Close Button</button>
    </ng-template>
  `,
  imports: [LightboxModule]
})
class TestComponent {
  closedBy: WritableSignal<DialogClosePolicy> = signal<DialogClosePolicy>('any');
  hideCloseButton: WritableSignal<boolean> = signal<boolean>(false);
  hasCustomCloseButton: WritableSignal<boolean> = signal<boolean>(false);
  disableAnimation: WritableSignal<boolean> = signal<boolean>(false);

  class: WritableSignal<string> = signal<string>(null);
  ariaLabel: WritableSignal<string> = signal<string>(null);
  ariaLabelledBy: WritableSignal<string> = signal<string>(null);

  lightbox: Signal<Lightbox> = viewChild.required('basic', { read: Lightbox });
  lightboxWithCustomButton: Signal<Lightbox> = viewChild.required('custom', { read: Lightbox });
}

describe('LightboxDialog', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let lightbox: Lightbox;
  let lightboxDialog: LightboxDialog;
  let dialogEl: HTMLDialogElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    lightbox = component.lightbox();
  });

  function showDialog(lb: Lightbox = lightbox) {
    lb.showModal();
    lightboxDialog = lb.lightboxRef.instance;
    dialogEl = lightboxDialog.dialogElement;
    fixture.detectChanges();
  }

  it('should show dialog with default options', () => {
    showDialog();
    expect(component).toBeDefined();
    expect(lightboxDialog.hideCloseButton).toBe(false);
    expect(dialogEl).toBeDefined();
    expect(dialogEl).toHaveAttribute('closedby', 'any');
    expect(dialogEl.className).toBeFalsy();
    expect(dialogEl).not.toHaveAttribute('aria-label');
    expect(dialogEl).not.toHaveAttribute('aria-labelledby');
    expect(dialogEl).not.toHaveAttribute('aria-describedby');
    expect(dialogEl).not.toHaveAttribute('animationDisabled');
    expect(dialogEl.open).toBe(true);
  });

  it('should render projected template', () => {
    showDialog();
    const content = dialogEl.querySelector('.projected');
    expect(content).toBeDefined();
    expect(content.textContent).toContain('Hello Lightbox');
  });

  it('should bind dialog attributes', () => {
    component.closedBy.set('closerequest');
    component.class.set('my-lightbox-dialog');
    component.ariaLabel.set('Image Gallery Modal');
    component.disableAnimation.set(true);
    fixture.detectChanges();
    showDialog();

    expect(dialogEl).toHaveAttribute('closedby', 'closerequest');
    expect(dialogEl).toHaveClass('my-lightbox-dialog');
    expect(dialogEl).toHaveAttribute('aria-label', 'Image Gallery Modal');
    expect(dialogEl).not.toHaveAttribute('aria-labelledby');
    expect(dialogEl).toHaveAttribute('animationDisabled');
  });

  it('should not add aria-label attribute if aria-labelledby is present', () => {
    component.ariaLabel.set('Image Gallery Modal');
    component.ariaLabelledBy.set('#gallery-title');
    component.disableAnimation.set(true);
    fixture.detectChanges();
    showDialog();

    expect(dialogEl).not.toHaveAttribute('aria-label');
    expect(dialogEl).toHaveAttribute('aria-labelledby', '#gallery-title');
  });

  it('should show default close button', () => {
    showDialog();
    const defaultCloseButton = dialogEl.querySelector('button[defaultCloseButton]');
    expect(defaultCloseButton).toBeDefined();
    expect(defaultCloseButton).toHaveClass('g-panel', 'g-button', 'g-close-button');
    expect(defaultCloseButton).toHaveAttribute('aria-label','Close gallery');
  });

  it('should hide default close button when hideCloseButton=true', () => {
    component.hideCloseButton.set(true);
    fixture.detectChanges();
    showDialog();

    const btn = dialogEl.querySelector('button[defaultCloseButton]');
    expect(btn).toBeNull();
  });

  it('should hide default close button when custom exists', () => {
    component.hasCustomCloseButton.set(true);
    fixture.detectChanges();
    showDialog(component.lightboxWithCustomButton());

    const defaultBtn = dialogEl.querySelector('button[defaultCloseButton]');
    expect(defaultBtn).toBeNull();

    const customBtn = dialogEl.querySelector('button#custom-close-button');
    expect(customBtn).toBeDefined();
    expect(customBtn).toHaveAttribute('aria-label', 'Close modal');
  });

  it('default close button should call dialog.close()', () => {
    showDialog();
    vi.spyOn(dialogEl, 'close');

    const btn = dialogEl.querySelector('[defaultCloseButton]') as HTMLButtonElement;
    btn.click();

    expect(dialogEl.close).toHaveBeenCalled();
  });

  function setupSafariFallback() {
    TestBed.resetTestingModule();
    TestBed.overrideProvider(DIALOG_CLOSEDBY_SUPPORTED, { useValue: false });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    lightbox = component.lightbox();
  }

  it('fallback: backdrop click closes dialog when closedBy is unsupported', () => {
    setupSafariFallback();
    showDialog();

    const closeSpy = vi.spyOn(dialogEl, 'close');

    // Mock the dialog dimensions (e.g., a centered 100x100 slot)
    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100, right: 200, top: 100, bottom: 200
    } as DOMRect);

    // Simulate click on the backdrop (e.g., at coordinates 10, 10)
    dialogEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    dialogEl.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 50, // Outside
      clientY: 50,
      button: 0
    }));

    expect(closeSpy).toHaveBeenCalled();
  });

  it('fallback: does NOT close when clicking inside the dialog content', () => {
    setupSafariFallback();

    component.closedBy.set('any');
    fixture.detectChanges();
    showDialog();

    const closeSpy = vi.spyOn(dialogEl, 'close');

    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100, right: 300, top: 100, bottom: 300
    } as DOMRect);

    dialogEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    // Click at 200, 200 (Dead center of the dialog)
    dialogEl.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 200,
      clientY: 200,
      button: 0
    }));

    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('fallback: does NOT close on backdrop click if closedBy is "closerequest"', () => {
    setupSafariFallback();

    component.closedBy.set('closerequest'); // Policy that prevents backdrop close
    fixture.detectChanges();
    showDialog();

    const closeSpy = vi.spyOn(dialogEl, 'close');

    vi.spyOn(dialogEl, 'getBoundingClientRect').mockReturnValue({
      left: 100, right: 300, top: 100, bottom: 300
    } as DOMRect);

    dialogEl.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    // Click outside at 50, 50
    dialogEl.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      clientX: 50,
      clientY: 50,
      button: 0
    }));

    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should abort listeners on destroy', () => {
    showDialog();
    const abortSpy = vi.spyOn((lightboxDialog as any).destroyer, 'abort');

    fixture.destroy();
    expect(abortSpy).toHaveBeenCalled();
  });
});
