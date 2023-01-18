import { Component, Input, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'gallery-iframe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <iframe *ngIf="autoplay; else default"
            #iframe
            [attr.loading]="loadingAttr"
            allowfullscreen
            allow
            style="border:none"
            [src]="iframeSrc">
    </iframe>
    <ng-template #default>
      <iframe #iframe
              [attr.loading]="loadingAttr"
              allowfullscreen
              style="border:none"
              [src]="iframeSrc">
      </iframe>
    </ng-template>
  `
})
export class GalleryIframeComponent {

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

  constructor(private _sanitizer: DomSanitizer) {
  }
}
