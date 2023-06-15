import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  Inject,
  Optional,
  Self,
  Host,
  NgZone,
  ElementRef,
  PLATFORM_ID
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Gallery, GalleryRef, ImageItem, GalleryComponent, GalleryState, GalleryItem } from 'ng-gallery';
import { Subject, Subscription, from, tap, map, switchMap, finalize, debounceTime, EMPTY } from 'rxjs';

import { Lightbox } from './lightbox.service';

/**
 * This directive has 2 modes:
 * 1 - If host element is a HTMLElement, it detects the images and hooks their clicks to lightbox
 * 2 - If host element is a GalleryComponent, it hooks the images click to the lightbox
 */

const enum GallerizeMode {
  Detector = 'detector',
  Gallery = 'gallery'
}

@Directive({
  selector: '[gallerize]',
  standalone: true
})
export class GallerizeDirective implements OnInit, OnDestroy {

  /** Default gallery id */
  private _galleryId = 'lightbox';

  /** Gallerize mode */
  private readonly _mode: GallerizeMode;

  /** If host element is a HTMLElement, will use the following variables: */

  /** Stream that emits to fire the detection stream the image elements has changed */
  private _observer$: any;

  /** Stream that emits when image is discover */
  private _detector$: Subject<void>;

  /** If host element is a GalleryComponent, will use the following variables: */

  /** Gallery events (if used on a gallery component) */
  private _itemClick$: Subscription;
  private _itemChange$: Subscription;

  // ======================================================

  /** If set, it will become the gallery id */
  @Input() gallerize: string;

  /** The selector used to query images elements */
  @Input() selector = 'img';

  constructor(private _zone: NgZone,
              private _el: ElementRef,
              private _gallery: Gallery,
              private _lightbox: Lightbox,
              @Inject(PLATFORM_ID) platform: Object,
              @Inject(DOCUMENT) private _document: any,
              @Host() @Self() @Optional() private _galleryCmp: GalleryComponent) {

    // Set gallerize mode
    if (isPlatformBrowser(platform)) {
      this._mode = _galleryCmp ? GallerizeMode.Gallery : GallerizeMode.Detector;
    }
  }

  ngOnInit() {
    this._zone.runOutsideAngular(() => {
      this._galleryId = this.gallerize || this._galleryId;
      const ref = this._gallery.ref(this._galleryId);

      switch (this._mode) {
        case GallerizeMode.Detector:
          this.detectorMode(ref);
          break;
        case GallerizeMode.Gallery:
          this.galleryMode(ref);
      }
    });
  }

  ngOnDestroy() {
    switch (this._mode) {
      case GallerizeMode.Detector:
        this._detector$.complete();
        this._observer$.disconnect();
        break;
      case GallerizeMode.Gallery:
        this._itemClick$.unsubscribe();
        this._itemChange$.unsubscribe();
    }
  }

  /** Gallery mode: means `gallerize` directive is used on `<gallery>` component
   * Adds a click event to each gallery item so it opens in lightbox */
  private galleryMode(galleryRef: GalleryRef) {
    // Clone its items to the new gallery instance
    this._itemClick$ = this._galleryCmp.galleryRef.itemClick.subscribe((i: number) => this._lightbox.open(i, this._galleryId));
    this._itemChange$ = this._galleryCmp.galleryRef.itemsChanged.subscribe((state: GalleryState) => galleryRef.load(state.items));
  }

  /** Detector mode: means `gallerize` directive is used on a normal HTMLElement
   *  Detects images and adds a click event to each image, so it opens in the lightbox */
  private detectorMode(galleryRef: GalleryRef) {
    this._detector$ = new Subject();
    // Query image elements
    this._detector$.pipe(
      debounceTime(300),
      switchMap(() => {

        /** get all img elements from content */
        const imageElements = this._el.nativeElement.querySelectorAll(this.selector);

        if (imageElements && imageElements.length) {

          const images: GalleryItem[] = [];

          return from(imageElements).pipe(
            map((el: HTMLElement, i: number) => {
              // Add click event to the image
              el.style.cursor = 'pointer';
              el.addEventListener('click', () => {
                this._zone.run(() => this._lightbox.open(i, this._galleryId));
              });

              if (el instanceof HTMLImageElement) {
                // If element is type of img use the src property
                return {
                  src: el.getAttribute('imageSrc') || el.src,
                  thumb: el.getAttribute('thumbSrc') || el.src
                };
              } else {
                // Otherwise, use element background-image url
                const elStyle = this._document.defaultView.getComputedStyle(el, null);
                const background = elStyle.backgroundImage.slice(4, -1).replace(/"/g, '');
                return {
                  src: el.getAttribute('imageSrc') || background,
                  thumb: el.getAttribute('thumbSrc') || background
                };
              }
            }),
            tap((data: any) => images.push(new ImageItem(data))),
            finalize(() => galleryRef.load(images))
          );
        } else {
          return EMPTY;
        }
      })
    ).subscribe();

    // Observe content changes
    this._observer$ = new MutationObserver(() => this._detector$.next());
    this._observer$.observe(this._el.nativeElement, { childList: true, subtree: true });
  }
}
