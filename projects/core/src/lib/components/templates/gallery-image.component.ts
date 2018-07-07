import { Component, Input, HostBinding, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'gallery-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [lazyImage]="src" (loaded)="loadedImage = $event">
      <div *ngIf="loadedImage; else loading"
           class="g-image-item"
           [style.backgroundImage]="loadedImage"></div>
    </ng-container>

    <ng-template #loading>
      <i *ngIf="loadingSvg" class="g-loading" [innerHTML]="loadingSvg"></i>
    </ng-template>
  `
})
export class GalleryImageComponent implements OnInit {

  loadedImage: string;
  loadingSvg: SafeHtml;

  @Input() src: string;
  @Input() loadingIcon: string;

  @HostBinding('class.g-image-loaded') get imageLoaded() {
    return !!this.loadedImage;
  }

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.loadingSvg = this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon);
  }

}
