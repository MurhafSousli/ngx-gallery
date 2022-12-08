import {
  Component,
  HostBinding,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { GalleryConfig } from '../models/config.model';
import { LoadingStrategy, GalleryItemType } from '../models/constants';
import { GalleryItemData, ImageItemData, VideoItemData, YoutubeItemData } from './templates/items.model';

@Component({
  selector: 'gallery-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="load" [ngSwitch]="type">
      <ng-container *ngSwitchCase="Types.Image">

        <gallery-image [src]="imageData.src"
                       [alt]="imageData.alt"
                       [loadingIcon]="config.loadingIcon"
                       [loadingError]="config.loadingError"
                       (loaded)="onItemLoaded()"
                       (error)="error.emit($event)"></gallery-image>

        <div *ngIf="config.itemTemplate" class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate; context: { index, type, data, isActive }">
          </ng-container>
        </div>

      </ng-container>

      <gallery-video *ngSwitchCase="Types.Video"
                     [src]="videoData.src"
                     [mute]="videoData.mute"
                     [poster]="videoData.poster"
                     [controls]="videoData.controls"
                     [controlsList]="videoData.controlsList"
                     [disablePictureInPicture]="videoData.disablePictureInPicture"
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
          <ng-container *ngTemplateOutlet="config.itemTemplate; context: { index, type, data, isActive: isActive }">
          </ng-container>
        </div>

      </ng-container>
    </ng-container>
  `
})
export class GalleryItemComponent implements AfterViewChecked {

  readonly Types = GalleryItemType;

  /** A flag that ensure that the height was emitted after tbe image is loaded, used only for gallery image types */
  private imageLoadingState: 'IN_PROGRESS' | 'DONE' = 'IN_PROGRESS';

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Item's index in the gallery */
  @Input() index: number;

  /** Gallery current index */
  @Input() currIndex: number;

  /** Item's type 'image', 'video', 'youtube', 'iframe' */
  @Input() type: string;

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  @Input() data: GalleryItemData;

  /** Stream that emits when an error occurs */
  @Output() error = new EventEmitter<ErrorEvent>();

  @HostBinding('class.g-active-item') get isActive(): boolean {
    return this.index === this.currIndex;
  }

  @HostBinding('attr.galleryIndex') get isIndexAttr(): number {
    return this.index;
  }

  @HostBinding('attr.imageState') get imageState(): 'IN_PROGRESS' | 'DONE' {
    return this.imageLoadingState;
  }

  get element(): HTMLElement {
    return this.el.nativeElement;
  }

  get isAutoPlay(): boolean {
    if (this.isActive) {
      if (this.type === GalleryItemType.Video || this.type === GalleryItemType.Youtube) {
        return this.videoData.autoplay;
      }
    }
  }

  get youtubeSrc(): string {
    let autoplay: 1 | 0 = 0;
    if (this.isActive && this.type === GalleryItemType.Youtube && (this.data as YoutubeItemData).autoplay) {
      autoplay = 1;
    }
    const url = new URL(this.data.src);
    url.search = new URLSearchParams({
      wmode: 'transparent',
      ...(this.data as YoutubeItemData).params,
      autoplay
    }).toString();
    return url.href;
  }

  get load(): boolean {
    switch (this.config.loadingStrategy) {
      case LoadingStrategy.Preload:
        return true;
      case LoadingStrategy.Lazy:
        return this.currIndex === this.index;
      default:
        return this.currIndex === this.index || this.currIndex === this.index - 1 || this.currIndex === this.index + 1;
    }
  }

  get imageData(): ImageItemData {
    return this.data;
  }

  get videoData(): VideoItemData {
    return this.data;
  }

  constructor(private el: ElementRef, private cd: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    const height = this.getHeight();
    this.element.style.setProperty('--g-item-width', `${ this.getWidth() }px`);
    this.element.style.setProperty('--g-item-height', `${ height }px`);
    if (this.currIndex === this.index) {
      // Auto-height feature, only allowed when sliding direction is horizontal
      const isThumbPositionHorizontal: boolean = this.config.thumbPosition === 'top' || this.config.thumbPosition === 'bottom';
      if (this.config.autoHeight && height && isThumbPositionHorizontal) {
        // Change slider height
        this.element.parentElement.parentElement.style.height = `${ height }px`;
      }
    }
  }

  onItemLoaded(): void {
    if (this.imageLoadingState === 'IN_PROGRESS') {
      this.imageLoadingState = 'DONE';
      // Detect changes to re-calculate item size
      this.cd.detectChanges();
    }
  }

  private getWidth(): number {
    if (this.config.slidingDirection === 'horizontal') {
      const firstElementChild: Element = this.element?.firstElementChild;
      if (this.config.itemAutosize && this.imageLoadingState === 'DONE' && firstElementChild?.clientWidth) {
        return firstElementChild.clientWidth;
      }
    }
    return this.element.parentElement.parentElement.clientWidth;
  }

  private getHeight(): number {
    const firstElementChild: Element = this.element.firstElementChild;
    if (firstElementChild) {
      if (this.config.autoHeight) {
        if (this.imageLoadingState === 'DONE' && firstElementChild.clientHeight) {
          return firstElementChild.clientHeight;
        }
      }
      if (this.config.slidingDirection === 'vertical') {
        if (this.config.itemAutosize && this.imageLoadingState === 'DONE' && firstElementChild.clientHeight) {
          return firstElementChild.clientHeight;
        }
      }
    }
    return this.element.parentElement.parentElement.clientHeight;
  }
}

