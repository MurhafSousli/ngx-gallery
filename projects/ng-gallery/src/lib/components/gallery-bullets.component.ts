import {
  Component,
  inject,
  numberAttribute,
  booleanAttribute,
  input,
  InputSignal,
  ChangeDetectionStrategy,
  InputSignalWithTransform
} from '@angular/core';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  selector: 'gallery-bullets',
  host: {
    '[attr.align]': 'align()',
    '[attr.disabled]': 'disabled()'
  },
  template: `
    @for (item of galleryRef.items(); track i; let i = $index) {
      <div class="g-bullet"
           [class.g-bullet-active]="i === galleryRef.currIndex()"
           [style.width.px]="size()"
           [style.height.px]="size()"
           (click)="disabled() ? null : galleryRef.set(i, scrollBehavior())">
        <div class="g-bullet-inner"></div>
      </div>
    }
  `,
  styleUrl: './gallery-bullets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryBulletsComponent {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly scrollBehavior: InputSignal<ScrollBehavior> = input<ScrollBehavior>('smooth');

  /**
   * Align bullets
   */
  readonly align: InputSignal<'top' | 'bottom'> = input<'top' | 'bottom'>('top');

  /**
   * Disables thumbnails' clicks
   */
  readonly disabled: InputSignalWithTransform<boolean, string | boolean> = input<boolean, string | boolean>(false, {
    transform: booleanAttribute
  });


  /**
   * Disables thumbnails' clicks
   */
  readonly size: InputSignalWithTransform<number, string | number> = input<number, string | number>(6, {
    transform: numberAttribute
  });
}
