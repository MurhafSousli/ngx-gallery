import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryItemComponent } from '../models';

@Component({
  selector: 'iframe-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <iframe frameborder="0"
            allowfullscreen
            [src]="sanitizer.bypassSecurityTrustResourceUrl(data?.src)"></iframe>
  `,
  styles: [`
    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `]
})
export class IframeItemComponent implements GalleryItemComponent {

  @Input() data;

  constructor(public sanitizer: DomSanitizer) {
  }
}
