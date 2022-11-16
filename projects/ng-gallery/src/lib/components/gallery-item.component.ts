import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryConfig } from '../models/config.model';
import { LoadingStrategy, GalleryItemType } from '../models/constants';

@Component({
  selector: 'gallery-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="load" [ngSwitch]="type">

      <ng-container *ngSwitchCase="Types.Image">

        <gallery-image [src]="data.src"
                       [alt]="data.alt"
                       [loadingIcon]="config.loadingIcon"
                       [loadingError]="config.loadingError"
                       (error)="error.emit($event)"></gallery-image>

        <div *ngIf="config.itemTemplate" class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

      <gallery-video *ngSwitchCase="Types.Video"
                     [src]="data.src"
                     [poster]="data.poster"
                     [controls]="data.controls"
                     [play]="isAutoPlay"
                     [pause]="currIndex !== index"
                     (error)="error.emit($event)"></gallery-video>

      <gallery-iframe *ngSwitchCase="Types.Youtube"
                      [src]="youtubeSrc"
                      [autoplay]="isAutoPlay"
                      [pause]="currIndex !== index"></gallery-iframe>

      <gallery-iframe *ngSwitchCase="Types.Iframe"
                      [src]="data.src"></gallery-iframe>

      <ng-container *ngSwitchDefault>

        <div *ngIf="config.itemTemplate" class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

    </ng-container>
  `
})
export class GalleryItemComponent implements OnChanges {

  readonly Types = GalleryItemType;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Item's index in the gallery */
  @Input() index: number;

  /** Gallery current index */
  @Input() currIndex: number;

  @Input() galleryId: string;

  /** Item's type 'image', 'video', 'youtube', 'iframe' */
  @Input() type: string;

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  @Input() data: any;

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<ErrorEvent>();

  @Output() active = new EventEmitter<Element>;

  @HostBinding('class.g-active-item') get isActive() {
    return this.index === this.currIndex;
  }

  @HostBinding('attr.galleryIndex') get isIndexAttr() {
    return this.index;
  }

  @HostBinding('style.width') get getWidth(): string {
    if (this.config.slidingDirection === 'horizontal') {
      if (this.config.autoWidth) {
        return this.el.nativeElement.firstChild.clientWidth ? `${ this.el.nativeElement.firstChild.clientWidth }px` : 'unset';
      }
      return `${ this.el.nativeElement.parentElement.parentElement.clientWidth }px`;
    } else {
      return null;
    }
  }

  @HostBinding('style.height') get getHeight(): string {
    if (this.config.slidingDirection === 'horizontal') {
      return null;
    } else {
      if (this.config.autoHeight) {
        return this.el.nativeElement.firstChild.clientHeight ? `${ this.el.nativeElement.firstChild.clientHeight }px` : 'unset';
      }
      return `${ this.el.nativeElement.parentElement.parentElement.clientHeight }px`;
    }
  }

  get isAutoPlay() {
    if (this.isActive) {
      if (this.type === GalleryItemType.Video || this.type === GalleryItemType.Youtube) {
        return this.data.autoplay;
      }
    }
  }

  get youtubeSrc() {
    let autoplay: 1 | 0 = 0;
    if (this.isActive && this.type === GalleryItemType.Youtube && this.data.autoplay) {
      autoplay = 1;
    }
    const url = new URL(this.data.src);
    url.search = new URLSearchParams({
      wmode: 'transparent',
      ...this.data.params,
      autoplay
    }).toString();
    return url.href;
  }

  get load() {
    switch (this.config.loadingStrategy) {
      case LoadingStrategy.Preload:
        return true;
      case LoadingStrategy.Lazy:
        return this.currIndex === this.index;
      default:
        return this.currIndex === this.index || this.currIndex === this.index - 1 || this.currIndex === this.index + 1;
    }
  }

  constructor(public el: ElementRef) {
  }

  ngOnChanges(): void {
    if (this.currIndex === this.index) {
      this.active.emit(this.el.nativeElement);
    }
  }
}

