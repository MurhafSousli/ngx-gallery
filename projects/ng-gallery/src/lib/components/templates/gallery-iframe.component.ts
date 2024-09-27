import {
  Component,
  inject,
  computed,
  input,
  viewChild,
  Signal,
  ElementRef,
  InputSignal,
  ChangeDetectionStrategy
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'gallery-iframe',
  template: `
    @if (autoplay()) {
      <iframe #iframe
              [attr.loading]="loadingAttr()"
              allowfullscreen
              allow
              style="border:none"
              [src]="iframeSrc()">
      </iframe>
    } @else {
      <iframe #iframe
              [attr.loading]="loadingAttr()"
              allowfullscreen
              style="border:none"
              [src]="iframeSrc()">
      </iframe>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryIframeComponent {

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  iframeSrc: Signal<SafeResourceUrl> = computed(() => {
    if (this.pause()) {
      return null;
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.src());
  });

  src: InputSignal<string> = input<string>();

  pause: InputSignal<boolean> = input<boolean>();

  autoplay: InputSignal<boolean> = input<boolean>();

  loadingAttr: InputSignal<'eager' | 'lazy'> = input();

  iframe: Signal<ElementRef<HTMLIFrameElement>> = viewChild<ElementRef<HTMLIFrameElement>>('iframe');
}
