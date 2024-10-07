import {
  Component,
  inject,
  signal,
  output,
  computed,
  input,
  AfterViewInit,
  Signal,
  InputSignal,
  WritableSignal,
  OutputEmitterRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { GalleryItemContext } from '../directives/gallery-item-def.directive';
import { GalleryIframeComponent } from './templates/gallery-iframe.component';
import { GalleryVideoComponent } from './templates/gallery-video.component';
import { GalleryImageComponent } from './templates/gallery-image.component';
import { GalleryItemType, GalleryItemTypes, LoadingStrategy } from '../models/constants';
import {
  GalleryItemData,
  ImageItemData,
  ItemState,
  VideoItemData,
  VimeoItemData,
  YoutubeItemData
} from './templates/items.model';
import { GalleryRef } from '../services/gallery-ref';
import { SliderItem } from './items/items';

@Component({
  standalone: true,
  selector: 'gallery-item',
  host: {
    '[attr.galleryIndex]': 'index()',
    '[class.g-active-item]': 'active()',
    '[attr.itemState]': 'state()',
  },
  providers: [{ provide: SliderItem, useExisting: GalleryItemComponent }],
  template: `
    @if (load()) {
      @switch (type()) {
        @case (Types.Image) {
          <gallery-image [src]="imageData.src"
                         [alt]="imageData.alt"
                         [index]="index()"
                         [loadingAttr]="galleryRef.config().loadingAttr"
                         [loadingIcon]="galleryRef.config().loadingIcon"
                         [loadingError]="galleryRef.config().loadingError"
                         (error)="error.emit($event)"/>
          @if (galleryRef.config().imageTemplate) {
            <div class="g-template g-item-template">
              <ng-container *ngTemplateOutlet="galleryRef.config().imageTemplate; context: imageContext()"/>
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
                         [autoplay]="autoplay()"
                         [pause]="!active()"
                         (error)="error.emit($event)"/>
        }
        @case (Types.Youtube) {
          <gallery-iframe [src]="youtubeSrc()"
                          [autoplay]="autoplay()"
                          [loadingAttr]="galleryRef.config().loadingAttr"
                          [pause]="!active()"/>
        }
        @case (Types.Vimeo) {
          <gallery-iframe [src]="vimeoSrc()"
                          [autoplay]="autoplay()"
                          [loadingAttr]="galleryRef.config().loadingAttr"
                          [pause]="!active()"/>
        }
        @case (Types.Iframe) {
          <gallery-iframe [src]="data().src"
                          [loadingAttr]="galleryRef.config().loadingAttr"/>
        }
        @default {
          @if (galleryRef.config().itemTemplate) {
            <div class="g-template g-item-template">
              <ng-container *ngTemplateOutlet="galleryRef.config().itemTemplate; context: itemContext()"/>
            </div>
          }
        }
      }
    }
  `,
  styleUrl: './gallery-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, GalleryImageComponent, GalleryVideoComponent, GalleryIframeComponent]
})
export class GalleryItemComponent extends SliderItem implements AfterViewInit {

  readonly galleryRef: GalleryRef = inject(GalleryRef);

  readonly Types = GalleryItemTypes;

  /** A stream that indicates that the height was emitted after the image is loaded, used only for gallery image types */
  readonly state: WritableSignal<ItemState> = signal<ItemState>('loading');

  readonly state$: Observable<ItemState> = toObservable(this.state);

  /** A flag that indicates if the item is type of image, it can be a custom template by the user,
   * The img recognizer directive will set it to true*/
  isItemContainImage: boolean;

  /** Item's index in the gallery */
  index: InputSignal<number> = input<number>();

  /** The number of total items */
  count: InputSignal<number> = input<number>();

  /** Gallery current index */
  currIndex: InputSignal<number> = input<number>();

  /** Item's type 'image', 'video', 'youtube', 'iframe' */
  type: InputSignal<GalleryItemType> = input<GalleryItemType>();

  /** Item's data, this object contains the data required to display the content (e.g. src path) */
  data: InputSignal<GalleryItemData> = input<GalleryItemData>();

  active: Signal<boolean> = computed(() => this.index() === this.currIndex());

  autoplay: Signal<boolean> = computed(() => {
    if (this.active()) {
      if (this.type() === GalleryItemTypes.Video || this.type() === GalleryItemTypes.Youtube) {
        return this.videoData.autoplay;
      }
    }
  });

  load: Signal<boolean> = computed(() => {
    switch (this.galleryRef.config().loadingStrategy) {
      case LoadingStrategy.Preload:
        return true;
      case LoadingStrategy.Lazy:
        return this.currIndex() === this.index();
      default:
        return this.currIndex() === this.index() || this.currIndex() === this.index() - 1 || this.currIndex() === this.index() + 1;
    }
  });


  imageContext: Signal<GalleryItemContext<ImageItemData>> = computed(() => {
    return {
      $implicit: this.imageData,
      index: this.index(),
      type: this.type(),
      active: this.active(),
      count: this.count(),
      first: this.index() === 0,
      last: this.index() === this.count() - 1
    };
  });

  itemContext: Signal<GalleryItemContext<ImageItemData>> = computed(() => {
    return {
      $implicit: this.data(),
      index: this.index(),
      type: this.type(),
      active: this.active(),
      count: this.count(),
      first: this.index() === 0,
      last: this.index() === this.count() - 1
    };
  });

  youtubeSrc: Signal<string> = computed(() => {
    let autoplay: 1 | 0 = 0;
    if (this.active() && this.type() === GalleryItemTypes.Youtube && (this.data() as YoutubeItemData).autoplay) {
      autoplay = 1;
    }
    const url: URL = new URL(this.data().src as string);
    url.search = new URLSearchParams({
      wmode: 'transparent',
      ...(this.data() as YoutubeItemData).params,
      autoplay
    }).toString();
    return url.href;
  });

  vimeoSrc: Signal<string> = computed(() => {
    let autoplay: 1 | 0 = 0;
    if (this.active() && this.type() === GalleryItemTypes.Vimeo) {
      if ((this.data as VimeoItemData).autoplay) {
        autoplay = 1;
      }
    }
    const url: URL = new URL(this.data().src as string);
    url.search = new URLSearchParams({
      ...(this.data() as VimeoItemData).params,
      autoplay,
    }).toString();
    return url.href;
  });

  get imageData(): ImageItemData {
    return this.data();
  }

  get videoData(): VideoItemData {
    return this.data();
  }

  /** Stream that emits when an error occurs */
  error: OutputEmitterRef<ErrorEvent> = output<ErrorEvent>();

  ngAfterViewInit(): void {
    // If item does not contain an image, then set the state to DONE
    if (!this.isItemContainImage) {
      this.state.set('success');
    }
  }
}

