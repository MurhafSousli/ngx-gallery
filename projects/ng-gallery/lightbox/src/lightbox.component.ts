import { Component, viewChild, contentChild, Signal, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { GalleryComponent } from 'ng-gallery';

@Component({
  selector: 'lightbox',
  template: `
    <dialog #dialogElement>
      <button class="g-btn-close" aria-label="Close" (click)="close()">Close</button>

      <ng-content select="gallery"/>
    </dialog>
  `,
  styleUrl: './lightbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxComponent {

  dialog: Signal<ElementRef<HTMLDialogElement>> = viewChild('dialogElement');

  gallery: Signal<GalleryComponent> = contentChild(GalleryComponent);

  showModal(i: number): void {
    this.gallery().set(i, 'auto');
    this.dialog().nativeElement.showModal();
  }

  close(): void {
    this.dialog().nativeElement.close();
  }
}
