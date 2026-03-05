import {
  Directive,
  input,
  inject,
  signal,
  createComponent,
  booleanAttribute,
  OnDestroy,
  TemplateRef,
  InputSignal,
  ComponentRef,
  WritableSignal,
  ApplicationRef,
  EnvironmentInjector,
  InputSignalWithTransform
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GALLERY_A11Y_OPTIONS, GALLERY_INITIAL_INDEX, GalleryA11yOptions } from 'ng-gallery';
import { LIGHTBOX_OPTIONS, LightboxOptions, DialogClosePolicy } from './lightbox.model';
import { LightboxDialog } from './lightbox-dialog';

@Directive({
  selector: '[lightbox]',
  exportAs: 'lightbox',
  providers: [
    {
      provide: GALLERY_INITIAL_INDEX,
      /* v8 ignore next -- @preserve */
      useFactory: () => inject(Lightbox).initialIndex
    }
  ]
})
export class Lightbox implements OnDestroy {
  /**
   * Gallery default config
   */
  private readonly defaultOptions: LightboxOptions = inject(LIGHTBOX_OPTIONS);

  private readonly defaultA11yOptions: GalleryA11yOptions = inject(GALLERY_A11Y_OPTIONS);

  private readonly document: Document = inject(DOCUMENT);
  private readonly appRef: ApplicationRef = inject(ApplicationRef);
  private readonly templateRef: TemplateRef<any> = inject(TemplateRef);
  private readonly environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);

  /** Initial index of the gallery. */
  readonly initialIndex: WritableSignal<number> = signal<number>(0);

  /** Determines if the dialog closes via backdrop click, escape key, or only via close button. */
  readonly closedBy: InputSignal<DialogClosePolicy> = input<DialogClosePolicy>(this.defaultOptions.closedBy);

  /** Custom CSS classes to apply to the dialog element */
  readonly panelClass: InputSignal<string | string[]> = input<string | string[]>(this.defaultOptions.panelClass);

  /** Accessible label for the dialog when a visible label is not present */
  readonly ariaLabel: InputSignal<string> = input<string>(this.defaultA11yOptions.lightboxLabel);

  /** Identifies the element that labels the dialog for screen readers */
  readonly ariaLabelledBy: InputSignal<string> = input<string>();

  /**
   * Whether to hide the default close button.
   * If true, you must provide a custom close mechanism within the template.
   */
  readonly hideCloseButton: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.hideCloseButton, {
    transform: booleanAttribute
  });

  /**
   * Whether to disable opening and closing animations.
   * Respects user 'prefers-reduced-motion' settings automatically.
   */
  readonly disableAnimation: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(this.defaultOptions.disableAnimation, {
    transform: booleanAttribute
  });

  lightboxRef: ComponentRef<LightboxDialog>;

  showModal(i: number = 0): void {
    this.initialIndex.set(i);

    // Create the lightbox component
    this.lightboxRef = createComponent(LightboxDialog, {
      environmentInjector: this.environmentInjector
    });
    this.lightboxRef.instance.templateRef = this.templateRef;
    this.lightboxRef.instance.closedBy = this.closedBy();
    this.lightboxRef.instance.hideCloseButton = this.hideCloseButton();
    this.lightboxRef.instance.disableAnimation = this.disableAnimation();
    this.lightboxRef.instance.class = this.panelClass();
    this.lightboxRef.instance.ariaLabel = this.ariaLabel();
    this.lightboxRef.instance.ariaLabelledBy = this.ariaLabelledBy();
    const dialogElement: HTMLDialogElement = this.lightboxRef.instance.dialogElement;

    this.appRef.attachView(this.lightboxRef.hostView);
    this.document.body.appendChild(this.lightboxRef.location.nativeElement);

    // Open dialog
    dialogElement.showModal();

    // Cleanup on close
    dialogElement.addEventListener('close', () => {
      // Only wait for transition if animations are NOT disabled
      // and the user doesn't prefer reduced motion
      const prefersReduced: boolean = this.document.defaultView.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.disableAnimation() || prefersReduced) {
        this.destroy();
      } else {
        dialogElement.addEventListener('transitionend', () => this.destroy(), { once: true });
      }
    }, { once: true });
  }

  private destroy(): void {
    if (!this.lightboxRef) return;
    this.appRef.detachView(this.lightboxRef.hostView);
    this.lightboxRef.destroy();
    this.lightboxRef = null;
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
