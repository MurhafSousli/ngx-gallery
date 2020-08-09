import { Component, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'gallery-iframe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <iframe #iframe
            frameborder="0"
            allowfullscreen
            [attr.allow]="autoplay ? 'autoplay' : ''"
            [src]="iframeSrc">
    </iframe>
  `
})
export class GalleryIframeComponent {

  iframeSrc: SafeResourceUrl;

  @Input('src') set src(src: string) {
    this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  @Input('pause') set pauseVideo(shouldPause: boolean) {
    if (this.iframe.nativeElement) {
      if (shouldPause) {
        const iframe: HTMLIFrameElement = this.iframe.nativeElement;
        iframe.src = null;
      }
    }
  }

  @Input() autoplay: boolean;

  @ViewChild('iframe', { static: true }) iframe: ElementRef;

  constructor(private _sanitizer: DomSanitizer) {
  }
}
