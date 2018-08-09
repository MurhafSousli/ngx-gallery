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
      <i *ngIf="loadingSvg; else thumbLoading" class="g-loading" [innerHTML]="loadingSvg"></i>
      <ng-template #thumbLoading>
        <div class="g-thumb-loading"></div>
      </ng-template>
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
    if (this.loadingIcon) {
      this.loadingSvg = this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon);
    }
  }

}
