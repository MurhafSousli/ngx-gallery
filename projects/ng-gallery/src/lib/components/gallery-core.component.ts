import {
  Component,
  Input,
  Output,
  HostBinding,
  inject,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { GalleryCounterComponent } from './gallery-counter.component';
import { GalleryBulletsComponent } from './gallery-bullets.component';
import { GalleryNavComponent } from './gallery-nav.component';
import { GallerySliderComponent } from './gallery-slider.component';
import { GalleryThumbsComponent } from './gallery-thumbs.component';
import { GalleryError, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import { GalleryRef } from '../services/gallery-ref';

@Component({
  standalone: true,
  selector: 'gallery-core',
  template: `
    @if (config.thumbs) {
      <gallery-thumbs [config]="config"
                      [galleryId]="galleryId"
                      (thumbClick)="thumbClick.emit($event)"
                      (error)="error.emit($event)"/>
    }

    <div class="g-box">
      <gallery-slider [class.g-debug]="config.debug"
                      [config]="config"
                      [galleryId]="galleryId"
                      (itemClick)="itemClick.emit($event)"
                      (error)="error.emit($event)">

        @if (config.nav && galleryRef.items().length > 1) {
          <gallery-nav [config]="config"/>
        }
      </gallery-slider>

      @if (config.bullets) {
        <gallery-bullets [config]="config"/>
      }

      @if (config.counter) {
        <gallery-counter/>
      }

      <div class="g-box-template">
        <ng-container *ngTemplateOutlet="config.boxTemplate; context: { state: state, config: config }"/>
      </div>
    </div>
  `,
  styleUrls: ['./gallery-core.scss', '../styles/debug.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, GalleryThumbsComponent, GallerySliderComponent, GalleryNavComponent, GalleryBulletsComponent, GalleryCounterComponent]
})
export class GalleryCoreComponent implements OnChanges {

  galleryRef: GalleryRef = inject(GalleryRef);

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  readonly dir: Directionality = inject(Directionality);

  @Input() galleryId: string;
  @Input() state: GalleryState;
  @Input() config: GalleryConfig;
  @Output() itemClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() thumbClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() error: EventEmitter<GalleryError> = new EventEmitter<GalleryError>();

  /** Set thumbnails position */
  @HostBinding('attr.thumbPosition') get thumbPosition(): 'top' | 'left' | 'right' | 'bottom' {
    return this.config.thumbPosition;
  }

  /** Set sliding direction */
  @HostBinding('attr.orientation') get orientation(): 'horizontal' | 'vertical' {
    return this.config.orientation;
  }

  /** Disable thumbnails' clicks */
  @HostBinding('attr.thumbDisabled') get disableThumb(): boolean {
    return this.config.disableThumbs;
  }

  /** Set bullets' clicks */
  @HostBinding('attr.bulletDisabled') get bulletDisabled(): boolean {
    return this.config.disableBullets;
  }

  /** Set gallery bullets position */
  @HostBinding('attr.bulletPosition') get bulletPosition(): 'top' | 'bottom' {
    return this.config.bulletPosition;
  }

  /** Set gallery image size property */
  @HostBinding('attr.imageSize') get imageSize(): 'cover' | 'contain' {
    return this.config.imageSize;
  }

  /** Set gallery thumb image size property */
  @HostBinding('attr.thumbImageSize') get thumbImageSize(): 'contain' | 'cover' {
    return this.config.thumbImageSize;
  }

  /** Set gallery counter position */
  @HostBinding('attr.counterPosition') get counterPosition(): 'top' | 'bottom' {
    return this.config.counterPosition;
  }

  /** Disable sliding using sliding via touchpad, mousewheel and gestures */
  @HostBinding('attr.scrollDisabled') get scrollDisabled(): boolean {
    return this.config.disableScroll;
  }

  /** Disable thumb sliding using sliding via touchpad, mousewheel and gestures */
  @HostBinding('attr.thumbScrollDisabled') get thumbScrollDisabled(): boolean {
    return this.config.disableThumbScroll;
  }

  /** Set items autosize styles  */
  @HostBinding('attr.itemAutosize') get itemAutosize(): boolean {
    return this.config.itemAutosize;
  }

  /** Set gallery autoHeight styles  */
  @HostBinding('attr.autoHeight') get autoHeight(): boolean {
    return this.config.autoHeight;
  }

  /** Set gallery thumb autosize styles  */
  @HostBinding('attr.thumbAutosize') get thumbAutosize(): boolean {
    return this.config.thumbAutosize;
  }

  /** Set direction  */
  @HostBinding('attr.dir') get direction(): Direction {
    return this.dir.value;
  }

  /** Set debug style  */
  @HostBinding('attr.debug') get debug(): boolean {
    return this.config.debug;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      if (changes.config.currentValue?.thumbWidth !== changes.config.previousValue?.thumbWidth) {
        this.nativeElement.style.setProperty('--g-thumb-width', coerceCssPixelValue(changes.config.currentValue.thumbWidth));
      }
      if (changes.config.currentValue?.thumbHeight !== changes.config.previousValue?.thumbHeight) {
        this.nativeElement.style.setProperty('--g-thumb-height', coerceCssPixelValue(changes.config.currentValue.thumbHeight));
      }
    }
  }
}
