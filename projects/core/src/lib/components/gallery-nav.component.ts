import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GalleryState, GalleryConfig } from '../models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'gallery-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <i *ngIf="config.loop || state.hasPrev"
       class="g-nav-prev"
       aria-label="Previous"
       (tapClick)="action.emit('prev')"
       [innerHtml]="navIcon"></i>

    <i *ngIf="config.loop || state.hasNext"
       class="g-nav-next"
       aria-label="Next"
       (tapClick)="action.emit('next')"
       [innerHtml]="navIcon"></i>
  `
})
export class GalleryNavComponent implements OnInit {

  navIcon: SafeHtml;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() action = new EventEmitter<string>();

  constructor(private _sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.navIcon = this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon);
  }
}
