import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Gallery } from '../services/gallery.service';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

@Component({
  selector: 'gallery-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <i *ngIf="config.loop || state.hasPrev"
       class="g-nav-prev"
       aria-label="Previous"
       role="button"
       (click)="gallery.ref(this.galleryId).prev(config.navScrollBehavior)"
       [innerHtml]="navIcon"></i>

    <i *ngIf="config.loop || state.hasNext"
       class="g-nav-next"
       aria-label="Next"
       role="button"
       (click)="gallery.ref(this.galleryId).next(config.navScrollBehavior)"
       [innerHtml]="navIcon"></i>
  `
})
export class GalleryNavComponent implements OnInit {

  navIcon: SafeHtml;
  @Input() galleryId: string;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.navIcon = this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon);
  }
}
