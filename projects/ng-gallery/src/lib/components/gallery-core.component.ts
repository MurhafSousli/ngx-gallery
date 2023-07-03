import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { GalleryCounterComponent } from './gallery-counter.component';
import { GalleryDotsComponent } from './gallery-dots.component';
import { GalleryNavComponent } from './gallery-nav.component';
import { GallerySliderComponent } from './gallery-slider.component';
import { GalleryThumbsComponent } from './gallery-thumbs.component';
import { GalleryError, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

@Component({
  selector: 'gallery-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <gallery-thumbs *ngIf="config.thumb"
                    [state]="state"
                    [config]="config"
                    (thumbClick)="thumbClick.emit($event)"
                    (error)="error.emit($event)">
    </gallery-thumbs>

    <div class="g-box">
      <gallery-slider [state]="state"
                      [config]="config"
                      [galleryId]="galleryId"
                      (itemClick)="itemClick.emit($event)"
                      (error)="error.emit($event)">

        <gallery-nav *ngIf="config.nav && state.items.length > 1"
                     [state]="state"
                     [config]="config"
                     [galleryId]="galleryId">
        </gallery-nav>

      </gallery-slider>

      <gallery-dots *ngIf="config.dots"
                    [state]="state"
                    [config]="config"
                    [galleryId]="galleryId">
      </gallery-dots>

      <gallery-counter *ngIf="config.counter"
                       [state]="state">
      </gallery-counter>

      <div class="g-box-template">
        <ng-container *ngTemplateOutlet="config.boxTemplate; context: { state: state, config: config }"></ng-container>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgIf, GalleryThumbsComponent, GallerySliderComponent, GalleryNavComponent, GalleryDotsComponent, GalleryCounterComponent, NgTemplateOutlet]
})
export class GalleryCoreComponent {

  @Input() galleryId: string;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() itemClick = new EventEmitter<number>();
  @Output() thumbClick = new EventEmitter<number>();
  @Output() error = new EventEmitter<GalleryError>();

  /** Set thumbnails position */
  @HostBinding('attr.thumbPosition') get thumbPosition(): 'top' | 'left' | 'right' | 'bottom' {
    return this.config.thumbPosition;
  }

  /** Set sliding direction */
  @HostBinding('attr.slidingDirection') get slidingDirection(): 'horizontal' | 'vertical' {
    return this.config.slidingDirection;
  }

  /** Disable thumbnails clicks */
  @HostBinding('attr.disableThumb') get disableThumb(): boolean {
    return this.config.disableThumb;
  }

  /** Set gallery image size */
  @HostBinding('attr.imageSize') get imageSize(): 'cover' | 'contain' {
    return this.config.imageSize;
  }

  @HostBinding('attr.thumbImageSize') get thumbImageSize(): 'contain' | 'cover' {
    return this.config.thumbImageSize;
  }

  /** Set gallery dots position */
  @HostBinding('attr.dotsPosition') get dotsPosition(): 'top' | 'bottom' {
    return this.config.dotsPosition;
  }

  /** Set gallery counter position */
  @HostBinding('attr.counterPosition') get counterPosition(): 'top' | 'bottom' {
    return this.config.counterPosition;
  }

  /** Set gallery counter position */
  @HostBinding('attr.slidingDisabled') get slidingDisabled(): boolean {
    return this.config.slidingDisabled;
  }

  /** Set gallery counter position */
  @HostBinding('attr.thumbSlidingDisabled') get thumbSlidingDisabled(): boolean {
    return this.config.thumbSlidingDisabled;
  }

  /** Set gallery slider itemAutosize style  */
  @HostBinding('attr.itemAutosize') get itemAutosize(): boolean {
    return this.config.itemAutosize;
  }

  /** Set gallery slider autoHeight style  */
  @HostBinding('attr.autoHeight') get autoHeight(): boolean {
    return this.config.autoHeight;
  }

  /** Set gallery slider thumbAutosize style  */
  @HostBinding('attr.thumbAutosize') get thumbAutosize(): boolean {
    return this.config.thumbAutosize;
  }

  /** Set debug style  */
  @HostBinding('attr.debug') get debug(): boolean {
    return this.config.debug;
  }
}
