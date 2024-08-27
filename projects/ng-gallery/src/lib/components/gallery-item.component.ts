import {
  Component,
  HostBinding,
  Input,
  Output,
  inject,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { GalleryItemContext } from '../directives/gallery-item-def.directive';
import { GalleryIframeComponent } from './templates/gallery-iframe.component';
import { GalleryVideoComponent } from './templates/gallery-video.component';
import { GalleryImageComponent } from './templates/gallery-image.component';
import { GalleryConfig } from '../models/config.model';
import { GalleryItemType, GalleryItemTypes, LoadingStrategy } from '../models/constants';
import { GalleryItemData, ImageItemData, ItemState, VideoItemData, VimeoItemData, YoutubeItemData } from './templates/items.model';

@Component({
  standalone: true,
  selector: 'gallery-item',
  template: `
    @if (load) {
      @switch (type) {
        @case (Types.Image) {
          <gallery-image [src]="imageData.src"
                         [alt]="imageData.alt"
                         [index]="index"
                         [loadingAttr]="config.loadingAttr"
                         [loadingIcon]="config.loadingIcon"
                         [loadingError]="config.loadingError"
                         (error)="error.emit($event)"/>
          @if (config.imageTemplate) {
            <div class="g-template g-item-template">
              <ng-container *ngTemplateOutlet="config.imageTemplate; context: imageContext"/>
            </div>
          }
        }
        @case (Types.Video) {
          <gallery-video [src]="videoData.src"
                         [mute]="videoData.mute"
                         [poster]="videoData.poster"
                         [controls]="videoData.controls"
                         [controlsList]="videoData.controlsList"
                         [disablePictureInPicture]="videoData.disablePictureInPicture"
                         [play]="isAutoPlay"
                         [pause]="currIndex !== index"
                         (error)="error.emit($event)"/>
        }
        @case (Types.Youtube) {
          <gallery-iframe [src]="youtubeSrc"
                          [autoplay]="isAutoPlay"
                          [loadingAttr]="config.loadingAttr"
                          [pause]="currIndex !== index"/>
        }
        @case (Types.Iframe) {
          <gallery-iframe [src]="data.src"
                          [loadingAttr]="config.loadingAttr"/>
        }
        @default {
          @if (config.itemTemplate) {
            <div class="g-template g-item-template">
              <ng-container *ngTemplateOutlet="config.itemTemplate; context: itemContext"/>
            </div>
          }
        }
      }
    }
      <gallery-iframe *ngSwitchCase="Types.Vimeo"
                      [src]="vimeoSrc"
                      [autoplay]="isAutoPlay"
                      [loadingAttr]="config.loadingAttr"
                      [pause]="currIndex !== index"></gallery-iframe>

  `,
  styleUrl: './gallery-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, GalleryImageComponent, GalleryVideoComponent, GalleryIframeComponent]
})
export class GalleryItemComponent implements AfterViewInit {

  readonly nativeElement: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;

  readonly Types = GalleryItemTypes;

  /** A stream that indicates that the height was emitted after the image is loaded, used only for gallery image types */
  readonly state$: BehaviorSubject<ItemState> = new BehaviorSubject<ItemState>('loading');

  /** A flag that indicates if the item is type of image, it can be a custom template by the user,
   * The img recognizer directive will set it to true*/
  isItemContainImage: boolean;

  /** Gallery config */
  @Input() config: GalleryConfig;

  /** Item's index in the gallery */
  @Input() index: number;

  /** The number of total items */
  @Input() count: number;

  /** Gallery current index */
  @Input() currIndex: number;

  /** Item's type 'image', 'video', 'youtube', 'Vimeo', 'iframe' */
  @Input() type: GalleryItemType;

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  @Input() data: GalleryItemData;

  /** Stream that emits when an error occurs */
  @Output() error: EventEmitter<ErrorEvent> = new EventEmitter<ErrorEvent>();

  @HostBinding('class.g-active-item') get isActive(): boolean {
    return this.index === this.currIndex;
  }

  @HostBinding('attr.galleryIndex') get isIndexAttr(): number {
    return this.index;
  }

  @HostBinding('attr.itemState') get itemState(): ItemState {
    return this.state$.value;
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
    };
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
    };
  }

  get isAutoPlay(): boolean {
    if (this.isActive) {
      if (this.type === GalleryItemTypes.Video || this.type === GalleryItemTypes.Youtube || this.type === GalleryItemTypes.Vimeo) {
        return this.videoData.autoplay;
      }
    }
  }

  get youtubeSrc(): string {
    let autoplay: 1 | 0 = 0;
    if (this.isActive && this.type === GalleryItemTypes.Youtube && (this.data as YoutubeItemData).autoplay) {
      autoplay = 1;
    }
    const url: URL = new URL(this.data.src as string);
    url.search = new URLSearchParams({
      wmode: 'transparent',
      ...(this.data as YoutubeItemData).params,
      autoplay
    }).toString();
    return url.href;
  }

  get vimeoSrc(): string {
    let autoplay: 1 | 0 = 0;
    if (this.isActive && this.type === GalleryItemTypes.Vimeo) {
      if ((this.data as VimeoItemData).autoplay) {
        autoplay = 1;
      }
    }
    const url:URL = new URL(this.data.src as string);
    url.search = new URLSearchParams({
      ...(this.data as VimeoItemData).params,
      autoplay,
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

  ngAfterViewInit(): void {
    // If item does not contain an image, then set the state to DONE
    if (!this.isItemContainImage) {
      this.state$.next('success');
    }
  }
}

