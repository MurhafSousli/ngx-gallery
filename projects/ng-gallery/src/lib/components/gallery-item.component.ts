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
import { Platform } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { GalleryItemContext } from '../directives/gallery-item-def.directive';
import { GalleryIframeComponent } from './templates/gallery-iframe.component';
import { GalleryVideoComponent } from './templates/gallery-video.component';
import { GalleryImageComponent } from './templates/gallery-image.component';
import { GalleryConfig } from '../models/config.model';
import { LoadingStrategy, GalleryItemType, GalleryItemTypes, ThumbnailsPosition } from '../models/constants';
import { GalleryItemData, ImageItemData, VideoItemData, YoutubeItemData } from './templates/items.model';

@Component({
  selector: 'gallery-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="load" [ngSwitch]="type">
      <ng-container
        *ngIf="config.itemTemplate; else default"
        class="g-template g-item-template"
      >
        <ng-container
          *ngTemplateOutlet="config.itemTemplate; context: itemContext"
        ></ng-container>
      </ng-container>

      <ng-template #default>
        <ng-container *ngSwitchCase="Types.Image">
          <gallery-image [src]="imageData.src"
            [alt]="imageData.alt"
            [loadingAttr]="config.loadingAttr"
            [loadingIcon]="config.loadingIcon"
            [loadingError]="config.loadingError"
            (loaded)="onItemLoaded()"
            (error)="error.emit($event)"></gallery-image>

          <div *ngIf="config.imageTemplate" class="g-template g-item-template">
            <ng-container *ngTemplateOutlet="config.imageTemplate; context: imageContext"></ng-container>
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
          [loadingAttr]="config.loadingAttr"
          [pause]="currIndex !== index"></gallery-iframe>

        <gallery-iframe *ngSwitchCase="Types.Iframe"
          [src]="data.src"
          [loadingAttr]="config.loadingAttr"></gallery-iframe>
      </ng-template>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule, GalleryImageComponent, GalleryVideoComponent, GalleryIframeComponent]
})
export class GalleryItemComponent implements AfterViewChecked {

  readonly Types = GalleryItemTypes;

  /** A flag that ensure that the height was emitted after tbe image is loaded, used only for gallery image types */
  private imageLoadingState: 'IN_PROGRESS' | 'DONE' = 'IN_PROGRESS';

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Item's index in the gallery */
  @Input() index: number;

  /** The number of total items */
  @Input() count: number;

  /** Gallery current index */
  @Input() currIndex: number;

  /** Item's type 'image', 'video', 'youtube', 'iframe' */
  @Input() type: GalleryItemType;

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

  get imageContext(): GalleryItemContext<ImageItemData> {
    return {
      $implicit: this.imageData,
      index: this.index,
      type: this.type,
      active: this.isActive,
      count: this.count,
      first: this.index === 0,
      last: this.index === this.count - 1
    }
  }

  get itemContext(): GalleryItemContext<GalleryItemData> {
    return {
      $implicit: this.data,
      index: this.index,
      type: this.type,
      active: this.isActive,
      count: this.count,
      first: this.index === 0,
      last: this.index === this.count - 1
    }
  }

  get element(): HTMLElement {
    return this.el.nativeElement;
  }

  get isAutoPlay(): boolean {
    if (this.isActive) {
      if (this.type === GalleryItemTypes.Video || this.type === GalleryItemTypes.Youtube) {
        return this.videoData.autoplay;
      }
    }
  }

  get youtubeSrc(): string {
    let autoplay: 1 | 0 = 0;
    if (this.isActive && this.type === GalleryItemTypes.Youtube && (this.data as YoutubeItemData).autoplay) {
      autoplay = 1;
    }
    const url = new URL(this.data.src as string);
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

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private _platform: Platform) {
  }

  ngAfterViewChecked(): void {
    const height: number = this.getHeight();
    if (this._platform.isBrowser) {
      this.element.style.setProperty('--g-item-width', `${ this.getWidth() }px`);
      this.element.style.setProperty('--g-item-height', `${ height }px`);
    }
    if (this.currIndex === this.index) {
      // Auto-height feature, only allowed when sliding direction is horizontal
      const isThumbPositionHorizontal: boolean =
        this.config.thumbPosition === ThumbnailsPosition.Top
        || this.config.thumbPosition === ThumbnailsPosition.Bottom;

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

