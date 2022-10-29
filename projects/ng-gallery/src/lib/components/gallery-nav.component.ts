import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GalleryComponent } from './gallery.component';
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
       (click)="gallery.prev()"
       [innerHtml]="navIcon"></i>

    <i *ngIf="config.loop || state.hasNext"
       class="g-nav-next"
       aria-label="Next"
       role="button"
       (click)="gallery.next()"
       [innerHtml]="navIcon"></i>
  `
})
export class GalleryNavComponent implements OnInit {

  navIcon: SafeHtml;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: GalleryComponent, private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.navIcon = this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon);
  }
}
