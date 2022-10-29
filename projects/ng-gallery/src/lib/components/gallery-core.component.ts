import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { GalleryError, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';

@Component({
  selector: 'gallery-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <gallery-thumbs *ngIf="config.thumb"
                    [state]="state"
                    [config]="config"
                    (thumbClick)="thumbClick.emit($event)">
    </gallery-thumbs>
    <div class="g-box">
      <gallery-slider [state]="state"
                      [config]="config"
                      (itemClick)="itemClick.emit($event)"
                      (error)="error.emit($event)">

        <gallery-nav *ngIf="config.nav && state.items.length > 1"
                     [state]="state"
                     [config]="config">
        </gallery-nav>

      </gallery-slider>

      <gallery-dots *ngIf="config.dots"
                    [state]="state"
                    [config]="config">
      </gallery-dots>

      <gallery-counter *ngIf="config.counter"
                       [state]="state">
      </gallery-counter>

      <div class="g-box-template" style="position: absolute">
        <ng-container *ngTemplateOutlet="config.boxTemplate; context: { state: state, config: config }"></ng-container>
      </div>
    </div>
  `
})
export class GalleryCoreComponent {

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
}
