import { Component, Input, HostBinding, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { GalleryConfig, GalleryState } from '../models';

@Component({
  selector: 'gallery-core',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <gallery-thumb *ngIf="config.thumb"
                  [state]="state"
                  [config]="config"
                  (indexChange)="indexChange.emit($event)">
    </gallery-thumb>
    <div class="g-box">
      <gallery-slider [state]="state"
                      [config]="config"
                      (indexChange)="indexChange.emit($event)">
        <gallery-nav *ngIf="config.nav && state.items.length > 1"
                    [state]="state"
                    [config]="config"
                    (indexChange)="indexChange.emit($event)"
                    (itemClick)="itemClick.emit($event)">
        </gallery-nav>
      </gallery-slider>
      <gallery-dots *ngIf="config.dots"
                    [state]="state"
                    (indexChange)="indexChange.emit($event)">
      </gallery-dots>
      <gallery-counter *ngIf="config.counter"
                      [state]="state">
      </gallery-counter>
    </div>
  `
})
export class GalleryCoreComponent {

  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() indexChange = new EventEmitter<string | number>();
  @Output() itemClick = new EventEmitter<number>();

  /** Set thumbnails position ('top' | 'left' | 'right' | 'bottom') */
  @HostBinding('attr.thumbPosition') get thumbPosition() {
    return this.config.thumbPosition;
  }

  /** Set thumbnails position ('horizontal' | 'vertical') */
  @HostBinding('attr.slidingDirection') get slidingDirection() {
    return this.config.slidingDirection;
  }

}
