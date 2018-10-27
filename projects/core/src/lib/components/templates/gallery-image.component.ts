import { Component, Input, HostBinding, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'gallery-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [lazyImage]="src" (loaded)="loadedImage = trustCss($event)" (error)="error.emit($event)">
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

  loadedImage: SafeStyle;
  loadingSvg: SafeHtml;

  @Input() src: string;
  @Input() loadingIcon: string;

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<Error>();

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

  trustCss(imageUrl: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(imageUrl);
  }

}
