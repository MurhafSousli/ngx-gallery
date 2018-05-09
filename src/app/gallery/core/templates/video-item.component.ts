import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GalleryItemComponent } from '../models';

@Component({
  selector: 'video-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <video controls
           [src]="sanitizer.bypassSecurityTrustResourceUrl(data?.src)"
           [poster]="sanitizer.bypassSecurityTrustResourceUrl(data?.poster)"></video>
  `,
  styles: [`
    video {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `]
})
export class VideoItemComponent implements GalleryItemComponent {

  @Input() data: any;

  constructor(public sanitizer: DomSanitizer) {
  }
}
