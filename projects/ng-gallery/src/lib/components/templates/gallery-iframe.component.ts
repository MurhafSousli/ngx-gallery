import { Component, Input, ViewChild, inject, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'gallery-iframe',
  template: `
    @if (autoplay) {
      <iframe #iframe
              [attr.loading]="loadingAttr"
              allowfullscreen
              allow
              style="border:none"
              [src]="iframeSrc">
      </iframe>
    } @else {
      <iframe #iframe
              [attr.loading]="loadingAttr"
              allowfullscreen
              style="border:none"
              [src]="iframeSrc">
      </iframe>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryIframeComponent {

  private _sanitizer: DomSanitizer = inject(DomSanitizer);

  iframeSrc: SafeResourceUrl;
  videoSrc: string;

  @Input('src') set src(src: string) {
    this.videoSrc = src;
    this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  @Input('pause') set pauseVideo(shouldPause: boolean) {
    if (this.iframe?.nativeElement) {
      if (shouldPause) {
        const iframe: HTMLIFrameElement = this.iframe.nativeElement;
        iframe.src = null;

        if (!this.autoplay && this.videoSrc) {
          this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(this.videoSrc);
        }
      }
    }
  }

  @Input() autoplay: boolean;

  @Input() loadingAttr: 'eager' | 'lazy';

  @ViewChild('iframe') iframe: ElementRef;
}
