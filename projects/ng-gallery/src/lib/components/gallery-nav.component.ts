import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Directionality } from '@angular/cdk/bidi';
import { Gallery } from '../services/gallery.service';
import { GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

@Component({
  selector: 'gallery-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gallery-nav.scss'],
  template: `
    <i *ngIf="config.loop || state.hasPrev"
       class="g-nav-prev"
       aria-label="Previous"
       role="button"
       (click)="gallery.ref(this.id).prev(config.scrollBehavior)"
       [innerHtml]="navIcon"></i>

    <i *ngIf="config.loop || state.hasNext"
       class="g-nav-next"
       aria-label="Next"
       role="button"
       (click)="gallery.ref(this.id).next(config.scrollBehavior)"
       [innerHtml]="navIcon"></i>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class GalleryNavComponent implements OnInit {

  navIcon: SafeHtml;
  @Input('galleryId') id: string;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;

  constructor(public gallery: Gallery, private _sanitizer: DomSanitizer, public dir: Directionality) {
  }

  ngOnInit() {
    this.navIcon = this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon);
  }

  rightButton() {

  }

  leftButton(): void {

  }
}
